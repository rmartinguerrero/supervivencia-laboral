import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DBy5LfQW.js";import{g as h,b as N}from"./phrases.CO-OOo_l.js";import{d as x,g as T,s as w}from"./localStorage.Bw5aaVfW.js";const C=["POW!","WHACK!","BAM!","SLAP!","OUCH!","THWACK!"];function E(){if(!(typeof window>"u"))try{const t=new(window.AudioContext||window.webkitAudioContext),a=t.createOscillator(),s=t.createGain();a.connect(s),s.connect(t.destination);const i=[{freq:200,type:"square",decay:.1},{freq:150,type:"sawtooth",decay:.15},{freq:300,type:"square",decay:.08},{freq:100,type:"triangle",decay:.2}],o=i[Math.floor(Math.random()*i.length)];a.type=o.type,a.frequency.setValueAtTime(o.freq,t.currentTime),a.frequency.exponentialRampToValueAtTime(50,t.currentTime+o.decay),s.gain.setValueAtTime(.3,t.currentTime),s.gain.exponentialRampToValueAtTime(.01,t.currentTime+o.decay),a.start(t.currentTime),a.stop(t.currentTime+o.decay)}catch{}}function A(){const[t,a]=n.useState(x),[s,i]=n.useState(0),[o,m]=n.useState(""),[c,d]=n.useState(null),[f,l]=n.useState("normal");n.useEffect(()=>{const r=T("boss-hits-record",x);a(r)},[]);const u=n.useCallback(r=>{E(),i(S=>S+1);const b=s+1,p={totalHits:t.totalHits+1,lastPlayed:new Date().toISOString()};a(p),w("boss-hits-record",p),m(h(N));const g=r.currentTarget.getBoundingClientRect(),v=r.clientX-g.left,j=r.clientY-g.top;d({x:v,y:j,sound:h(C),id:Date.now()}),l("hit"),setTimeout(()=>l(b%10===0?"angry":"normal"),300),setTimeout(()=>d(null),800)},[s,t.totalHits]),y=()=>{switch(f){case"hit":return"😵";case"angry":return"🤬";default:return"👔"}};return e.jsxs("div",{className:"tool-container",children:[e.jsxs("div",{className:"game-area",children:[e.jsxs("div",{className:"game-header",children:[e.jsxs("div",{className:"stat",children:[e.jsx("span",{className:"stat-label",children:"COLPI QUESTA SESSIONE"}),e.jsx("span",{className:"stat-value",children:s})]}),e.jsxs("div",{className:"stat",children:[e.jsx("span",{className:"stat-label",children:"RECORD TOTALE"}),e.jsx("span",{className:"stat-value",children:t.totalHits})]})]}),e.jsxs("div",{className:"boss-container",onClick:u,role:"button",tabIndex:0,onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&u(r)},children:[e.jsxs("div",{className:"boss","data-state":f,children:[e.jsx("span",{className:"boss-emoji",children:y()}),e.jsx("span",{className:"boss-title",children:"IL BOSS"})]}),c&&e.jsx("div",{className:"hit-effect",style:{left:c.x,top:c.y},children:c.sound})]}),o&&e.jsxs("div",{className:"phrase-display",children:[e.jsxs("span",{className:"phrase-tag",children:["#",s,":"]}),o]}),e.jsxs("div",{className:"game-instructions",children:[e.jsx("p",{children:"👆 CLICCA SUL BOSS PER COLPIRLO"}),e.jsx("p",{children:"Ogni clic è un colpo. Ogni colpo è terapeutico."})]}),e.jsx("div",{className:"game-footer",children:e.jsx("button",{className:"btn btn-small",onClick:()=>{i(0),m(""),l("normal")},children:"REINIZIA SESSIONE"})})]}),e.jsx("style",{children:`
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
      `})]})}export{A as default};
