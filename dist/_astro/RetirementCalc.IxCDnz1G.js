import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DBy5LfQW.js";import{g as i,r as o}from"./phrases.C-KTw5XO.js";import{c as x}from"./dates.fCqHGFMi.js";import{c as j,g as y,s as N}from"./localStorage.Bw5aaVfW.js";import{c as A}from"./confetti.module.oQXWb4Lk.js";function D(){const[s,l]=t.useState(j),[b,c]=t.useState(!0),[r,u]=t.useState(null),[f,a]=t.useState(""),[w,g]=t.useState(!1),d=t.useRef(!1);t.useEffect(()=>{const n=y("retirement-config",j);if(l(n),n.isConfigured){const m=x(n.currentAge,n.retirementAge,n.yearsContributed);u(m),h(m),c(!1)}else c(!0)},[]);const h=n=>{n.isRetired?a(i(o.today)):n.yearsRemaining>=30?a(i(o.decades)):n.yearsRemaining>=10?a(i(o.years)):n.yearsRemaining>=1||n.monthsRemaining>=1?a(i(o.months)):a(i(o.days))};t.useEffect(()=>{if(r?.isRetired&&!d.current){d.current=!0,g(!0);const n=5*1e3,m=Date.now()+n,p=()=>{A({particleCount:7,angle:60,spread:55,origin:{x:0},colors:["#ff6b35","#f7c948","#e84393","#00b894"]}),A({particleCount:7,angle:120,spread:55,origin:{x:1},colors:["#ff6b35","#f7c948","#e84393","#00b894"]}),Date.now()<m&&requestAnimationFrame(p)};p()}},[r]);const C=()=>{const n=x(s.currentAge,s.retirementAge,s.yearsContributed);u(n),h(n),N("retirement-config",{...s,isConfigured:!0}),c(!1)};return e.jsxs("div",{className:"tool-container",children:[b?e.jsxs("div",{className:"card",children:[e.jsx("h2",{style:{marginBottom:"1rem"},children:"CALCULADORA DE JUBILACIÓN"}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"EDAD DE JUBILACIÓN EN TU PAÍS"}),e.jsx("input",{type:"number",min:"50",max:"80",value:s.retirementAge,onChange:n=>l({...s,retirementAge:parseInt(n.target.value)||67})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"EDAD ACTUAL"}),e.jsx("input",{type:"number",min:"16",max:"100",value:s.currentAge,onChange:n=>l({...s,currentAge:parseInt(n.target.value)||30})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"AÑOS COTIZADOS"}),e.jsx("input",{type:"number",min:"0",max:"50",value:s.yearsContributed,onChange:n=>l({...s,yearsContributed:parseInt(n.target.value)||0})})]}),e.jsx("button",{className:"btn",onClick:C,children:"CALCULAR MI LIBERTAD"})]}):e.jsxs("div",{className:"result",children:[r?.isRetired?e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:"¡¡¡HOY TE JUBILAS!!!"}),e.jsx("div",{className:"big-number celebration",children:"🎉🎉🎉"})]}):e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:"TE FALTAN PARA LA JUBILACIÓN"}),e.jsxs("div",{className:"retirement-countdown",children:[e.jsxs("div",{className:"countdown-item",children:[e.jsx("span",{className:"countdown-number",children:r?.yearsRemaining??0}),e.jsx("span",{className:"countdown-label",children:"AÑOS"})]}),e.jsxs("div",{className:"countdown-item",children:[e.jsx("span",{className:"countdown-number",children:r?.monthsRemaining??0}),e.jsx("span",{className:"countdown-label",children:"MESES"})]}),e.jsxs("div",{className:"countdown-item",children:[e.jsx("span",{className:"countdown-number",children:r?.daysRemaining??0}),e.jsx("span",{className:"countdown-label",children:"DÍAS"})]})]})]}),f&&e.jsx("p",{className:"phrase",children:f}),e.jsx("button",{className:"btn btn-small",onClick:()=>{c(!0),g(!1),d.current=!1},style:{marginTop:"1.5rem"},children:"RECALCULAR"})]}),e.jsx("style",{children:`
        .retirement-countdown {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .countdown-item {
          text-align: center;
        }

        .countdown-number {
          display: block;
          font-family: var(--font-heading);
          font-size: 4rem;
          color: var(--color-secondary);
          text-shadow: 3px 3px 0 var(--color-primary);
          line-height: 1;
        }

        .countdown-label {
          display: block;
          font-size: 1rem;
          color: var(--color-text-muted);
          margin-top: 0.5rem;
          text-transform: uppercase;
        }

        .celebration {
          font-size: 4rem;
          animation: pulse 0.5s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `})]})}export{D as default};
