(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/login"],{1711:function(e,t,n){"use strict";var o=n("b52e"),i=n.n(o);i.a},"36d3":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var o={uGap:function(){return n.e("node-modules/uview-ui/components/u-gap/u-gap").then(n.bind(null,"dd55"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"8626"))},uCheckbox:function(){return n.e("node-modules/uview-ui/components/u-checkbox/u-checkbox").then(n.bind(null,"b811"))},uModal:function(){return n.e("node-modules/uview-ui/components/u-modal/u-modal").then(n.bind(null,"51d3"))}},i=function(){var e=this,t=e.$createElement;e._self._c},r=[]},"3e7b":function(e,t,n){"use strict";(function(e){n("e3e7");o(n("66fd"));var t=o(n("642b"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"642b":function(e,t,n){"use strict";n.r(t);var o=n("36d3"),i=n("cfbc");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("1711"),n("addd");var s,u=n("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"3e102c11",null,!1,o["a"],s);t["default"]=c.exports},6629:function(e,t,n){"use strict";(function(e){function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function o(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){i(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{showModal:!1,showToast:!1,content:"请先同意以下条款！",loginToast:"登录失败",isChecked:!1,name:"ckeckBox",openid:"",code:"",pid:""}},onLoad:function(e){this.pid=e.pid||""},methods:{radioChange:function(e){!0===e.value?this.isChecked=!0:this.isChecked=!1,console.log("EEE",this.isChecked)},login:function(){var t=this;!0===this.isChecked?(console.log("调用微信登录接口"),e.getProvider({service:"oauth",success:function(n){~n.provider.indexOf("weixin")&&e.login({provider:"weixin",success:function(e){console.log(e,"登录res"),t.code=e.code}}),e.getUserProfile&&e.getUserProfile({desc:"您的登录信息将用于平台展示",success:function(n){console.log("打印登录信息",n);var o={nickName:n.userInfo.nickName,avatar:n.userInfo.avatarUrl};e.$emit("setUser",o),t.$store.commit("setUserInfo",o);var i={encryptedData:n.encryptedData,signature:n.signature,iv:n.iv,refresh:!0,pid:t.pid};t.getSessionKey(t.code,i)},fail:function(t){console.log(t,"是不一样"),e.showToast({icon:"none",title:"获取用户信息失败"})}})},fail:function(e){return console.log("失败",e),t.showToast=!0,!1}})):this.showModal=!0},serviceItem:function(){console.log("跳到隐私条款页面")},getSessionKey:function(t,n){var o=this;this.$request({url:"/api/user/getWxMiniProgramSessionKey",method:"GET",data:{code:t},success:function(t){if(0===t.code)return e.showToast({icon:"none",title:t.msg,duration:3e3}),!1;var i=t.data.session_key;o.openid=t.data.openid,o.userLogin(n,i)},fail:function(e){console.log("每有得到session",e)}})},userLogin:function(t,n){var i=this;this.$request({url:"/api/user/wxMiniProgramOauth",method:"POST",data:o({session_key:n},t),success:function(t){if(0===t.code)return e.showToast({icon:"none",title:t.msg,duration:3e3}),!1;i.token=t.data.token,e.setStorageSync("token",i.token),i.$store.commit("changeLoginState",!0),i.$request({url:"/api/user/index",data:{token:i.token},success:function(t){if(0===t.code)return e.showToast({icon:"none",title:t.msg,duration:3e3}),!1;console.log("用户中心",t);var n={id:t.data.user.id,money:t.data.user.money,pid:t.data.user.pid,type:t.data.user.type};i.$store.commit("setUserInfo",n);var o=t.data.user.is_vip;e.$emit("vipStatus",o),e.setStorage({key:"isVip",data:o})}}),e.switchTab({url:"/pages/me/index"})},fail:function(t){e.showToast({icon:"none",title:"登录失败"})}})}}};t.default=r}).call(this,n("543d")["default"])},a003:function(e,t,n){},addd:function(e,t,n){"use strict";var o=n("a003"),i=n.n(o);i.a},b52e:function(e,t,n){},cfbc:function(e,t,n){"use strict";n.r(t);var o=n("6629"),i=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a}},[["3e7b","common/runtime","common/vendor"]]]);