(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/index"],{1666:function(e,n,t){"use strict";t.r(n);var o=t("c0c1"),i=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=i.a},"17f7":function(e,n,t){"use strict";t.r(n);var o=t("2433"),i=t("1666");for(var u in i)"default"!==u&&function(e){t.d(n,e,(function(){return i[e]}))}(u);t("9b2c"),t("7f2f");var a,s=t("f0c5"),r=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"15f34f3d",null,!1,o["a"],a);n["default"]=r.exports},2433:function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return o}));var o={uGap:function(){return t.e("node-modules/uview-ui/components/u-gap/u-gap").then(t.bind(null,"dd55"))},uImage:function(){return t.e("node-modules/uview-ui/components/u-image/u-image").then(t.bind(null,"7583"))},uButton:function(){return t.e("node-modules/uview-ui/components/u-button/u-button").then(t.bind(null,"8626"))},uModal:function(){return t.e("node-modules/uview-ui/components/u-modal/u-modal").then(t.bind(null,"51d3"))}},i=function(){var e=this,n=e.$createElement;e._self._c},u=[]},"4b83":function(e,n,t){"use strict";(function(e){t("e3e7");o(t("66fd"));var n=o(t("17f7"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"59a9":function(e,n,t){},"7f2f":function(e,n,t){"use strict";var o=t("59a9"),i=t.n(o);i.a},"9b2c":function(e,n,t){"use strict";var o=t("ee47"),i=t.n(o);i.a},c0c1:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{isVip:0,avatar:"",userName:"",showLogout:!1,isLogin:!1,phoneNumCode:"15828292076",modules:[{id:1,moduleName:"会员中心",url:"/static/user-center-images/vip.png"},{id:2,moduleName:"商家入驻",url:"/static/user-center-images/merchant.png"},{id:3,moduleName:"我的供求信息",url:"/static/user-center-images/supply.png"},{id:4,moduleName:"分销商",url:"/static/user-center-images/sale.png"}]}},computed:{phoneNum:function(){var e,n;return e=this.phoneNumCode.slice(0,3),n=this.phoneNumCode.slice(7),console.log(e,n),e+"****"+n}},onLoad:function(){var n=this;e.$on("setUser",(function(e){console.log("我的信息页面用户信息",e),n.userName=e.nickName,n.avatar=e.avatar}))},onShow:function(){var n=this;console.log("检查登录状态",this.$store.state.isLogin),this.isLogin=this.$store.state.isLogin,e.getStorage({key:"isVip",success:function(e){n.isVip=e.data}}),console.log("vip",this.isVip)},methods:{logout:function(){var n=this,t=e.getStorageSync("token");this.$request({url:"/api/user/logout",data:{token:t},success:function(t){if(0===t.code)return e.showToast({icon:"none",title:t.msg,duration:3e3}),!1;n.isLogin=!1,n.userName="",n.avatar="",n.isVip=0,n.$store.commit("changeLoginState",!1),n.$store.commit("clearUserInfo"),e.clearStorage(),n.showLogout=!0}})},login:function(){0==this.isLogin&&e.navigateTo({url:"/pages/me/login"})},intoDetailsPage:function(n){switch(n){case 1:0==this.isVip?e.navigateTo({url:"/pages/merchants/payment/index"}):e.showToast({title:"您已是黄金会员",icon:"none"});break;case 2:e.navigateTo({url:"/pages/me/merchant-enter/index"});break;case 3:e.navigateTo({url:"/pages/me/my-supply-info/index"});break;case 4:e.navigateTo({url:"/pages/me/distributor/index"});break}}}};n.default=t}).call(this,t("543d")["default"])},ee47:function(e,n,t){}},[["4b83","common/runtime","common/vendor"]]]);