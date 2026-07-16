import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DBy5LfQW.js";import{a as S}from"./phrases.C4FJz88r.js";function D(){const[m,N]=s.useState([]),[E,d]=s.useState(!0),[g,u]=s.useState(!1),[o,n]=s.useState(1),[i,C]=s.useState(1),[I,O]=s.useState(0),[p,l]=s.useState(""),[L,f]=s.useState(!1),[h,x]=s.useState(""),[c,j]=s.useState(""),[b,v]=s.useState(""),y=async a=>{d(!0);try{const t=await(await fetch(`/api/firmas?lang=it&page=${a}&limit=20`)).json();N(t.firmas),C(t.totalPages),O(t.total)}catch(r){console.error("Error fetching firmas:",r)}finally{d(!1)}};s.useEffect(()=>{y(o)},[o]);const A=async a=>{a.preventDefault(),l(""),f(!1),u(!0);try{const r=await fetch("/api/firmas",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({alias:h,message:c,category:b,lang:"it"})}),t=await r.json();if(!r.ok){l(t.error);return}f(!0),x(""),j(""),v(""),y(1),n(1)}catch{l("Errore nell'invio della firma. Riprova.")}finally{u(!1)}},k=a=>S.find(t=>t.id===a)?.label||a,w=a=>new Date(a).toLocaleDateString("it-IT",{day:"numeric",month:"short",year:"numeric"});return e.jsxs("div",{className:"signature-book",children:[e.jsxs("div",{className:"form-section card",children:[e.jsx("h2",{children:"FIRMA ADESSO"}),p&&e.jsx("div",{className:"error-message",children:p}),L&&e.jsx("div",{className:"success-message",children:"La tua firma è stata registrata! Grazie per la lotta."}),e.jsxs("form",{onSubmit:A,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"IL TUO NOME O ALIAS"}),e.jsx("input",{type:"text",value:h,onChange:a=>x(a.target.value),maxLength:50,required:!0,placeholder:"Lavoratore Anonimo"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"IL TUO MESSAGGIO / CAUSA"}),e.jsx("textarea",{value:c,onChange:a=>j(a.target.value),maxLength:500,required:!0,rows:3,placeholder:"Firmo per..."}),e.jsxs("small",{children:[c.length,"/500"]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"CATEGORIA"}),e.jsxs("select",{value:b,onChange:a=>v(a.target.value),required:!0,children:[e.jsx("option",{value:"",children:"Seleziona..."}),S.map(a=>e.jsx("option",{value:a.id,children:a.label},a.id))]})]}),e.jsx("button",{type:"submit",className:"btn",disabled:g,children:g?"INVIO IN CORSO...":"✍️ FIRMA"})]})]}),e.jsxs("div",{className:"list-section",children:[e.jsxs("h2",{children:["LIBRO DELLE FIRME",e.jsxs("span",{className:"total-count",children:[" (",I," firme)"]})]}),E?e.jsx("p",{className:"loading",children:"Caricamento firme..."}):m.length===0?e.jsx("p",{className:"empty",children:"Non ci sono ancora firme. Sii il primo!"}):e.jsx("div",{className:"firmas-list",children:m.map(a=>e.jsxs("div",{className:"firma-card card",children:[e.jsxs("div",{className:"firma-header",children:[e.jsx("span",{className:"firma-alias",children:a.alias}),e.jsx("span",{className:"firma-category",children:k(a.category)})]}),e.jsxs("p",{className:"firma-message",children:['"',a.message,'"']}),e.jsx("span",{className:"firma-date",children:w(a.timestamp)})]},a.id))}),i>1&&e.jsxs("div",{className:"pagination",children:[e.jsx("button",{className:"btn btn-small",onClick:()=>n(a=>Math.max(1,a-1)),disabled:o===1,children:"← PRECEDENTE"}),e.jsxs("span",{className:"page-info",children:[o," / ",i]}),e.jsx("button",{className:"btn btn-small",onClick:()=>n(a=>Math.min(i,a+1)),disabled:o===i,children:"SUCCESSIVO →"})]})]}),e.jsx("style",{children:`
        .signature-book {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .signature-book { grid-template-columns: 1fr; }
        }
        .form-section h2, .list-section h2 { margin-bottom: 1.5rem; }
        .total-count {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: normal;
        }
        .error-message {
          background: rgba(214, 48, 49, 0.2);
          border: 1px solid var(--color-error);
          padding: 0.75rem;
          margin-bottom: 1rem;
          color: var(--color-error);
        }
        .success-message {
          background: rgba(0, 184, 148, 0.2);
          border: 1px solid var(--color-success);
          padding: 0.75rem;
          margin-bottom: 1rem;
          color: var(--color-success);
        }
        .form-group small {
          display: block;
          text-align: right;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
        }
        .loading, .empty {
          text-align: center;
          color: var(--color-text-muted);
          padding: 2rem;
        }
        .firmas-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .firma-card { padding: 1rem; }
        .firma-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .firma-alias {
          font-weight: bold;
          color: var(--color-secondary);
        }
        .firma-category {
          font-size: 0.75rem;
          background: var(--color-primary);
          color: white;
          padding: 0.2rem 0.5rem;
        }
        .firma-message {
          font-style: italic;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }
        .firma-date {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .page-info { color: var(--color-text-muted); }
      `})]})}export{D as default};
