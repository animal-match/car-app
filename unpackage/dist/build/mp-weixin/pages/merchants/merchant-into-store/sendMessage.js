(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/merchants/merchant-into-store/sendMessage"],{"2ba1":function(e,t,s){"use strict";s.r(t);var n=s("41b0"),o=s.n(n);for(var i in n)"default"!==i&&function(e){s.d(t,e,(function(){return n[e]}))}(i);t["default"]=o.a},"2fad":function(e,t,s){"use strict";var n=s("390f"),o=s.n(n);o.a},"390f":function(e,t,s){},"41b0":function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={data:function(){return{page:{start:1,totalPages:0},userLoginId:"",storeId:"",storeType:0,messageList:[],activeItem:1,replyItem:1,isShow:!1,isDisabled:!1,messageId:"",form:{message:""},answer:"",customStyle:{width:"20px"}}},onLoad:function(e){this.storeId=e.id,this.storeType=e.type,console.log("商家id",e.id,e.type,typeof e.id)},onShow:function(){var e=this.$store.state.user.userId;this.userLoginId=e,console.log("登录Id",this.userLoginId,typeof this.userLoginId),this.getMessageList()},onReachBottom:function(){console.log("到底了","起始页",this.page.start),this.page.start<this.page.totalPages&&(this.page.start+=1,this.getMessageList())},methods:{getMessageList:function(){var t=this;this.$request({url:"/api/message/getList",method:"POST",data:{store_id:this.storeId,page:this.page.start,list_rows:10},success:function(s){if(0===s.code)return e.showToast({icon:"none",title:s.msg}),!1;console.log(s.data,"数据哦");var n=s.data.data;t.messageList=t.messageList.concat(n),t.page.totalPages=s.data.last_page}})},emitMessage:function(){var t=this;this.$request({url:"/api/message/index",method:"POST",data:{store_id:this.storeId,message:this.form.message},success:function(s){if(0===s.code)return e.showToast({icon:"none",title:s.msg}),!1;e.showToast({icon:"success",title:"已发送",duration:3e3}),t.page.start=1,t.messageList=[],t.getMessageList(),t.form.message=""}})},answerSubmit:function(t){var s=this;this.$request({url:"/api/message/reply",method:"POST",data:{id:this.messageId,reply:this.answer},success:function(t){if(0===t.code)return e.showToast({icon:"none",title:t.msg}),!1;e.showToast({icon:"success",title:"已发送",duration:3e3}),s.getMessageList(),s.answer=""}}),this.answer=""},showAwserInput:function(e,t){console.log(e,"留言ID",t),this.messageId=t,this.activeItem=e+1,this.isShow=!0}}};t.default=s}).call(this,s("543d")["default"])},"6e72":function(e,t,s){"use strict";s.d(t,"b",(function(){return o})),s.d(t,"c",(function(){return i})),s.d(t,"a",(function(){return n}));var n={uGap:function(){return s.e("node-modules/uview-ui/components/u-gap/u-gap").then(s.bind(null,"dd55"))},uForm:function(){return s.e("node-modules/uview-ui/components/u-form/u-form").then(s.bind(null,"a7af"))},uFormItem:function(){return Promise.all([s.e("common/vendor"),s.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(s.bind(null,"4674"))},uInput:function(){return Promise.all([s.e("common/vendor"),s.e("node-modules/uview-ui/components/u-input/u-input")]).then(s.bind(null,"b6ad"))},uButton:function(){return s.e("node-modules/uview-ui/components/u-button/u-button").then(s.bind(null,"8626"))},uImage:function(){return s.e("node-modules/uview-ui/components/u-image/u-image").then(s.bind(null,"7583"))}},o=function(){var e=this,t=e.$createElement,s=(e._self._c,"string"===typeof e.$$v?e.$$v.trim():null);e.$mp.data=Object.assign({},{$root:{g0:s}})},i=[]},d2e3:function(e,t,s){"use strict";(function(e){s("e3e7");n(s("66fd"));var t=n(s("fc25"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,s("543d")["createPage"])},fc25:function(e,t,s){"use strict";s.r(t);var n=s("6e72"),o=s("2ba1");for(var i in o)"default"!==i&&function(e){s.d(t,e,(function(){return o[e]}))}(i);s("2fad");var u,a=s("f0c5"),r=Object(a["a"])(o["default"],n["b"],n["c"],!1,null,"453a930c",null,!1,n["a"],u);t["default"]=r.exports}},[["d2e3","common/runtime","common/vendor"]]]);