(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/merchant-enter/upload-file"],{"9b4c":function(e,t,i){"use strict";var o=i("a055"),n=i.n(o);n.a},a055:function(e,t,i){},a0d2:function(e,t,i){"use strict";i.r(t);var o=i("dc50"),n=i.n(o);for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);t["default"]=n.a},ac0b:function(e,t,i){"use strict";(function(e){i("e3e7");o(i("66fd"));var t=o(i("f9ed"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,i("543d")["createPage"])},b490:function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return o}));var o={uGap:function(){return i.e("node-modules/uview-ui/components/u-gap/u-gap").then(i.bind(null,"dd55"))},uInput:function(){return Promise.all([i.e("common/vendor"),i.e("node-modules/uview-ui/components/u-input/u-input")]).then(i.bind(null,"b6ad"))},uImage:function(){return i.e("node-modules/uview-ui/components/u-image/u-image").then(i.bind(null,"7583"))},uButton:function(){return i.e("node-modules/uview-ui/components/u-button/u-button").then(i.bind(null,"8626"))}},n=function(){var e=this,t=e.$createElement,i=(e._self._c,"string"===typeof e.$$v?e.$$v.trim():null);e.$mp.data=Object.assign({},{$root:{g0:i}})},a=[]},dc50:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=[["camera"],["album"],["camera","album"]],o={data:function(){return{imageUrl:"",inputValue:"",videoUrl:"",VideoOfImagesShow:!0,imageList:[],VideoList:[],sourceType:["拍摄","相册","拍摄或相册"],sourceTypeIndex:2,cameraList:[{value:"back",name:"后置摄像头",checked:"true"},{value:"front",name:"前置摄像头"}],cameraIndex:0,image:""}},onUnload:function(){this.imageList=[],this.sourceTypeIndex=2,this.sourceType=["拍摄","相册","拍摄或相册"]},methods:{submit:function(){if(this.inputValue.length<1)e.showToast({icon:"none",title:"请输入标题"});else{var t={title:this.inputValue,imageShow:this.imageList[0],image:this.imageUrl},i={title:this.inputValue,videoShow:this.VideoList[0],video:this.videoUrl};t.imageShow&&e.$emit("proDatas",t),i.videoShow&&e.$emit("proDatas2",i),e.showToast({icon:"success",title:"已保存"}),this.inputValue="",this.imageList=[],this.VideoList=[]}},chooseVideoImage:function(){var t=this;e.showActionSheet({title:"选择上传类型",itemList:["图片","视频"],success:function(e){console.log(e),0==e.tapIndex?t.chooseImages():t.chooseVideo()}})},chooseImages:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(i){t.imageList=t.imageList.concat(i.tempFilePaths),console.log(t.imageList,"你选择的图片"),1==t.imageList.length&&(t.VideoOfImagesShow=!1),e.uploadFile({url:"https://yanxu.n867.cn/index.php/api/common/upload",header:{"content-type":"application/x-www-form-urlencoded",token:e.getStorageSync("token")},filePath:i.tempFilePaths[0],name:"file",success:function(e){console.log(e.data,"res!!");var i=JSON.parse(e.data);t.imageUrl=i.data.fullurl,console.log("图片地址",t.imageUrl)}})}})},chooseVideo:function(t){var o=this;e.chooseVideo({maxDuration:60,count:1,camera:this.cameraList[this.cameraIndex].value,sourceType:i[this.sourceTypeIndex],success:function(t){o.VideoList=o.VideoList.concat(t.tempFilePath),console.log(o.VideoList,"你选择的视频"),1==o.VideoList.length&&(o.VideoOfImagesShow=!1),e.uploadFile({url:"https://yanxu.n867.cn/index.php/api/common/upload",header:{"content-type":"application/x-www-form-urlencoded",token:e.getStorageSync("token")},filePath:t.tempFilePath,name:"file",success:function(e){console.log("上传视频!!",e),o.videoUrl=e.data.fullurl,console.log("视频地址",o.videoUrl)}})}})},previewImage:function(t){console.log(t),e.previewImage({current:this.imageList[t],urls:this.imageList})},delect:function(t){var i=this;e.showModal({title:"提示",content:"是否要删除该图片",success:function(e){e.confirm&&(i.imageList.splice(t,1),i.imageUrl=""),1==i.imageList.length?i.VideoOfImagesShow=!1:i.VideoOfImagesShow=!0}})},delectVideo:function(t){var i=this;e.showModal({title:"提示",content:"是否要删除此视频",success:function(e){e.confirm&&(i.VideoList.splice(t,1),i.videoUrl=""),1==i.VideoList.length?i.VideoOfImagesShow=!1:i.VideoOfImagesShow=!0}})}}};t.default=o}).call(this,i("543d")["default"])},f9ed:function(e,t,i){"use strict";i.r(t);var o=i("b490"),n=i("a0d2");for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);i("9b4c");var s,u=i("f0c5"),c=Object(u["a"])(n["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=c.exports}},[["ac0b","common/runtime","common/vendor"]]]);