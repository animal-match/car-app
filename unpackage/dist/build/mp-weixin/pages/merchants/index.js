(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/merchants/index"],{"215f":function(t,e,n){"use strict";(function(t){n("e3e7");i(n("66fd"));var e=i(n("3bdd"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"2dcc":function(t,e,n){"use strict";var i=n("6934"),o=n.n(i);o.a},"2e95":function(t,e,n){},"3bdd":function(t,e,n){"use strict";n.r(e);var i=n("f9bf"),o=n("ff65");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("2dcc"),n("e1c5");var s,c=n("f0c5"),r=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"0cdece80",null,!1,i["a"],s);e["default"]=r.exports},6934:function(t,e,n){},"764e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){n.e("components/empty").then(function(){return resolve(n("ca18"))}.bind(null,n)).catch(n.oe)},o={components:{Empty:i},data:function(){return{scrollTop:0,informations:[],type:"text",form:{searchKey:""},categoryList:[],activeItem:1,currentTab:0,id:0,activeId:0,activeId_2:0,provinceCodeList:[],provinceCode:0,cityCodeList:[],cityCode:0,countyCodeList:[],countyCode:0,data:{},tabList:[{name:"厂商"},{name:"经销商"}]}},onHide:function(){delete this.$store.state.pageIndex,console.log("监听页面隐藏")},onShow:function(){console.log("监听页面show");var e=this.$store.state.pageIndex;this.activeId=this.$store.state.activeId,this.activeId_2=this.$store.state.activeId_2,this.id=0===this.currentTab?this.activeId:this.activeId_2,"undefined"!==typeof e&&(console.log("不是Undefined"),t.removeStorageSync("tabBarData"),t.removeStorageSync("tabBarIndex"),this.currentTab=e,this.activeItem=1,this.id=0===this.currentTab?this.activeId:this.activeId_2);var n=t.getStorageSync("tabBarData");Object.keys(n).length>0&&(this.activeItem=n.activeItem,this.id=n.id);var i=t.getStorageSync("tabBarIndex");i&&(this.currentTab=i);var o=t.getStorageSync("tabBarData");o&&(this.id=o.id),this.getCategory(),this.getStoreList(this.provinceCode,this.cityCode,this.countyCode),console.log("onshow的时候5")},onLoad:function(){console.log("监听页面load"),this.getAreaData()},methods:{provinceChange:function(t){this.provinceCode=t,this.getStoreList(t),this.data={province:t},t&&this.getAreaData(this.data),this.countyCodeList=[]},cityChange:function(t){this.cityCode=t,this.getStoreList(this.provinceCode,t),this.data.city=t,t&&this.getAreaData(this.data,"city")},countyChange:function(t){this.countyCode=t,this.getStoreList(this.provinceCode,this.cityCode,t)},getAreaData:function(e,n){var i=this,o={url:"/api/store/area",success:function(o){if(1!=o.code)return t.showToast({icon:"none",title:o.msg}),!1;e||(i.provinceCodeList=JSON.parse(JSON.stringify(o.data).replace(/name/g,"label"))),e&&"city"!==n&&(i.cityCodeList=JSON.parse(JSON.stringify(o.data).replace(/name/g,"label"))),e&&"city"===n&&(i.countyCodeList=JSON.parse(JSON.stringify(o.data).replace(/name/g,"label")))}};e&&(o.data=e),this.$request(o)},getCategory:function(){var e=this;this.$request({url:"/api/category/getList",method:"POST",data:{type:this.currentTab},success:function(n){if(0===n.code)return t.showToast({icon:"none",title:n.msg,duration:3e3}),!1;e.categoryList=n.data}})},getStoreList:function(e,n,i){var o=this;this.$request({url:"/api/category/index",method:"POST",data:{type:this.currentTab,id:this.id,keyword:this.form.searchKey,province_id:e||"",city_id:n||"",area_id:i||""},success:function(e){if(0===e.code)return t.showToast({icon:"none",title:e.msg,duration:3e3}),!1;console.log(e.data,"商家列表"),o.informations=e.data}})},search:function(){var t=this.provinceCode,e=this.cityCode,n=this.countyCode;this.getStoreList(t,e,n),console.log("搜索2")},change:function(e){this.activeItem=1,this.id=0===e?this.activeId:this.activeId_2;var n={activeItem:this.activeItem,id:this.id};t.setStorageSync("tabBarData",n),this.form.searchKey="",this.currentTab=e,this.getCategory(),this.getStoreList(),console.log("切换顶部3"),t.setStorageSync("tabBarIndex",e),this.clearArea()},clearArea:function(){this.provinceCodeList=[],this.provinceCode=0,this.cityCodeList=[],this.cityCode=0,this.countyCodeList=[],this.countyCode=0,this.getAreaData()},switchTab:function(e,n){console.log("index",e,"id",n),this.form.searchKey="",this.activeItem=e+1,this.id=n,console.log("id是几何",this.id),this.getStoreList(),console.log("切换左侧4");var i={activeItem:this.activeItem,id:this.id};t.setStorageSync("tabBarData",i),this.clearArea()},scrolltolower:function(t){console.log("滚动到底部了",t)},goToStore:function(e){t.navigateTo({url:"/pages/merchants/merchant-into-store/index?id="+e})}}};e.default=o}).call(this,n("543d")["default"])},e1c5:function(t,e,n){"use strict";var i=n("2e95"),o=n.n(i);o.a},f9bf:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uTabs:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-tabs/u-tabs")]).then(n.bind(null,"72f6"))},uForm:function(){return n.e("node-modules/uview-ui/components/u-form/u-form").then(n.bind(null,"a7af"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"4674"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-input/u-input")]).then(n.bind(null,"b6ad"))},uDropdown:function(){return n.e("node-modules/uview-ui/components/u-dropdown/u-dropdown").then(n.bind(null,"1d52"))},uDropdownItem:function(){return n.e("node-modules/uview-ui/components/u-dropdown-item/u-dropdown-item").then(n.bind(null,"26c8"))},uGap:function(){return n.e("node-modules/uview-ui/components/u-gap/u-gap").then(n.bind(null,"dd55"))},uImage:function(){return n.e("node-modules/uview-ui/components/u-image/u-image").then(n.bind(null,"7583"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"8626"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},ff65:function(t,e,n){"use strict";n.r(e);var i=n("764e"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a}},[["215f","common/runtime","common/vendor"]]]);