import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DBy5LfQW.js";import{g as v,b as T}from"./phrases.CEwe8JK5.js";import{d as S,g as A,s as I}from"./localStorage.Bw5aaVfW.js";const O=["¡POW!","¡WHACK!","¡BAM!","¡SLAP!","¡OUCH!","¡THWACK!"];let s=null;function R(){if(!(typeof window>"u"))try{s||(s=new(window.AudioContext||window.webkitAudioContext));const t=s.createOscillator(),n=s.createGain();t.connect(n),n.connect(s.destination);const i=[{freq:200,type:"square",decay:.1},{freq:150,type:"sawtooth",decay:.15},{freq:300,type:"square",decay:.08},{freq:100,type:"triangle",decay:.2}],r=i[Math.floor(Math.random()*i.length)];t.type=r.type,t.frequency.setValueAtTime(r.freq,s.currentTime),t.frequency.exponentialRampToValueAtTime(50,s.currentTime+r.decay),n.gain.setValueAtTime(.3,s.currentTime),n.gain.exponentialRampToValueAtTime(.01,s.currentTime+r.decay),t.start(s.currentTime),t.stop(s.currentTime+r.decay)}catch{}}function P({lang:t="es"}){const[n,i]=o.useState(S),[r,d]=o.useState(0),[u,f]=o.useState(""),[c,p]=o.useState(null),[h,l]=o.useState("normal"),m=o.useRef(0);o.useEffect(()=>{const a=A("boss-hits-record",S);i(a)},[]);const g=o.useCallback(a=>{R(),m.current+=1;const x=m.current;d(x),i(C=>{const b={totalHits:C.totalHits+1,lastPlayed:new Date().toISOString()};return I("boss-hits-record",b),b}),f(v(T));const y=a.currentTarget.getBoundingClientRect(),E=a.clientX-y.left,N=a.clientY-y.top;p({x:E,y:N,sound:v(O),id:Date.now()}),l("hit"),setTimeout(()=>l(x%10===0?"angry":"normal"),300),setTimeout(()=>p(null),800)},[]),j=()=>{switch(h){case"hit":return"😵";case"angry":return"🤬";default:return"👔"}};return e.jsxs("div",{className:"tool-container",children:[e.jsxs("div",{className:"game-area",children:[e.jsxs("div",{className:"game-header",children:[e.jsxs("div",{className:"stat",children:[e.jsx("span",{className:"stat-label",children:t==="es"?"GOLPES ESTA SESIÓN":"COLPI QUESTA SESSIONE"}),e.jsx("span",{className:"stat-value",children:r})]}),e.jsxs("div",{className:"stat",children:[e.jsx("span",{className:"stat-label",children:t==="es"?"RÉCORD TOTAL":"RECORD TOTALE"}),e.jsx("span",{className:"stat-value",children:n.totalHits})]})]}),e.jsxs("div",{className:"boss-container",onClick:g,role:"button",tabIndex:0,onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&g(a)},children:[e.jsxs("div",{className:"boss","data-state":h,children:[e.jsx("span",{className:"boss-emoji",children:j()}),e.jsx("span",{className:"boss-title",children:t==="es"?"EL JEFE":"IL BOSS"})]}),c&&e.jsx("div",{className:"hit-effect",style:{left:c.x,top:c.y},children:c.sound})]}),u&&e.jsxs("div",{className:"phrase-display",children:[e.jsxs("span",{className:"phrase-tag",children:["#",r,":"]}),u]}),e.jsxs("div",{className:"game-instructions",children:[e.jsx("p",{children:t==="es"?"👆 HAZ CLIC EN EL JEFE PARA GOLPEARLO":"👆 CLICCA SUL BOSS PER COLPIRLO"}),e.jsx("p",{children:t==="es"?"Cada click es un golpe. Cada golpe es terapéutico.":"Ogni clic è un colpo. Ogni colpo è terapeutico."})]}),e.jsx("div",{className:"game-footer",children:e.jsx("button",{className:"btn btn-small",onClick:()=>{m.current=0,d(0),f(""),l("normal")},children:t==="es"?"REINICIAR SESIÓN":"REINIZIA SESSIONE"})})]}),e.jsx("style",{children:`
        .game-area {
          text-align: center;
          padding: 2rem;
          background: var(--color-card-bg);
          border: 2px solid var(--color-card-border);
        }

        .game-header {
          display: flex;
          justify-content: space-around;
          margin-bottom: 2rem;
        }

        .game-header .stat { text-align: center; }

        .game-header .stat-label {
          display: block;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-bottom: 0.25rem;
        }

        .game-header .stat-value {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--color-secondary);
        }

        .boss-container {
          position: relative;
          cursor: pointer;
          user-select: none;
          padding: 2rem;
          margin: 1rem auto;
          max-width: 300px;
          transition: transform 0.1s;
        }

        .boss-container:hover { transform: scale(1.05); }
        .boss-container:active { transform: scale(0.95); }

        .boss {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .boss-emoji {
          font-size: 6rem;
          transition: all 0.2s;
        }

        .boss[data-state="hit"] .boss-emoji {
          animation: shake 0.3s ease-in-out;
        }

        .boss[data-state="angry"] .boss-emoji {
          animation: vibrate 0.1s ease-in-out infinite;
        }

        .boss-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--color-primary);
        }

        .hit-effect {
          position: absolute;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--color-accent);
          pointer-events: none;
          animation: hitFloat 0.8s ease-out forwards;
          text-shadow: 2px 2px 0 var(--color-bg);
        }

        .phrase-display {
          margin-top: 1.5rem;
          padding: 1rem;
          background: var(--color-bg-secondary);
          border-left: 4px solid var(--color-accent);
          font-style: italic;
          text-align: left;
        }

        .phrase-tag {
          color: var(--color-secondary);
          font-weight: bold;
          font-style: normal;
          margin-right: 0.5rem;
        }

        .game-instructions {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .game-instructions p { margin: 0.5rem 0; }
        .game-footer { margin-top: 1.5rem; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes vibrate {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px) rotate(-5deg); }
          75% { transform: translateX(3px) rotate(5deg); }
        }

        @keyframes hitFloat {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-50px) scale(1.5); }
        }
      `})]})}export{P as default};
