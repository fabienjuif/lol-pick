(this["webpackJsonplol-pick"]=this["webpackJsonplol-pick"]||[]).push([[0],{16:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),i=n.n(r),l=n(5),o=n.n(l),a=n(2),u=n(3),j=n(18),s=n(6),b=n(7),h=["top","jungle","mid","adc","support"],d=function(e,t){return!e||(null===e[t]||void 0===e[t]||e[t])},f=function(e){var t=e.name,n=e.roles,r=e.pick,i=e.formPrefix,l=e.onRoleChange;return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:Object(c.jsx)("input",{name:"".concat(i,"name"),defaultValue:t})}),h.map((function(e){return Object(c.jsx)("td",{children:Object(c.jsx)("input",{type:"checkbox",name:"".concat(i,"roles.").concat(e),defaultChecked:d(n,e),onChange:l})},e)})),Object(c.jsx)("td",{children:r})]})};var O=function(){var e=Object(j.a)("players"),t=Object(u.a)(e,2),n=t[0],i=void 0===n?[]:n,l=t[1],o=Object(r.useCallback)((function(e){for(var t=e.map((function(e){return Object(a.a)(Object(a.a)({},e),{},{pick:void 0})})),n=function(e){return t.filter((function(t){return t.roles[e]&&!t.pick}))},c=function(e,t){return n(e).length-n(t).length},r=h.slice().sort(c),i=function(){var e=r[0],n=t.filter((function(t){return t.roles[e]&&!t.pick}));n.length>0&&(n[Object(s.random)(n.length-1)].pick=e);r=r.slice(1).sort(c)};r.length>0;)i();l(t)}),[l]),d=Object(r.useCallback)((function(e){e.preventDefault();var t=Object(b.a)(e);o(t.players)}),[o]),O=Object(r.useRef)(null),p=Object(r.useCallback)((function(){O.current&&O.current.click()}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)("a",{href:"https://github.com/fabienjuif/lol-pick",children:"Source code"}),Object(c.jsxs)("form",{onSubmit:d,children:[Object(c.jsxs)("table",{children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Player"}),h.map((function(e){return Object(c.jsx)("th",{children:e},e)})),Object(c.jsx)("th",{children:"Pick"})]})}),Object(c.jsx)("tbody",{children:Array.from({length:5}).map((function(e,t){return Object(c.jsx)(f,Object(a.a)(Object(a.a)({},i[t]),{},{formPrefix:"players.".concat(t,"."),onRoleChange:p}),t)}))})]}),Object(c.jsx)("button",{type:"submit",ref:O,children:"roll"})]})]})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,l=t.getTTFB;n(e),c(e),r(e),i(e),l(e)}))};o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(O,{})}),document.getElementById("root")),p()}},[[16,1,2]]]);
//# sourceMappingURL=main.db8ccf19.chunk.js.map