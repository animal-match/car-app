(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/distributor/fetch/index"],{"042d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{showKeyboard:!1,canFetchMoney:"",cash:"",recordsList:[],page:{totalPages:0,page:1}}},onShow:function(){this.page.page=1,this.recordsList=[],this.fetchList(),this.canFetchMoney=this.$store.state.user.money},onReachBottom:function(){console.log("触底！"),this.page.page<this.page.totalPages&&(this.page.page+=1,this.fetchList())},methods:{totalFetch:function(){this.cash=this.canFetchMoney},fetchList:function(){var e=this;this.$request({url:"/api/withdrawal/index",method:"POST",data:{page:this.page.page},success:function(n){if(0===n.code)return t.showToast({icon:"none",title:n.msg,duration:3e3}),!1;var o=n.data.data;e.recordsList=e.recordsList.concat(o),console.log(e.recordsList,"列表"),e.page.totalPages=n.data.last_page},fail:function(e){t.showToast({title:e.msg,icon:none})}})},fetch:function(){this.cash="",t.hideKeyboard(),this.showKeyboard=!0},valChange:function(t){this.cash+=t,console.log("你输入的金额",this.cash)},backspace:function(){this.cash.length&&(this.cash=this.cash.substr(0,this.cash.length-1)),console.log("你输入的金额（退格后)",this.cash)},cancel:function(){this.cash=""},confirm:function(){this.cash=Number(this.cash).toFixed(2)},fetchConfirm:function(){var e=this;if(this.cash<=0)t.showToast({title:"请输入提现金额",icon:"none"});else{if(this.cash>this.canFetchMoney)return t.showToast({title:"超出可提现金额范围",icon:"none"}),!1;var n=t.getStorageSync("token");this.$request({url:"/api/withdrawal/apply",method:"POST",data:{money:this.cash,token:n},success:function(n){if(0===n.code)return t.showToast({icon:"none",title:n.msg,duration:3e3}),!1;t.navigateTo({url:"fetch-success?cash="+e.cash}),e.cash=""}})}}}};e.default=n}).call(this,n("543d")["default"])},"3a11":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}));var o={uField:function(){return n.e("node-modules/uview-ui/components/u-field/u-field").then(n.bind(null,"ab43"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"8626"))},uGap:function(){return n.e("node-modules/uview-ui/components/u-gap/u-gap").then(n.bind(null,"dd55"))},uKeyboard:function(){return n.e("node-modules/uview-ui/components/u-keyboard/u-keyboard").then(n.bind(null,"1f9f"))}},a=function(){var t=this,e=t.$createElement;t._self._c},s=[]},"3ead":function(t,e,n){"use strict";var o=n("c81b"),a=n.n(o);a.a},"433f":function(t,e,n){"use strict";var o=n("c021"),a=n.n(o);a.a},"638b":function(t,e,n){"use strict";n.r(e);var o=n("042d"),a=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=a.a},"6c5f":function(t,e,n){"use strict";(function(t){n("e3e7");o(n("66fd"));var e=o(n("9597"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},9597:function(t,e,n){"use strict";n.r(e);var o=n("3a11"),a=n("638b");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("433f"),n("3ead");var i,c=n("f0c5"),u=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"088a51c6",null,!1,o["a"],i);e["default"]=u.exports},c021:function(t,e,n){},c81b:function(t,e,n){}},[["6c5f","common/runtime","common/vendor"]]]);