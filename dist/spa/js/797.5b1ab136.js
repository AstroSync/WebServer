"use strict";(self["webpackChunkastrosync"]=self["webpackChunkastrosync"]||[]).push([[797],{1797:(t,e,a)=>{a.r(e),a.d(e,{default:()=>x});var n=a(9835),r=a(499);a(702);const l=Math.acos,o=Math.asin,s=Math.atan2,c=Math.cos,u=Math.hypot,i=Math.max,p=Math.min,m=Math.PI,h=Math.sin,d=m/180,g=180/m;class v{static fromCartesian([t,e,a]){return[0,a,-e,t]}static fromAngles([t,e,a]){t*=d/2,e*=d/2,a=(a||0)*d/2;const n=h(t),r=c(t),l=h(e),o=c(e),s=h(a),u=c(a);return[r*o*u+n*l*s,n*o*u-r*l*s,r*l*u+n*o*s,r*o*s-n*l*u]}static toAngles([t,e,a,n]){return[s(2*(t*e+a*n),1-2*(e*e+a*a))*g,o(i(-1,p(1,2*(t*a-n*e))))*g,s(2*(t*n+e*a),1-2*(a*a+n*n))*g]}static interpolateAngles(t,e){const a=v.interpolate(v.fromAngles(t),v.fromAngles(e));return t=>v.toAngles(a(t))}static interpolateLinear([t,e,a,n],[r,l,o,s]){r-=t,l-=e,o-=a,s-=n;const c=new Array(4);return i=>{const p=u(c[0]=t+r*i,c[1]=e+l*i,c[2]=a+o*i,c[3]=n+s*i);return c[0]/=p,c[1]/=p,c[2]/=p,c[3]/=p,c}}static interpolate([t,e,a,n],[r,o,s,m]){let d=v.dot([t,e,a,n],[r,o,s,m]);if(d<0&&(r=-r,o=-o,s=-s,m=-m,d=-d),d>.9995)return v.interpolateLinear([t,e,a,n],[r,o,s,m]);const g=l(i(-1,p(1,d))),f=new Array(4),A=u(r-=t*d,o-=e*d,s-=a*d,m-=n*d);return r/=A,o/=A,s/=A,m/=A,l=>{const u=g*l,i=h(u),p=c(u);return f[0]=t*p+r*i,f[1]=e*p+o*i,f[2]=a*p+s*i,f[3]=n*p+m*i,f}}static dot([t,e,a,n],[r,l,o,s]){return t*r+e*l+a*o+n*s}static multiply([t,e,a,n],[r,l,o,s]){return[t*r-e*l-a*o-n*s,t*l+e*r+a*s-n*o,t*o-e*s+a*r+n*l,t*s+e*o-a*l+n*r]}}const f=v.fromAngles;f.multiply=v.multiply,f.rotation=v.toAngles,f.interpolate=v.interpolateAngles,f.cartesian=function(t){const e=t[0]*d,a=t[1]*d,n=c(a);return[n*c(e),n*h(e),h(a)]},f.delta=function(t,e,a){2==arguments.length&&(a=1);const n=Math.sqrt;function r(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}function o(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}const s=r(t,e),u=n(o(s,s));if(!u)return[1,0,0,0];const m=a*l(i(-1,p(1,o(t,e))))/2,d=h(m);return[c(m),s[2]/u*d,-s[1]/u*d,s[0]/u*d]};var A=a(7024);const y=t=>((0,n.dD)("data-v-30469a0d"),t=t(),(0,n.Cn)(),t),M={class:"q-pa-md"},w={class:"chart",style:{width:"700px",height:"900px"}},q=y((()=>(0,n._)("g",{class:"graticule"},[(0,n._)("path")],-1))),j=y((()=>(0,n._)("g",{class:"map"},null,-1))),C=[q,j],L={name:"D3Chart",setup(t){const e=(0,r.iH)(null);let a=(0,r.iH)(["AzimuthalEqualArea","AzimuthalEquidistant","Gnomonic","Orthographic","Stereographic","Albers","ConicConformal","ConicEqualArea","ConicEquidistant","Equirectangular","Mercator","TransverseMercator"]);function l(t){console.log(t),o.value.type=t,p()}let o=(0,r.iH)({type:"AzimuthalEqualArea",scale:100,translateX:350,translateY:250,centerLon:0,centerLat:0,rotateLambda:.1,rotatePhi:0,rotateGamma:0});const s=(0,r.iH)(null);let c=(0,r.iH)(null),u=A.geoPath().projection(c.value),i=A.geoGraticule();function p(){c.value=A["geo"+o.value.type]().precision(.1),u.projection(c.value),c.value.scale(o.value.scale).translate([o.value.translateX,o.value.translateY]).center([o.value.centerLon,o.value.centerLat]).rotate([o.value.rotateLambda,o.value.rotatePhi,o.value.rotateGamma]);A.select("g.map").selectAll("path").data(s.value.features).join("path").attr("d",u);A.select(".graticule path").datum(i()).attr("d",u)}return(0,n.bv)((()=>{A.json("https://undefined/json/ne_110m_land.json").then((function(t){s.value=t,console.log(s.value),p()}))})),(t,o)=>{const s=(0,n.up)("q-select");return(0,n.wg)(),(0,n.iD)("div",M,[(0,n.Wm)(s,{outlined:"",modelValue:e.value,"onUpdate:modelValue":[o[0]||(o[0]=t=>e.value=t),o[1]||(o[1]=t=>l(t))],options:(0,r.SU)(a),label:"Projection"},null,8,["modelValue","options"]),((0,n.wg)(),(0,n.iD)("svg",w,C))])}}};var _=a(1639),b=a(2259),P=a(9984),E=a.n(P);const H=(0,_.Z)(L,[["__scopeId","data-v-30469a0d"]]),k=H;E()(L,"components",{QSelect:b.Z});const D={name:"MapViewerPage",setup(t){return(t,e)=>{const a=(0,n.up)("q-page");return(0,n.wg)(),(0,n.j4)(a,{class:"fit row wrap justify-center items-start content-start q-pa-md"},{default:(0,n.w5)((()=>[(0,n.Wm)(k)])),_:1})}}};var G=a(9885);const V=D,x=V;E()(D,"components",{QPage:G.Z})}}]);