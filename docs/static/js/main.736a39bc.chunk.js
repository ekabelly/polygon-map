(this["webpackJsonppolygon-map"]=this["webpackJsonppolygon-map"]||[]).push([[0],{14:function(t,e,n){},35:function(t,e,n){},4:function(t){t.exports=JSON.parse('{"coordinates":"coordinates","onClick":"onClick","location":"location"}')},58:function(t,e,n){"use strict";n.r(e);var i=n(1),o=n.n(i),a=n(23),c=n.n(a),s=(n(14),n(2)),r=(n(35),n(4)),l=n(0);function u(t){var e=t.setFormType,n=Object(i.useState)(r.coordinates),o=Object(s.a)(n,2),a=o[0],c=o[1];return Object(l.jsx)("div",{className:"flex-column",children:Object.keys(r).map((function(t){return Object(l.jsxs)("label",{htmlFor:t,className:"pointer",children:[Object(l.jsx)("input",{id:t,checked:a===t,type:"radio",name:"markers-form-type",onClick:function(){return function(t){c(t),e(t)}(t)}}),t]})}))})}var p=n(5),d=n.n(p),h=n(6),j=n(24),b=n(25),m=n.n(b),f="http://dev.virtualearth.net/REST/v1/Locations",v=function(){var t=Object(h.a)(d.a.mark((function t(e){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.get("".concat(f,"?q=").concat(e,"&o=json&key=").concat("AqlNTWT4NPxuoXiHQmYK7gSIPJOMH6rS6hAuAdcp4m6NY9-bBzdUYsj7SvUzwtuX"));case 3:return t.abrupt("return",t.sent.data.resourceSets[0].resources.map((function(t){var e=Object(s.a)(t.point.coordinates,2),n=e[0],i=e[1];return{name:t.name,lng:i,lat:n}})));case 6:t.prev=6,t.t0=t.catch(0),console.error(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}();function y(t){var e=t.emitCoordinates,n=Object(i.useState)(),o=Object(s.a)(n,2),a=o[0],c=o[1],r=Object(i.useState)([]),u=Object(s.a)(r,2),p=u[0],b=u[1],m=Object(i.useCallback)(Object(j.debounce)((function(t){return f.apply(this,arguments)}),300),[]);function f(){return(f=Object(h.a)(d.a.mark((function t(e){var n;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v(e);case 2:n=t.sent,b(n||[]);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(l.jsxs)("div",{children:[Object(l.jsx)("input",{type:"text",value:a,onInput:function(t){return e=t.target.value,c(e),void m(e);var e}}),p.map((function(t){return Object(l.jsx)("div",{className:"pointer",onClick:function(){return function(t){c(t.name),e({lat:t.lat,lng:t.lng}),b([])}(t)},children:t.name})}))]})}var O,g=function(t){var e=Object(i.useState)(""),n=Object(s.a)(e,2),o=n[0],a=n[1],c=Object(i.useState)(""),p=Object(s.a)(c,2),d=p[0],h=p[1],j=Object(i.useState)(r.coordinates),b=Object(s.a)(j,2),m=b[0],f=b[1];function v(e){t.emitCoordinates(e),a(""),h("")}return Object(i.useEffect)((function(){if(t.clickLocation){var e=t.clickLocation;h(e.lng),a(e.lat),m===r.onClick&&v(e)}}),[t.clickLocation]),Object(l.jsxs)("div",{className:"coordinates",children:[Object(l.jsx)("h4",{children:"Markers Form"}),Object(l.jsx)(u,{setFormType:f}),m===r.coordinates?Object(l.jsxs)("div",{className:"flex-column",children:["lat: ",Object(l.jsx)("input",{value:o,onInput:function(t){return a(t.target.value)},type:"number"}),"lng: ",Object(l.jsx)("input",{value:d,onInput:function(t){return h(t.target.value)},type:"number"})]}):m===r.onClick?"":m===r.location?Object(l.jsx)(y,{emitCoordinates:v}):void 0,m===r.coordinates?Object(l.jsx)("button",{onClick:function(){return v({lat:o,lng:d})},children:"submit"}):""]})},k=n(29),x=n(13),w=n(26),L=n(27),C=n(30),P=n(28);function M(t){var e="bingAPIReady",n="https://www.bing.com/api/maps/mapcontrol?callback=".concat(e);return t&&(n+="&key=".concat(t)),new Promise((function(t,e){var i=document.createElement("script");i.type="text/javascript",i.async=!0,i.defer=!0,i.src=n,window.bingAPIReady=function(){O=window.Microsoft,t()},i.onerror=function(t){e(t)},document.body.appendChild(i)}))}var S=n(8),N=function(t){Object(C.a)(n,t);var e=Object(P.a)(n);function n(){var t;Object(w.a)(this,n);for(var i=arguments.length,a=new Array(i),c=0;c<i;c++)a[c]=arguments[c];return(t=e.call.apply(e,[this].concat(a))).mapElRef=o.a.createRef(),t.pins=[],t.polyLines=[],t}return Object(L.a)(n,[{key:"componentDidMount",value:function(){this.initMap()}},{key:"initMap",value:function(){var t=Object(h.a)(d.a.mark((function t(){var e=this;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,M("AqlNTWT4NPxuoXiHQmYK7gSIPJOMH6rS6hAuAdcp4m6NY9-bBzdUYsj7SvUzwtuX");case 2:this.map=new O.Maps.Map(this.mapElRef.current),O.Maps.Events.addHandler(this.map,"click",(function(t){return e.props.onMapClick({lat:t.location.latitude,lng:t.location.longitude})}));case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(t,e,n){var i=this.props.coordinates,o=t.coordinates;(!o&&i||i&&i.lat!==o.lat&&i.lng!==o.lng)&&this.setMapCoordinates()}},{key:"setMapCoordinates",value:function(){var t,e=this.props.coordinates,n=e.lat,i=e.lng,o=Object(x.a)(Object(x.a)({},this.map.getCenter()),{},{latitude:n,longitude:i});this.pins.length<3?(t=new O.Maps.Pushpin(o,{color:S.red}),this.pins.push(t)):(t=this.pins.shift(),this.map.entities.remove(t),t.setLocation(o),this.pins.push(t)),this.map.entities.push(t),this.drawPolyLines(this.pins.length-2)}},{key:"drawPolyLines",value:function(t){this.handlePolyLinesLogic(),t>=0&&(this.drawPolyLine(this.pins[t],this.pins[t+1]),1===t&&(this.drawPolyLine(this.pins[2],this.pins[0]),this.drawPolyGon()))}},{key:"handlePolyLinesLogic",value:function(){3===this.polyLines.length&&(this.map.entities.remove(this.polyLines[0]),this.map.entities.remove(this.polyLines[2]),this.polyLines=[this.polyLines[1]])}},{key:"drawPolyLine",value:function(t,e){var n=new O.Maps.Polyline([this.pinToLocation(t),this.pinToLocation(e)],{strokeColor:S.strokeRed,strokeThickness:3});this.polyLines.push(n),this.map.entities.push(n)}},{key:"drawPolyGon",value:function(){var t=this.createPolyGon([].concat(Object(k.a)(this.pins.map(this.pinToLocation)),[this.pinToLocation(this.pins[0])]));this.map.entities.push(t)}},{key:"createPolyGon",value:function(t){return this.polygon&&this.map.entities.remove(this.polygon),this.polygon=new O.Maps.Polygon(t,{fillColor:S.polygonFillRed,strokeColor:S.strokeRed,strokeThickness:3}),this.polygon}},{key:"pinToLocation",value:function(t){return new O.Maps.Location(t.geometry.y,t.geometry.x)}},{key:"render",value:function(){return Object(l.jsx)("div",{ref:this.mapElRef,className:"map pointer"})}}]),n}(o.a.Component);var T=function(){var t=Object(i.useState)(),e=Object(s.a)(t,2),n=e[0],o=e[1],a=Object(i.useState)(),c=Object(s.a)(a,2),r=c[0],u=c[1];return Object(l.jsxs)("div",{className:"map-layout",children:[Object(l.jsxs)("header",{children:[Object(l.jsx)("h1",{children:"Polygon Map!"}),Object(l.jsx)("div",{className:"clicked-on",children:r?Object(l.jsxs)("div",{className:"flex space-between",children:["you clicked on:",Object(l.jsxs)("div",{children:["lng: ",r.lng]}),Object(l.jsxs)("div",{children:["lat: ",r.lat]})]}):""})]}),Object(l.jsxs)("div",{className:"content flex",children:[Object(l.jsx)(g,{emitCoordinates:o,clickLocation:r}),Object(l.jsx)(N,{onMapClick:u,coordinates:n})]})]})};var R=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)(T,{})})},A=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,59)).then((function(e){var n=e.getCLS,i=e.getFID,o=e.getFCP,a=e.getLCP,c=e.getTTFB;n(t),i(t),o(t),a(t),c(t)}))};c.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(R,{})}),document.getElementById("root")),A()},8:function(t){t.exports=JSON.parse('{"strokeRed":"rgb(165, 0, 0)","polygonFillRed":"rgb(159, 0, 0,.3)","red":"red"}')}},[[58,1,2]]]);
//# sourceMappingURL=main.736a39bc.chunk.js.map