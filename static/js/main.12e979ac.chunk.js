(this["webpackJsonplol-pick"]=this["webpackJsonplol-pick"]||[]).push([[0],{16:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),i=n.n(r),a=n(5),l=n.n(a),o=n(2),j=n(3),u=n(18),b=n(6),s=n(7),d=["top","jungle","mid","adc","support"],h=function(e,t){return!e||(null===e[t]||void 0===e[t]||e[t])},O=function(e){var t=e.name,n=e.roles,r=e.pick,i=e.formPrefix,a=e.onRoleChange;return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:Object(c.jsx)("input",{name:"".concat(i,"name"),defaultValue:t})}),d.map((function(e){return Object(c.jsx)("td",{children:Object(c.jsx)("input",{type:"checkbox",name:"".concat(i,"roles.").concat(e),defaultChecked:h(n,e),onChange:a})},e)})),Object(c.jsx)("td",{children:r})]})};var f=function(){var e=Object(u.a)("players"),t=Object(j.a)(e,2),n=t[0],i=void 0===n?[]:n,a=t[1],l=Object(r.useCallback)((function(e){var t=e.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{pick:void 0})}));d.forEach((function(e){var n=t.filter((function(t){return t.roles[e]&&!t.pick}));n.length<=0||(n[Object(b.random)(n.length-1)].pick=e)})),a(t)}),[a]),h=Object(r.useCallback)((function(e){e.preventDefault(),l(Object(s.a)(e).players)}),[l]),f=Object(r.useRef)(null),p=Object(r.useCallback)((function(){f.current&&f.current.click()}),[]);return Object(c.jsxs)("form",{onSubmit:h,children:[Object(c.jsxs)("table",{children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Player"}),d.map((function(e){return Object(c.jsx)("th",{children:e},e)})),Object(c.jsx)("th",{children:"Pick"})]})}),Object(c.jsx)("tbody",{children:Array.from({length:5}).map((function(e,t){return Object(c.jsx)(O,Object(o.a)(Object(o.a)({},i[t]),{},{formPrefix:"players.".concat(t,"."),onRoleChange:p}),t)}))})]}),Object(c.jsx)("button",{type:"submit",ref:f,children:"roll"})]})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))};l.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(f,{})}),document.getElementById("root")),p()}},[[16,1,2]]]);
//# sourceMappingURL=main.12e979ac.chunk.js.map