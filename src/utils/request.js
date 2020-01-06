import { message } from 'antd';
import { AppUtils } from './AppUtils';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (response.status === 200 && response.redirected) {
      const url = response.url || '';
      if (url.endsWith('/oauth2')) {
        window.top.location.reload();
        return response;
      }
    }
    const code = response.headers.get('errorcode');
    if (!code) {
      return response;
    }
    response.text().then(errortext => {
      message.warning(errortext);

    });
    const error = new Error();
    error.name = code;
    error.message = "应用错误：" + response.url;
    throw error;
  } else {
    const errortext = codeMessage[response.status] || response.statusText;
    message.warning(`请求错误 ${response.status}`);
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = {
    ...defaultOptions,
    ...options
  };

  newOptions.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...newOptions.headers,
  };

  if (newOptions.method == 'POST' || newOptions.method == 'PUT') {

    if (!(newOptions.body instanceof window.FormData)) {
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      delete newOptions['headers'];
    }
  } else if (newOptions.method == 'GET' && newOptions.body) {
    let p = '';
    for (const k in newOptions.body) {
      const v = newOptions.body[k];
      if (v !== undefined) {
        if (p !== '')
          p += '&';
        p += k + "=" + encodeURIComponent(v);
      }
    }
    if (p !== '')
      url += (url.indexOf('?') == -1 ? "?" : "&") + p;
    delete newOptions['body'];
  }

  const csrfHeaderName = document.querySelector("meta[name='csrfHeaderName']");
  const csrfToken = document.querySelector("meta[name='csrfToken']");
  if (csrfHeaderName && csrfToken) {
    const headers = newOptions.headers || {};
    headers[csrfHeaderName.content] = csrfToken.content;
    newOptions.headers = { ...headers };
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (response.status == 204) {
        return response.text();
      }
      if (!response.headers.has('X-Total-Count')) {
        return response.json();
      }
      else {
        const total = response.headers.get('X-Total-Count');
        return response.json().then(data => {
          return { results: data, total };
        });
      }
    });
}

export function graphql(query, variables) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify({ query, variables }),
  };

  newOptions.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...newOptions.headers,
  };

  const csrfHeaderName = document.querySelector("meta[name='csrfHeaderName']");
  const csrfToken = document.querySelector("meta[name='csrfToken']");
  if (csrfHeaderName && csrfToken) {
    const headers = newOptions.headers || {};
    headers[csrfHeaderName.content] = csrfToken.content;
    newOptions.headers = { ...headers };
  }
  const url = AppUtils.getContextPath() + "/graphql"
  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (response.status == 204) {
        return response.text();
      }
      return response.json();
    }).then(json => {
      const { data, errors } = json;
      if (errors && errors.length > 0) {
        const msgs = errors.map(err => {
          if (err.type === 'AccessDeniedException')
            return '没有权限，不许访问。';
          else if (err.type === 'BaobiaoGraphQLException')
            return err.message;
          else {
            console.error(err.message);
            return "服务器内部错误。"
          }
        });
        msgs.filter((item, i, self) => {
          return self.indexOf(item) === i;
        });
        message.warning(msgs.join("\r\n"));
      }
      return data;
    })
    ;
}

export function encodeURIQueryParams(options) {
  let p = '';
  for (const k in options) {
    const v = options[k];
    if (v !== undefined) {
      if (p !== '')
        p += '&';
      p += k + "=" + encodeURIComponent(v);
    }
  }
  return p;
}