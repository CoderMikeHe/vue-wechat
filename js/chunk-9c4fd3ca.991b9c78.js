(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9c4fd3ca"],{"0b33":function(e,t,n){},"0c25":function(e,t,n){"use strict";var i=n("0b33"),a=n.n(i);a.a},5118:function(e,t,n){(function(e){var i="undefined"!==typeof e&&e||"undefined"!==typeof self&&self||window,a=Function.prototype.apply;function s(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new s(a.call(setTimeout,i,arguments),clearTimeout)},t.setInterval=function(){return new s(a.call(setInterval,i,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},s.prototype.unref=s.prototype.ref=function(){},s.prototype.close=function(){this._clearFn.call(i,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n("6017"),t.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n("c8ba"))},"589b":function(e,t,n){"use strict";var i=n("e67f"),a=n.n(i);a.a},6017:function(e,t,n){(function(e,t){(function(e,n){"use strict";if(!e.setImmediate){var i,a=1,s={},c=!1,o=e.document,r=Object.getPrototypeOf&&Object.getPrototypeOf(e);r=r&&r.setTimeout?r:e,"[object process]"==={}.toString.call(e.process)?f():h()?m():e.MessageChannel?v():o&&"onreadystatechange"in o.createElement("script")?g():w(),r.setImmediate=l,r.clearImmediate=u}function l(e){"function"!==typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var c={callback:e,args:t};return s[a]=c,i(a),a++}function u(e){delete s[e]}function d(e){var t=e.callback,i=e.args;switch(i.length){case 0:t();break;case 1:t(i[0]);break;case 2:t(i[0],i[1]);break;case 3:t(i[0],i[1],i[2]);break;default:t.apply(n,i);break}}function p(e){if(c)setTimeout(p,0,e);else{var t=s[e];if(t){c=!0;try{d(t)}finally{u(e),c=!1}}}}function f(){i=function(e){t.nextTick(function(){p(e)})}}function h(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}function m(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"===typeof n.data&&0===n.data.indexOf(t)&&p(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),i=function(n){e.postMessage(t+n,"*")}}function v(){var e=new MessageChannel;e.port1.onmessage=function(e){var t=e.data;p(t)},i=function(t){e.port2.postMessage(t)}}function g(){var e=o.documentElement;i=function(t){var n=o.createElement("script");n.onreadystatechange=function(){p(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}function w(){i=function(e){setTimeout(p,0,e)}}})("undefined"===typeof self?"undefined"===typeof e?this:e:self)}).call(this,n("c8ba"),n("f28c"))},a9e3:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("vue-route-layout",{staticClass:"register__wrapper"},[i("div",{staticClass:"cancel__wrapper"},[i("span",{on:{click:function(t){return e.$router.back()}}},[e._v("取消")])]),i("div",{staticClass:"content__wrapper"},[i("h1",{staticClass:"content__title"},[e._v("用手机号注册")]),i("div",{staticClass:"content__avatar",on:{click:function(t){e.showActionSheet=!0}}}),i("div",{staticClass:"content__container"},[i("div",{staticClass:"weui-cell lg-cell"},[i("div",{staticClass:"weui-cell__hd"},[i("label",{staticClass:"weui-label"},[e._v("昵称")])]),i("div",{staticClass:"weui-cell__bd"},[i("div",{staticClass:"mh-input__wrapper"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.nickname,expression:"nickname"}],staticClass:"weui-input",attrs:{required:"",type:"text",placeholder:"陈晨"},domProps:{value:e.nickname},on:{input:function(t){t.target.composing||(e.nickname=t.target.value)}}}),i("a",{staticClass:"weui-icon-clear",attrs:{href:"javascript:"},on:{click:function(t){t.preventDefault(),e.nickname=""}}})])])]),i("div",{staticClass:"weui-cell lg-cell"},[i("div",{staticClass:"weui-cell__hd"},[i("label",{staticClass:"weui-label"},[e._v("国家/地区")])]),i("div",{staticClass:"weui-cell__bd"},[i("p",{staticClass:"mh-zone-title",on:{click:e.skip2ZoneList}},[e._v("中国大陆")])]),i("div",{staticClass:"weui-cell__ft"},[i("img",{staticClass:"lg-right-arrow",attrs:{src:n("1685")}})])]),i("div",{staticClass:"weui-cell lg-cell"},[i("div",{staticClass:"weui-cell__hd lg-cell__hd"},[i("label",{staticClass:"lg-zone"},[e._v("+")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.zoneCode,expression:"zoneCode"}],staticClass:"weui-input",attrs:{type:"tel",maxlength:"4"},domProps:{value:e.zoneCode},on:{input:function(t){t.target.composing||(e.zoneCode=t.target.value)}}})]),i("div",{staticClass:"weui-cell__bd"},[i("div",{staticClass:"mh-input__wrapper"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],staticClass:"weui-input",attrs:{required:"",type:"tel",maxlength:"13",placeholder:"请填写手机号码"},domProps:{value:e.phone},on:{input:[function(t){t.target.composing||(e.phone=t.target.value)},e.inputValueChanged]}}),i("a",{staticClass:"weui-icon-clear",attrs:{href:"javascript:"},on:{click:function(t){t.preventDefault(),e.phone=""}}})])])]),i("div",{staticClass:"weui-cell lg-cell"},[i("div",{staticClass:"weui-cell__hd"},[i("label",{staticClass:"weui-label"},[e._v("密码")])]),i("div",{staticClass:"weui-cell__bd"},[i("div",{staticClass:"mh-input__wrapper"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"weui-input",attrs:{required:"required",type:"password",placeholder:"请设置密码",maxlength:"16"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),i("a",{staticClass:"weui-icon-clear",attrs:{href:"javascript:"},on:{click:function(t){t.preventDefault(),e.password=""}}})])])])])]),i("div",{staticClass:"agreement__wrapper",class:{animated:e.shaked,shake:e.shaked}},[i("i",{staticClass:"iconfont",class:[e.checked?"icon-checked-plain":"icon-check-plain"],on:{click:function(t){e.checked=!e.checked}}}),i("span",[e._v("我已阅读并同意")]),i("a",{staticClass:"link",attrs:{href:"javascript:home();"}},[e._v("《微信软件许可及服务协议》")])]),i("a",{staticClass:"weui-btn weui-btn_block weui-btn_primary lg-login-btn",class:{"lg-btn--disabled":e.registerBtnDisabled},attrs:{href:"javascript:;"},on:{click:function(t){return t.preventDefault(),e.registerAction(t)}}},[e._v("注册")]),i("ActionSheet",{attrs:{items:e.items},on:{"did-click-item":e.didClickItem},model:{value:e.showActionSheet,callback:function(t){e.showActionSheet=t},expression:"showActionSheet"}})],1)},a=[],s=(n("a481"),n("7ff6")),c=n("c3fb"),o=n("b45d"),r=n("eff6"),l=n("5118"),u={name:"register",components:{ActionSheet:s["b"]},data:function(){return{nickname:"",zoneCode:"86",phone:"",password:"",showActionSheet:!1,items:[],checked:!1,shaked:!1}},created:function(){this.configItems()},methods:{inputValueChanged:function(e){if(e.data){var t=this.phone.replace(/\s/g,"");this.phone=c["a"].formatMobile344(t)}else this.phone=this.phone.trim()},registerAction:function(){var e=this;if(!this.checked)return this.shaked=!0,void Object(l["setTimeout"])(function(){e.shaked=!1},1e3);var t=c["a"].removesWhitespace(this.phone);if(c["a"].validMobile(t))if(this.password.length<8||this.password.length>16||c["a"].includeChinese(this.password)||c["a"].pureDigitCharacters(this.password))this.$weui.alert("",{title:"密码必须是8-16位英文字母、数字、字符组合（不能是纯数字）"});else{var n=this.$weui.loading("请稍后...");Object(l["setTimeout"])(function(){n.hide();var t=Object.assign({},o["a"]);t.qq="491273090",t.emial="491273090@qq.com",t.phone=c["a"].removesWhitespace(e.phone),t.channel="Mobile Phone",t.screen_name=e.nickname,r["a"].login(t,e.phone)},1e3)}else{var i="你输入的是一个无效的手机号码",a="手机号码错误";this.$weui.alert(i,{title:a})}},configItems:function(){var e=new s["a"]({title:"拍照"}),t=new s["a"]({title:"从手机相册选择"});this.items=[e,t]},didClickItem:function(e){0!==e&&this.$router.replace("/current-login")},skip2ZoneList:function(){}},computed:{registerBtnDisabled:function(){return this.nickname.length<=0||this.phone.length<=0||this.password.length<=0}}},d=u,p=(n("589b"),n("0c25"),n("2877")),f=Object(p["a"])(d,i,a,!1,null,"22691e28",null);t["default"]=f.exports},b45d:function(e,t,n){"use strict";t["a"]={screen_name:"Mike-乱港三千-Mr_元先森",idstr:"61856069",profile_image_url:"http://tva3.sinaimg.cn/crop.0.6.264.264.180/93276e1fjw8f5c6ob1pmpj207g07jaa5.jpg",avatar_large:"",coverImageUrl:"http://p1.gexing.com/G1/M00/7A/83/rBACE1TW-cjDb2yHAAGORXsJM6w706.jpg",coverImage:"Kris.jpeg",wechatId:"codermikehe",featureSign:"生死看淡，不服就干",gender:0,qq:"",email:"",phone:"",channel:""}},e67f:function(e,t,n){},f28c:function(e,t){var n,i,a=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function o(e){if(n===setTimeout)return setTimeout(e,0);if((n===s||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}function r(e){if(i===clearTimeout)return clearTimeout(e);if((i===c||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{return i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(function(){try{n="function"===typeof setTimeout?setTimeout:s}catch(e){n=s}try{i="function"===typeof clearTimeout?clearTimeout:c}catch(e){i=c}})();var l,u=[],d=!1,p=-1;function f(){d&&l&&(d=!1,l.length?u=l.concat(u):p=-1,u.length&&h())}function h(){if(!d){var e=o(f);d=!0;var t=u.length;while(t){l=u,u=[];while(++p<t)l&&l[p].run();p=-1,t=u.length}l=null,d=!1,r(e)}}function m(e,t){this.fun=e,this.array=t}function v(){}a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||d||o(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=v,a.addListener=v,a.once=v,a.off=v,a.removeListener=v,a.removeAllListeners=v,a.emit=v,a.prependListener=v,a.prependOnceListener=v,a.listeners=function(e){return[]},a.binding=function(e){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}}}]);
//# sourceMappingURL=chunk-9c4fd3ca.991b9c78.js.map