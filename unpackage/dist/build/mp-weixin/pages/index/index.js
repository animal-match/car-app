(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"079ed":function(e,t,n){"use strict";(function(e){n("e3e7");a(n("66fd"));var t=a(n("9d6e"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"0f7f":function(e,t,n){},"39eb":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var a={uGap:function(){return n.e("node-modules/uview-ui/components/u-gap/u-gap").then(n.bind(null,"dd55"))},uSwiper:function(){return n.e("node-modules/uview-ui/components/u-swiper/u-swiper").then(n.bind(null,"2198"))},uImage:function(){return n.e("node-modules/uview-ui/components/u-image/u-image").then(n.bind(null,"7583"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"8626"))},uTag:function(){return n.e("node-modules/uview-ui/components/u-tag/u-tag").then(n.bind(null,"48c1"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.totalinfo.length>0?e.__map(e.totalinfo.slice(0,2),(function(t,n){var a=e.__get_orig(t),i=e._f("timeStampFilter")(t.user.createtime);return{$orig:a,f0:i}})):null);e._isMounted||(e.e0=function(t,n){var a=arguments[arguments.length-1].currentTarget.dataset,i=a.eventParams||a["event-params"];n=i.item4;return e.goDetails(n.id)}),e.$mp.data=Object.assign({},{$root:{l0:n}})},o=[]},"41d1":function(e,t,n){"use strict";var a=n("0f7f"),i=n.n(a);i.a},"47ae":function(e,t,n){"use strict";n.r(t);var a=n("55bb"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},"55bb":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{manufactor:0,distributor:0,banner:[],merchant_0:[],merchant_1:[],totalinfo:[],cloneTotalinfo:[]}},onShow:function(){this.getBanner(),this.getList(),this.getMoreList(),this.static(),this.getRequireSupply()},methods:{getBanner:function(){var t=this;this.$request({url:"/api/decorate/banner",success:function(n){if(0===n.code)return e.showToast({icon:"none",title:n.msg,duration:3e3}),!1;t.banner=n.data}})},getList:function(){var t=this;this.$request({url:"/api/store/index",method:"GET",data:{type:0},success:function(n){if(0===n.code)return e.showToast({icon:"none",title:n.msg,duration:3e3}),!1;t.merchant_0=n.data.slice(0,2),console.log(n,"首页厂家")}})},getMoreList:function(){var t=this;this.$request({url:"/api/store/index",method:"GET",data:{type:1},success:function(n){if(0===n.code)return e.showToast({icon:"none",title:n.msg,duration:3e3}),!1;t.merchant_1=n.data.slice(0,2),console.log(n,"首页经销商")}})},static:function(){var t=this;this.$request({url:"/api/store/statistics",success:function(n){if(0===n.code)return e.showToast({icon:"none",title:n.msg,duration:3e3}),!1;t.manufactor=n.data.manufactor,t.distributor=n.data.distributor}})},getRequireSupply:function(){var t=this;this.$request({url:"/api/supply/index",method:"POST",success:function(n){if(n&&n.code&&1!==n.code)return e.showToast({title:n.msg,icon:"none"}),!1;t.totalinfo=n.data.data;for(var a=[],i=0;i<t.totalinfo.length;i++)a.push(t.totalinfo[i]);t.cloneTotalinfo=a}})},handleClick:function(t){console.log("dianle",t),e.navigateTo({url:"/pages/merchants/merchant-into-store/index?id="+t})},goDetailsPage:function(t){switch(t){case"supply":e.setStorageSync("tabBarIndex","fromHomePage1"),e.switchTab({url:"/pages/require/index"});break;case"require":e.setStorageSync("tabBarIndex","fromHomePage2"),e.switchTab({url:"/pages/require/index"});break;case"merchant":e.navigateTo({url:"/pages/me/merchant-enter/index"});break;case"supNeed":e.setStorageSync("tabBarIndex",0),e.switchTab({url:"/pages/require/index"})}},toMerchantPage:function(t){switch(console.log(t),t){case"manufacturers":this.$store.state.pageIndex=0,e.switchTab({url:"../merchants/index"});break;case"dealer":this.$store.state.pageIndex=1,e.switchTab({url:"../merchants/index"});break}},goDetails:function(t){var n=this.cloneTotalinfo;console.log("传递数组",n),e.navigateTo({url:"/pages/require/details/index?id="+t+"&arr="+JSON.stringify(n)})}}};t.default=n}).call(this,n("543d")["default"])},"61f0":function(e,t,n){},"9d6e":function(e,t,n){"use strict";n.r(t);var a=n("39eb"),i=n("47ae");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("41d1"),n("e8d3");var r,u=n("f0c5"),s=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"a878bb88",null,!1,a["a"],r);t["default"]=s.exports},e8d3:function(e,t,n){"use strict";var a=n("61f0"),i=n.n(a);i.a}},[["079ed","common/runtime","common/vendor"]]]);