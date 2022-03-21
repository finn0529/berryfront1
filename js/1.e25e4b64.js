(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"077c":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"newProduct"}},[o("q-form",{staticClass:"q-pa-md q-gutter-sm",on:{submit:function(t){return t.preventDefault(),e.submitProduct.apply(null,arguments)}}},[o("q-input",{attrs:{outlined:"",color:"black","bg-color":"white",label:"商品名稱",rules:[function(e){return e.length>0||"商品名稱必填"}]},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}}),o("q-editor",{ref:"editor",attrs:{toolbar:[[{icon:e.$q.iconSet.editor.align,fixedLabel:!0,list:"only-icons",options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token"],["removeFormat"],[{icon:e.$q.iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]}],["undo","redo"]]},scopedSlots:e._u([{key:"token",fn:function(){return[o("q-btn-dropdown",{ref:"token",attrs:{dense:"","no-caps":"","no-wrap":"",unelevated:"",color:"white","text-color":"black",label:"Color",size:"sm"}},[o("q-list",{attrs:{dense:""}},[o("q-item",{attrs:{tag:"label",clickable:""},on:{click:function(t){return e.color("backColor",e.highlight)}}},[o("q-item-section",{attrs:{side:""}},[o("q-icon",{attrs:{name:"highlight"}})],1),o("q-item-section",[o("q-color",{staticClass:"my-picker",attrs:{"default-view":"palette","no-header":"","no-footer":"",palette:["#ffccccaa","#ffe6ccaa","#ffffccaa","#ccffccaa","#ccffe6aa","#ccffffaa","#cce6ffaa","#ccccffaa","#e6ccffaa","#ffccffaa","#ff0000aa","#ff8000aa","#ffff00aa","##00ff00aa","#00ff80aa","#00ffffaa","#0080ffaa","#0000ffaa","#8000ffaa","#ff00ffaa"]},model:{value:e.highlight,callback:function(t){e.highlight=t},expression:"highlight"}})],1)],1),o("q-item",{attrs:{tag:"label",clickable:""},on:{click:function(t){return e.color("foreColor",e.foreColor)}}},[o("q-item-section",{attrs:{side:""}},[o("q-icon",{attrs:{name:"format_paint"}})],1),o("q-item-section",[o("q-color",{staticClass:"my-picker",attrs:{"no-header":"","no-footer":"","default-view":"palette",palette:["#ff0000","#ff8000","#ffff00","##00ff00","#00ff80","#00ffff","#0080ff","#0000ff","#8000ff","#ff00ff"]},model:{value:e.foreColor,callback:function(t){e.foreColor=t},expression:"foreColor"}})],1)],1)],1)],1)]},proxy:!0}]),model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}}),o("q-select",{attrs:{outlined:"",options:e.categories,color:"black","bg-color":"white",label:"請選擇分類"},model:{value:e.form.category,callback:function(t){e.$set(e.form,"category",t)},expression:"form.category"}}),o("q-input",{attrs:{outlined:"",color:"black","bg-color":"white",type:"number",prefix:"$"},model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}}),o("vue-dropzone",{attrs:{id:"dz-image",options:e.dzoptions,useCustomSlot:!0},model:{value:e.form.image,callback:function(t){e.$set(e.form,"image",t)},expression:"form.image"}},[o("div",{staticClass:"dropzone-custom-content"},[o("h3",{staticClass:"dropzone-custom-title"},[e._v("拖移檔案至此")]),o("div",{staticClass:"subtitle"},[e._v("或點擊並選擇檔案上傳")])])]),o("div",[o("q-radio",{attrs:{dense:"",val:!0,label:"已上架"},model:{value:e.form.sell,callback:function(t){e.$set(e.form,"sell",t)},expression:"form.sell"}}),o("q-radio",{attrs:{dense:"",val:!1,label:"未上架"},model:{value:e.form.sell,callback:function(t){e.$set(e.form,"sell",t)},expression:"form.sell"}})],1),o("q-btn",{attrs:{color:"white","text-color":"black",to:"/admin/product"},on:{click:e.cancelSave}},[e._v("取消")]),o("q-btn",{attrs:{color:"blue-5",type:"submitprevent"}},[e._v("儲存")])],1)],1)},i=[],s=(o("ddb0"),o("e01a"),{data(){return{products:[],BtnDisabled:!1,dzoptions:{url:"https://httpbin.org/post",thumbnailWidth:200,addRemoveLinks:!0,maxFilesize:100},categories:["上衣","褲子","裙子","洋裝","配飾"],form:{name:"",price:null,description:"",image:[],sell:!1,category:"",files:null,_id:"",index:-1},foreColor:"#000000",highlight:"#ffff00aa",editor:""}},computed:{state(){return{name:0!==this.form.name.length||null,price:0===this.form.price.length?null:this.form.price>0}}},methods:{color(e,t){const o=this.$refs.editor;this.$refs.token.hide(),o.caret.restore(),o.runCmd(e,t),o.focus()},async submitProduct(e){if(e.preventDefault(),!this.state.name||!this.state.price)return;this.BtnDisabled=!0;const t=new FormData;for(const a in this.form)"_id"!==a&&"image"!==a&&"coloroptions"!==a&&t.append(a,this.form[a]);for(const a of this.form.image)t.append("image",a);try{if(0===this.form._id.length){const{data:e}=await this.api.post("/products",t,{headers:{authorization:"Bearer "+this.user.token}});this.products.push(e.result)}else{const{data:e}=await this.api.patch("/products/"+this.form._id,t,{headers:{authorization:"Bearer "+this.user.token}});this.products[this.form.index]={...this.form,image:e.result.image},this.products.push(e.result),console.log(t)}this.$router.push("/admin/product"),this.$q.notify({message:"上傳成功",type:"positive"})}catch(o){console.log(this.form),this.$q.notify({message:o.response.data.message,type:"negative"})}this.BtnDisabled=!1},cancelSave(){this.form={name:"",price:0,description:"",image:null,sell:!1,category:"",_id:""}}},async created(){if(this.$route.params.id)try{const{data:e}=await this.api.get("/products/"+this.$route.params.id);this.form.name=e.result.name,this.form.price=e.result.price,this.form.description=e.result.description,this.form.category=e.result.category,this.form.sell=e.result.sell,this.form._id=e.result._id}catch(e){this.$q.notify({message:e.response.data.message,type:"negative"})}}}),r=s,l=o("2877"),n=o("0378"),c=o("27f9"),f=o("d66b"),d=o("f20b"),m=o("1c1c"),u=o("66e5"),p=o("4074"),h=o("0016"),b=o("b498"),g=o("ddd8"),v=o("3786"),k=o("9c40"),q=o("eebe"),y=o.n(q),w=Object(l["a"])(r,a,i,!1,null,null,null);t["default"]=w.exports;y()(w,"components",{QForm:n["a"],QInput:c["a"],QEditor:f["a"],QBtnDropdown:d["a"],QList:m["a"],QItem:u["a"],QItemSection:p["a"],QIcon:h["a"],QColor:b["a"],QSelect:g["a"],QRadio:v["a"],QBtn:k["a"]})}}]);