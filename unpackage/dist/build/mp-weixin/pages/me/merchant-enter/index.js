(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/merchant-enter/index"],{"0e73":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return o}));var o={uTabs:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-tabs/u-tabs")]).then(n.bind(null,"72f6"))},uForm:function(){return n.e("node-modules/uview-ui/components/u-form/u-form").then(n.bind(null,"a7af"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"4674"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-input/u-input")]).then(n.bind(null,"b6ad"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"8626"))},uSelect:function(){return n.e("node-modules/uview-ui/components/u-select/u-select").then(n.bind(null,"d4ef"))},uImage:function(){return n.e("node-modules/uview-ui/components/u-image/u-image").then(n.bind(null,"7583"))},uGap:function(){return n.e("node-modules/uview-ui/components/u-gap/u-gap").then(n.bind(null,"dd55"))}},i=function(){var e=this,t=e.$createElement;e._self._c},s=[]},1368:function(e,t,n){"use strict";n.r(t);var o=n("0e73"),i=n("1d9a");for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);n("dcbf"),n("616f");var r,u=n("f0c5"),a=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"aaa012d2",null,!1,o["a"],r);t["default"]=a.exports},"1d9a":function(e,t,n){"use strict";n.r(t);var o=n("b2df"),i=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=i.a},"616f":function(e,t,n){"use strict";var o=n("c100"),i=n.n(o);i.a},"7f02":function(e,t,n){"use strict";(function(e){n("e3e7");o(n("66fd"));var t=o(n("1368"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},b2df:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){var e=this;return{border:!0,currentTab:0,showRegion:!1,tagList:[],imageTitle:[],videoTitle:[],showTags:!1,tabList:[{name:"厂商"},{name:"经销商"}],form:{merchantName:"",merchantIntro:"",id:"",name:"",phoneNo:"",address:"",selected:{longitude:"",latitude:""}},rules:{merchantName:[{required:!0,message:"请输入厂家名称",trigger:["change","blur"]}],merchantIntro:[{required:!0,message:"如：24管控制器，国际1200瓦电机，双梁等",trigger:["change","blur"]}],id:[{validator:function(e,t,n){return console.log(t,"选了什么"),!!t},message:"请选择标签",trigger:["change","blur"]}],phoneNo:[{required:!0,message:"请输入电话号码",trigger:["change","blur"]},{validator:function(t,n,o){return e.$u.test.mobile(n)},message:"手机号码格式不正确",trigger:["change","blur"]}],address:[{validator:function(e,t,n){return console.log(t,"选了什么"),t.length>0},message:"请选择地址",trigger:["change","blur"]}]},action:"",fileList:[]}},computed:{address:function(){return this.form.address.length>0?this.form.address:""}},onLoad:function(){e.$on("addressInfo",this.addressInfos),e.$on("proDatas",this.productDatas),e.$on("proDatas2",this.productDatas2)},onShow:function(){this.getTags()},methods:{openSheet:function(){this.showTags=!0},tagConfirm:function(e){console.log(e),this.form.id=e[0].value,this.form.name=e[0].label},addressInfos:function(e){console.log(e,"传来的地址对象"),this.form.address=e.address,this.form.selected.longitude=e.longitude,this.form.selected.latitude=e.latitude},productDatas:function(e){this.imageTitle=this.imageTitle.concat(e),console.log("产品名和图",this.imageTitle)},productDatas2:function(e){this.videoTitle=this.videoTitle.concat(e),console.log("产品名和视频",this.videoTitle)},getTags:function(){var t=this;this.$request({url:"/api/category/getList",method:"POST",success:function(n){if(0==n.code)return e.showToast({icon:"none",title:n.msg}),!1;t.tagList=n.data}})},chooseAddress:function(){e.navigateTo({url:"./map"})},jump:function(){e.navigateTo({url:"upload-file"})},change:function(e){var t=this;this.currentTab=e,this.$refs.ruleForm.resetFields(),Object.keys(this.form).forEach((function(e){t.form[e]=""})),this.imageTitle=[],this.videoTitle=[]},submit:function(){var t=this;console.log("除了产品填了些什么",this.form);var n=this.imageTitle.concat(this.videoTitle);this.toServer(n),this.$refs.ruleForm.validate((function(n){if(n){if(console.log("所有校验通过"),0==t.imageTitle.length&&0==t.videoTitle.length)return void e.showToast({icon:"none",title:"您还未上传产品"});console.log("提交成功！！！")}else console.log("验证失败"),t.$request({url:"/api/category/getList",method:"POST",success:function(n){if(0==n.code)return e.showToast({icon:"none",title:n.msg}),!1;t.tagList=n.data}})}))},toServer:function(t){console.log("访问接口",this.form.selected),this.$request({url:"/api/store/apply",method:"POST",data:{address:this.form.address,store_name:this.form.merchantName,information:this.form.merchantIntro,type:this.currentTab,phone:this.form.phoneNo,store_category_id:this.form.id,goods:JSON.stringify(t)},success:function(t){e.showToast({icon:"success",title:t.msg}),e.navigateTo({url:"/pages/me/index"})}})}},onReady:function(){this.$refs.ruleForm.setRules(this.rules)}};t.default=n}).call(this,n("543d")["default"])},c100:function(e,t,n){},dcbf:function(e,t,n){"use strict";var o=n("f901"),i=n.n(o);i.a},f901:function(e,t,n){}},[["7f02","common/runtime","common/vendor"]]]);