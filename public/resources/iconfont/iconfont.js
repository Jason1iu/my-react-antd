(function(window){var svgSprite='<svg><symbol id="icon-department" viewBox="0 0 1024 1024"><path d="M756.622222 51.2H256c-34.133333 0-65.422222 25.6-65.422222 59.733333v802.133334c0 34.133333 28.444444 59.733333 65.422222 59.733333h500.622222c34.133333 0 65.422222-25.6 65.422222-59.733333V110.933333c-2.844444-34.133333-31.288889-59.733333-65.422222-59.733333zM739.555556 361.244444H267.377778V201.955556H739.555556v159.288888z" fill="#333333" ></path></symbol><symbol id="icon-company" viewBox="0 0 1024 1024"><path d="M725.333333 938.666667h-85.333333V128H170.666667v810.666667H85.333333V42.666667h640z" fill="" ></path><path d="M938.666667 938.666667h-85.333334V384h-170.666666V298.666667h256z" fill="" ></path><path d="M256 256h298.666667v85.333333H256zM256 469.333333h298.666667v85.333334H256zM256 682.666667h298.666667v85.333333H256z" fill="" ></path></symbol><symbol id="icon-renyuanjieshao" viewBox="0 0 1024 1024"><path d="M499.429 499.643C549.999 459.392 582.535 397.5 582.535 328c0-121-98.428-219.429-219.428-219.429S143.678 207 143.678 328c0 70.25 33.322 132.714 84.822 172.928C94.678 555.321 0 686.572 0 839.678v38.036c0 20.215 16.357 36.572 36.571 36.572h658.286c20.215 0 36.572-16.357 36.572-36.572v-38.036c0-154.428-96.357-286.499-232-340.035zM216.82 328c0-80.678 65.607-146.286 146.286-146.286S509.392 247.322 509.392 328c0 79.643-64.036 144.357-143.285 146-0.142 0-0.25-0.036-0.393-0.036-1.285 0-2.57 0.18-3.856 0.18C281.787 473.463 216.82 408.25 216.82 328zM73.143 841.143v-1.465c0-159.82 128.857-289.892 288.108-292.32 0.607 0 1.214 0.07 1.858 0.07 1.499 0 2.964-0.213 4.463-0.213 160.465 1 290.714 131.785 290.714 292.463l-585.143 1.465zM693.393 256h329.142v73.143H693.392V256z m0 182.857h329.142V512H693.392v-73.143zM804.57 621.714h217.964v73.143H804.571v-73.143z" fill="" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)