(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var a=t(14),c=t.n(a),r=t(3),o=t(2),u=t(0),i=function(e){var n=e.onChange,t=e.value;return Object(u.jsxs)("div",{children:["filter shown with",Object(u.jsx)("input",{value:t,onChange:n})]})},s=function(e){var n=e.addPerson,t=e.data;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:["name:",Object(u.jsx)("input",{value:t.newName,onChange:t.handleNameChange})]}),Object(u.jsxs)("div",{children:["number:",Object(u.jsx)("input",{value:t.newNumber,onChange:t.handleNumberChange})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},d=t(4),l=t.n(d),b="/api/persons",j={getAll:function(){return l.a.get(b)},create:function(e){return l.a.post(b,e)},deletePerson:function(e){return l.a.delete("".concat(b,"/").concat(e))},updatePerson:function(e,n){return l.a.put("".concat(b,"/").concat(e),n)}},h=function(e){var n,t=e.persons,a=e.filter,c=e.setPersons,r=function(e,n){window.confirm("Delete ".concat(n.name))&&j.deletePerson(n.id).then(c(e.filter((function(e){return e!==n}))))};""===a?n=t.map((function(e){return Object(u.jsxs)("div",{children:[e.name," ",e.number,Object(u.jsx)("button",{onClick:function(){return r(t,e)},children:"delete"},e.name)]},e.name)})):n=t.filter((function(e){return e.name.toLowerCase().includes(a.toLowerCase())})).map((function(e){return Object(u.jsxs)("div",{children:[e.name," ",e.number,Object(u.jsx)("button",{onClick:function(){return r(t,e)},value:e,children:"delete"},e.name)]},e.name)}));return n},m=function(){var e=Object(o.useState)([]),n=Object(r.a)(e,2),t=n[0],a=n[1];Object(o.useEffect)((function(){j.getAll().then((function(e){a(e.data)}))}),[]);var c=Object(o.useState)(null),d=Object(r.a)(c,2),l=d[0],b=d[1],m=Object(o.useState)(""),f=Object(r.a)(m,2),O=f[0],p=f[1],v=Object(o.useState)(""),g=Object(r.a)(v,2),x=g[0],w=g[1],C=Object(o.useState)(""),k=Object(r.a)(C,2),N=k[0],P=k[1],S={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},y=function(e){var n=e.msg;return null===n?null:Object(u.jsx)("div",{style:S,children:n})},A={newName:O,newNumber:x,handleNameChange:function(e){p(e.target.value)},handleNumberChange:function(e){w(e.target.value)}};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(y,{msg:l}),Object(u.jsx)(i,{onChange:function(e){P(e.target.value)},value:N}),Object(u.jsx)("h3",{children:"add a new"}),Object(u.jsx)(s,{addPerson:function(e){if(e.preventDefault(),t.some((function(e){return e.name===O}))){if(window.confirm("".concat(O," is already added to phonebook, replace the old number with new one?"))){var n=t.find((function(e){return e.name===O}));n.number=x,j.updatePerson(n.id,n).then((function(e){a(t.map((function(n){return n.id===e.id?e:n}))),b("updated ".concat(n.name))})),setTimeout((function(){b(null)}),3e3)}}else{var c={name:O,number:x};j.create(c).then((function(e){a(t.concat(e.data)),p(""),w(""),b("added ".concat(e.data.name))})).catch((function(e){b(e.message)})),setTimeout((function(){b(null)}),3e3)}},data:A}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(h,{persons:t,filter:N,setPersons:a})]})};c.a.render(Object(u.jsx)(m,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.8f957c56.chunk.js.map