import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DBy5LfQW.js";import{g as b,b as C}from"./phrases.C4FJz88r.js";import{d as v,g as w,s as E}from"./localStorage.Bw5aaVfW.js";const H=["POW!","WHACK!","BAM!","SLAP!","OUCH!","THWACK!"];let t=null;function I(){if(!(typeof window>"u"))try{t||(t=new(window.AudioContext||window.webkitAudioContext));const s=t.createOscillator(),n=t.createGain();s.connect(n),n.connect(t.destination);const i=[{freq:200,type:"square",decay:.1},{freq:150,type:"sawtooth",decay:.15},{freq:300,type:"square",decay:.08},{freq:100,type:"triangle",decay:.2}],r=i[Math.floor(Math.random()*i.length)];s.type=r.type,s.frequency.setValueAtTime(r.freq,t.currentTime),s.frequency.exponentialRampToValueAtTime(50,t.currentTime+r.decay),n.gain.setValueAtTime(.3,t.currentTime),n.gain.exponentialRampToValueAtTime(.01,t.currentTime+r.decay),s.start(t.currentTime),s.stop(t.currentTime+r.decay)}catch{}}function q(){const[s,n]=o.useState(v),[i,r]=o.useState(0),[d,u]=o.useState(""),[c,f]=o.useState(null),[p,l]=o.useState("normal"),m=o.useRef(0);o.useEffect(()=>{const a=w("boss-hits-record",v);n(a)},[]);const g=o.useCallback(a=>{I(),m.current+=1;const h=m.current;r(h),n(T=>{const y={totalHits:T.totalHits+1,lastPlayed:new Date().toISOString()};return E("boss-hits-record",y),y}),u(b(C));const x=a.currentTarget.getBoundingClientRect(),S=a.clientX-x.left,N=a.clientY-x.top;f({x:S,y:N,sound:b(H),id:Date.now()}),l("hit"),setTimeout(()=>l(h%10===0?"angry":"normal"),300),setTimeout(()=>f(null),800)},[]),j=()=>{switch(p){case"hit":return"😵";case"angry":return"🤬";default:return"👔"}};return e.jsxs("div",{className:"tool-container",children:[e.jsxs("div",{className:"game-area",children:[e.jsxs("div",{className:"game-header",children:[e.jsxs("div",{className:"stat",children:[e.jsx("span",{className:"stat-label",children:"COLPI QUESTA SESSIONE"}),e.jsx("span",{className:"stat-value",children:i})]}),e.jsxs("div",{className:"stat",children:[e.jsx("span",{className:"stat-label",children:"RECORD TOTALE"}),e.jsx("span",{className:"stat-value",children:s.totalHits})]})]}),e.jsxs("div",{className:"boss-container",onClick:g,role:"button",tabIndex:0,onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&g(a)},children:[e.jsxs("div",{className:"boss","data-state":p,children:[e.jsx("span",{className:"boss-emoji",children:j()}),e.jsx("span",{className:"boss-title",children:"IL BOSS"})]}),c&&e.jsx("div",{className:"hit-effect",style:{left:c.x,top:c.y},children:c.sound})]}),d&&e.jsxs("div",{className:"phrase-display",children:[e.jsxs("span",{className:"phrase-tag",children:["#",i,":"]}),d]}),e.jsxs("div",{className:"game-instructions",children:[e.jsx("p",{children:"👆 CLICCA SUL BOSS PER COLPIRLO"}),e.jsx("p",{children:"Ogni clic è un colpo. Ogni colpo è terapeutico."})]}),e.jsx("div",{className:"game-footer",children:e.jsx("button",{className:"btn btn-small",onClick:()=>{m.current=0,r(0),u(""),l("normal")},children:"REINIZIA SESSIONE"})})]}),e.jsx("style",{children:`
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
      `})]})}export{q as default};
