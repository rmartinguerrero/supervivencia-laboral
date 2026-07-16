import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DBy5LfQW.js";import{a as k}from"./phrases.CEwe8JK5.js";function U({lang:s="es"}){const[d,A]=r.useState([]),[E,u]=r.useState(!0),[f,p]=r.useState(!1),[i,n]=r.useState(1),[l,I]=r.useState(1),[O,C]=r.useState(0),[h,c]=r.useState(""),[R,g]=r.useState(!1),[x,b]=r.useState(""),[m,j]=r.useState(""),[S,v]=r.useState(""),N=s==="es"?k:[{id:"reduccion-horas",label:"Riduzione delle ore"},{id:"salir-hora",label:"Uscire al mio orario"},{id:"mas-salario",label:"Più stipendio"},{id:"menos-reuniones",label:"Meno riunioni"},{id:"no-fuera-horario",label:"Non lavorare fuori orario"},{id:"vacaciones",label:"Vacanze"},{id:"otro",label:"Altro"}],y=async a=>{u(!0);try{const o=await(await fetch(`/api/firmas?lang=${s}&page=${a}&limit=20`)).json();A(o.firmas),I(o.totalPages),C(o.total)}catch(t){console.error("Error fetching firmas:",t)}finally{u(!1)}};r.useEffect(()=>{y(i)},[i,s]);const T=async a=>{a.preventDefault(),c(""),g(!1),p(!0);try{const t=await fetch("/api/firmas",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({alias:x,message:m,category:S,lang:s})}),o=await t.json();if(!t.ok){c(o.error);return}g(!0),b(""),j(""),v(""),y(1),n(1)}catch{c("Error al enviar la firma. Inténtalo de nuevo.")}finally{p(!1)}},L=a=>N.find(o=>o.id===a)?.label||a,M=a=>new Date(a).toLocaleDateString(s==="es"?"es-ES":"it-IT",{day:"numeric",month:"short",year:"numeric"});return e.jsxs("div",{className:"signature-book",children:[e.jsxs("div",{className:"form-section card",children:[e.jsx("h2",{children:s==="es"?"FIRMA AHORA":"FIRMA ADESSO"}),h&&e.jsx("div",{className:"error-message",children:h}),R&&e.jsx("div",{className:"success-message",children:s==="es"?"¡Tu firma ha sido registrada! Gracias por luchar.":"La tua firma è stata registrata! Grazie per la lotta."}),e.jsxs("form",{onSubmit:T,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:s==="es"?"TU NOMBRE O ALIAS":"IL TUO NOME O ALIAS"}),e.jsx("input",{type:"text",value:x,onChange:a=>b(a.target.value),maxLength:50,required:!0,placeholder:s==="es"?"Trabajador Anónimo":"Lavoratore Anonimo"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:s==="es"?"TU MENSAJE / CAUSA":"IL TUO MESSAGGIO / CAUSA"}),e.jsx("textarea",{value:m,onChange:a=>j(a.target.value),maxLength:500,required:!0,rows:3,placeholder:s==="es"?"Firmo por...":"Firmo per..."}),e.jsxs("small",{children:[m.length,"/500"]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:s==="es"?"CATEGORÍA":"CATEGORIA"}),e.jsxs("select",{value:S,onChange:a=>v(a.target.value),required:!0,children:[e.jsx("option",{value:"",children:s==="es"?"Selecciona...":"Seleziona..."}),N.map(a=>e.jsx("option",{value:a.id,children:a.label},a.id))]})]}),e.jsx("button",{type:"submit",className:"btn",disabled:f,children:f?s==="es"?"ENVIANDO...":"INVIO IN CORSO...":s==="es"?"✍️ FIRMAR":"✍️ FIRMA"})]})]}),e.jsxs("div",{className:"list-section",children:[e.jsxs("h2",{children:[s==="es"?"LIBRO DE FIRMAS":"LIBRO DELLE FIRME",e.jsxs("span",{className:"total-count",children:[" (",O," ",s==="es"?"firmas":"firme",")"]})]}),E?e.jsx("p",{className:"loading",children:s==="es"?"Cargando firmas...":"Caricamento firme..."}):d.length===0?e.jsx("p",{className:"empty",children:s==="es"?"Aún no hay firmas. ¡Sé el primero!":"Non ci sono ancora firme. Sii il primo!"}):e.jsx("div",{className:"firmas-list",children:d.map(a=>e.jsxs("div",{className:"firma-card card",children:[e.jsxs("div",{className:"firma-header",children:[e.jsx("span",{className:"firma-alias",children:a.alias}),e.jsx("span",{className:"firma-category",children:L(a.category)})]}),e.jsxs("p",{className:"firma-message",children:['"',a.message,'"']}),e.jsx("span",{className:"firma-date",children:M(a.timestamp)})]},a.id))}),l>1&&e.jsxs("div",{className:"pagination",children:[e.jsxs("button",{className:"btn btn-small",onClick:()=>n(a=>Math.max(1,a-1)),disabled:i===1,children:["← ",s==="es"?"ANTERIOR":"PRECEDENTE"]}),e.jsxs("span",{className:"page-info",children:[i," / ",l]}),e.jsxs("button",{className:"btn btn-small",onClick:()=>n(a=>Math.min(l,a+1)),disabled:i===l,children:[s==="es"?"SIGUIENTE":"SUCCESSIVO"," →"]})]})]}),e.jsx("style",{children:`
        .signature-book {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .signature-book {
            grid-template-columns: 1fr;
          }
        }

        .form-section h2,
        .list-section h2 {
          margin-bottom: 1.5rem;
        }

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

        .firma-card {
          padding: 1rem;
        }

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

        .page-info {
          color: var(--color-text-muted);
        }
      `})]})}export{U as default};
