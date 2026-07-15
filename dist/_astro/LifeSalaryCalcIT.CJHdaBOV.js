import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DBy5LfQW.js";import{g as m,l as u}from"./phrases.CO-OOo_l.js";import{b as y,g as j,s as O}from"./localStorage.Bw5aaVfW.js";function D(){const[e,r]=l.useState(y),[x,d]=l.useState(!0),[t,g]=l.useState(null),[p,n]=l.useState("");l.useEffect(()=>{const s=j("life-salary-config",y);r(s)},[]);const I=()=>{const A=52-e.vacationDays/5,o=e.monthlySalary*12,i=A*5,c=i*e.weeklyHours,h=i*(e.dailyCommuteMinutes/60),N=o/c,v=o/i,f=o/(c+h);g({salaryPerHour:Math.round(N*100)/100,salaryPerDay:Math.round(v*100)/100,annualWorkHours:Math.round(c),annualCommuteHours:Math.round(h),lifeValuePerHour:Math.round(f*100)/100}),e.monthlySalary>=2e3?n(m(u.high)):e.monthlySalary>=1400?n(m(u.mid)):n(m(u.low)),d(!1),O("life-salary-config",e)};return a.jsxs("div",{className:"tool-container",children:[x?a.jsxs("div",{className:"card",children:[a.jsx("h2",{style:{marginBottom:"1rem"},children:"INSERISCI I TUOI DATI"}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"STIPENDIO MENSILE (€)"}),a.jsx("input",{type:"number",min:"0",value:e.monthlySalary,onChange:s=>r({...e,monthlySalary:parseInt(s.target.value)||0})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"ORE DI LAVORO SETTIMANALI"}),a.jsx("input",{type:"number",min:"1",max:"80",value:e.weeklyHours,onChange:s=>r({...e,weeklyHours:parseInt(s.target.value)||40})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"GIORNI DI VACANZE ALL'ANNO"}),a.jsx("input",{type:"number",min:"0",max:"60",value:e.vacationDays,onChange:s=>r({...e,vacationDays:parseInt(s.target.value)||22})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"TEMPO DI SPOSTAMENTO GIORNALIERO (minuti)"}),a.jsx("input",{type:"number",min:"0",max:"300",value:e.dailyCommuteMinutes,onChange:s=>r({...e,dailyCommuteMinutes:parseInt(s.target.value)||0})})]}),a.jsx("button",{className:"btn",onClick:I,children:"CALCOLA LA MIA DISGRAZIA LAVORATIVA"})]}):a.jsxs("div",{className:"result",children:[a.jsx("h2",{children:"LA TUA VITA LAVORATIVA VALORIZZATA"}),a.jsxs("div",{className:"stats-grid",children:[a.jsxs("div",{className:"stat-item",children:[a.jsx("span",{className:"stat-label",children:"STIPENDIO ORARIO"}),a.jsxs("span",{className:"stat-value",children:[t?.salaryPerHour,"€"]})]}),a.jsxs("div",{className:"stat-item",children:[a.jsx("span",{className:"stat-label",children:"STIPENDIO GIORNALIERO"}),a.jsxs("span",{className:"stat-value",children:[t?.salaryPerDay,"€"]})]}),a.jsxs("div",{className:"stat-item",children:[a.jsx("span",{className:"stat-label",children:"ORE ANNUALI DI LAVORO"}),a.jsxs("span",{className:"stat-value",children:[t?.annualWorkHours,"h"]})]}),a.jsxs("div",{className:"stat-item",children:[a.jsx("span",{className:"stat-label",children:"ORE ANNUALI DI SPOSTAMENTO"}),a.jsxs("span",{className:"stat-value",children:[t?.annualCommuteHours,"h"]})]}),a.jsxs("div",{className:"stat-item highlight",children:[a.jsx("span",{className:"stat-label",children:"VALORE DI UN'ORA DELLA TUA VITA LAVORATIVA"}),a.jsxs("span",{className:"stat-value big",children:[t?.lifeValuePerHour,"€"]})]})]}),a.jsx("p",{className:"phrase",children:p}),a.jsx("button",{className:"btn btn-small",onClick:()=>d(!0),style:{marginTop:"1.5rem"},children:"RICALCOLA"})]}),a.jsx("style",{children:`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .stat-item {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-card-border);
          padding: 1rem;
          text-align: center;
        }
        .stat-item.highlight {
          border-color: var(--color-secondary);
          background: rgba(247, 201, 72, 0.1);
        }
        .stat-label {
          display: block;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--color-primary);
        }
        .stat-value.big {
          font-size: 2rem;
          color: var(--color-secondary);
        }
      `})]})}export{D as default};
