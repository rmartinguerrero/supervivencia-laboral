import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DBy5LfQW.js";import{g as m,l as u}from"./phrases.CEwe8JK5.js";import{b as p,g as S,s as b}from"./localStorage.Bw5aaVfW.js";function I(D){const[e,r]=l.useState(p),[A,d]=l.useState(!0),[t,x]=l.useState(null),[g,n]=l.useState("");l.useEffect(()=>{const s=S("life-salary-config",p);r(s)},[]);const y=()=>{const v=52-e.vacationDays/5,o=e.monthlySalary*12,i=v*5,c=i*e.weeklyHours,h=i*(e.dailyCommuteMinutes/60),j=o/c,f=o/i,N=o/(c+h);x({salaryPerHour:Math.round(j*100)/100,salaryPerDay:Math.round(f*100)/100,annualWorkHours:Math.round(c),annualCommuteHours:Math.round(h),lifeValuePerHour:Math.round(N*100)/100}),e.monthlySalary>=2e3?n(m(u.high)):e.monthlySalary>=1400?n(m(u.mid)):n(m(u.low)),d(!1),b("life-salary-config",e)};return a.jsxs("div",{className:"tool-container",children:[A?a.jsxs("div",{className:"card",children:[a.jsx("h2",{style:{marginBottom:"1rem"},children:"INTRODUCE TUS DATOS"}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"SALARIO MENSUAL (€)"}),a.jsx("input",{type:"number",min:"0",value:e.monthlySalary,onChange:s=>r({...e,monthlySalary:parseInt(s.target.value)||0})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"HORAS DE TRABAJO SEMANALES"}),a.jsx("input",{type:"number",min:"1",max:"80",value:e.weeklyHours,onChange:s=>r({...e,weeklyHours:parseInt(s.target.value)||40})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"DÍAS DE VACACIONES AL AÑO"}),a.jsx("input",{type:"number",min:"0",max:"60",value:e.vacationDays,onChange:s=>r({...e,vacationDays:parseInt(s.target.value)||22})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"TIEMPO DE DESPLAZAMIENTO DIARIO (minutos)"}),a.jsx("input",{type:"number",min:"0",max:"300",value:e.dailyCommuteMinutes,onChange:s=>r({...e,dailyCommuteMinutes:parseInt(s.target.value)||0})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"EDAD ACTUAL (opcional)"}),a.jsx("input",{type:"number",min:"16",max:"100",value:e.age||"",onChange:s=>r({...e,age:parseInt(s.target.value)||void 0})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"AÑOS TRABAJADOS (opcional)"}),a.jsx("input",{type:"number",min:"0",max:"50",value:e.yearsWorked||"",onChange:s=>r({...e,yearsWorked:parseInt(s.target.value)||void 0})})]}),a.jsx("button",{className:"btn",onClick:y,children:"CALCULAR MI DESGRACIA LABORAL"})]}):a.jsxs("div",{className:"result",children:[a.jsx("h2",{children:"TU VIDA LABORAL VALORADA"}),a.jsxs("div",{className:"stats-grid",children:[a.jsxs("div",{className:"stat-item",children:[a.jsx("span",{className:"stat-label",children:"SALARIO POR HORA"}),a.jsxs("span",{className:"stat-value",children:[t?.salaryPerHour,"€"]})]}),a.jsxs("div",{className:"stat-item",children:[a.jsx("span",{className:"stat-label",children:"SALARIO POR DÍA"}),a.jsxs("span",{className:"stat-value",children:[t?.salaryPerDay,"€"]})]}),a.jsxs("div",{className:"stat-item",children:[a.jsx("span",{className:"stat-label",children:"HORAS ANUALES DE TRABAJO"}),a.jsxs("span",{className:"stat-value",children:[t?.annualWorkHours,"h"]})]}),a.jsxs("div",{className:"stat-item",children:[a.jsx("span",{className:"stat-label",children:"HORAS ANUALES DE DESPLAZAMIENTO"}),a.jsxs("span",{className:"stat-value",children:[t?.annualCommuteHours,"h"]})]}),a.jsxs("div",{className:"stat-item highlight",children:[a.jsx("span",{className:"stat-label",children:"VALOR DE UNA HORA DE TU VIDA LABORAL"}),a.jsxs("span",{className:"stat-value big",children:[t?.lifeValuePerHour,"€"]})]})]}),a.jsx("p",{className:"phrase",children:g}),a.jsx("button",{className:"btn btn-small",onClick:()=>d(!0),style:{marginTop:"1.5rem"},children:"RECALCULAR"})]}),a.jsx("style",{children:`
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
      `})]})}export{I as default};
