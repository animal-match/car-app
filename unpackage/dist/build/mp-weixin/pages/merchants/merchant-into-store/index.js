(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/merchants/merchant-into-store/index"],{"028d":function(e,n,t){},"2d41":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=u(t("a34a"));function u(e){return e&&e.__esModule?e:{default:e}}function i(e,n,t,o,u,i,s){try{var a=e[i](s),r=a.value}catch(d){return void t(d)}a.done?n(r):Promise.resolve(r).then(o,u)}function s(e){return function(){var n=this,t=arguments;return new Promise((function(o,u){var s=e.apply(n,t);function a(e){i(s,o,u,a,r,"next",e)}function r(e){i(s,o,u,a,r,"throw",e)}a(void 0)}))}}var a={data:function(){return{showMessageButton:!1,addressShow:!1,phoneNoShow:!1,phoneTips:"非会员查看地址电话需支付120元费用",adressTips:"非会员查看地址电话需支付120元费用",isvip:!1,idValue:"",userLoginId:"",goodsTags:[],productions:[],storeInformation:{},store:{longitude:"",latitude:"",phoneNo:"",address:""}}},onLoad:function(e){this.idValue=e.id,this.storeInfo(e.id),this.getPhoneAddr()},onShow:function(){this.userLoginId=this.$store.state.user.userId,console.log("用户登录id",this.userLoginId,typeof this.userLoginId),this.isvip=e.getStorageSync("isVip"),this.isvip&&(this.showMessageButton=!0)},methods:{getPhoneAddr:function(){var n=this;return s(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$request({url:"/api/store/getAddress",method:"POST",data:{store_id:n.idValue},success:function(t){return 0===t.code?(e.showToast({icon:"none",title:t.msg,duration:3e3}),!1):(console.log("手机",t.data),n.store.phoneNo=t.data.phone,n.store.address=t.data.address,n.store.longitude=t.data.long,n.store.latitude=t.data.lat,"success")}});case 2:case"end":return t.stop()}}),t)})))()},storeInfo:function(n){var t=this;this.$request({url:"/api/store/detail",method:"POST",data:{store_id:n},success:function(n){if(0===n.code)return e.showToast({icon:"none",title:n.msg,duration:3e3}),!1;console.log("详情",n.data),t.goodsTags=n.data.category,t.productions=n.data.goods,t.storeInformation=n.data}})},showPhone:function(n){this.getPhoneAddr(),this.isvip||this.userLoginId==this.idValue?e.makePhoneCall({phoneNumber:n,success:function(e){}}):this.phoneNoShow=!0},showAddress:function(n,t,o){this.getPhoneAddr(),this.isvip||this.userLoginId==this.idValue?e.getLocation({type:"wgs84",success:function(u){console.log("商家位置的经纬度",u),"getLocation:ok"===u.errMsg&&e.openLocation({latitude:Number(t),longitude:Number(n),address:o,scale:18,success:function(){console.log("定位成功")}})},fail:function(n){"getLocation:fail auth deny"===n.errMsg&&e.showModal({content:"检测到您没打开获取信息功能权限，是否去设置打开？",confirmText:"确认",cancelText:"取消",success:function(n){if(!n.confirm)return!1;e.openSetting({success:function(e){}})}})}}):this.addressShow=!0},upDate:function(){console.log("跳转支付页面"),e.navigateTo({url:"../payment/index"})},payment:function(){e.navigateTo({url:"/pages/merchants/payment/index"})},toMySupply:function(){e.navigateTo({url:"/pages/me/my-supply-info/index"})},sendMessage:function(){e.navigateTo({url:"sendMessage?id="+this.idValue})},previewImage:function(n){console.log(n),e.previewImage({current:this.productions[n].image,urls:this.productions})}}};n.default=a}).call(this,t("543d")["default"])},3763:function(e,n,t){"use strict";t.r(n);var o=t("2d41"),u=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=u.a},"7b9e":function(e,n,t){"use strict";t.r(n);var o=t("f2d1"),u=t("3763");for(var i in u)"default"!==i&&function(e){t.d(n,e,(function(){return u[e]}))}(i);t("fa7b");var s,a=t("f0c5"),r=Object(a["a"])(u["default"],o["b"],o["c"],!1,null,"52751cfa",null,!1,o["a"],s);n["default"]=r.exports},"9d65":function(e,n,t){"use strict";(function(e){t("e3e7");o(t("66fd"));var n=o(t("7b9e"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},f2d1:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return o}));var o={uImage:function(){return t.e("node-modules/uview-ui/components/u-image/u-image").then(t.bind(null,"7583"))},uButton:function(){return t.e("node-modules/uview-ui/components/u-button/u-button").then(t.bind(null,"8626"))},uTag:function(){return t.e("node-modules/uview-ui/components/u-tag/u-tag").then(t.bind(null,"48c1"))},uGap:function(){return t.e("node-modules/uview-ui/components/u-gap/u-gap").then(t.bind(null,"dd55"))},uIcon:function(){return t.e("node-modules/uview-ui/components/u-icon/u-icon").then(t.bind(null,"5165"))},uModal:function(){return t.e("node-modules/uview-ui/components/u-modal/u-modal").then(t.bind(null,"51d3"))}},u=function(){var e=this,n=e.$createElement;e._self._c},i=[]},fa7b:function(e,n,t){"use strict";var o=t("028d"),u=t.n(o);u.a}},[["9d65","common/runtime","common/vendor"]]]);