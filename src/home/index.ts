import { StateKeys } from '../store/interface';
import { IHomeReduxState, ITreeNode, ILoginUser } from './interface';

const getDefaultRootNode: ITreeNode = { id: "-1", text: '投资集团公司', leaf: false, children: [] };
const getDefaultLoginUser: ILoginUser = { id: 0, companyId: '-1', companyFullName: '投资集团公司', username: '未登录', userId: 0, authorities: [''] } as ILoginUser;

export const stateKey = StateKeys.home;

export const initState: IHomeReduxState = {
    fetchingUser: true,
    loginUser: getDefaultLoginUser,
    loginUsers: [],
    ssoTreeData: [getDefaultRootNode],
    ssoSelectedKeys: [],
    ssoExpandedKeys: [],
    ssoSelectedNode: getDefaultRootNode,
};