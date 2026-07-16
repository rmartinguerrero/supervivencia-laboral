import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DBy5LfQW.js";import{g as x,b as N}from"./phrases.CEwe8JK5.js";import{d as y,g as C,s as T}from"./localStorage.Bw5aaVfW.js";const A=["¡POW!","¡WHACK!","¡BAM!","¡SLAP!","¡OUCH!","¡THWACK!"];function I(){if(!(typeof window>"u"))try{const t=new(window.AudioContext||window.webkitAudioContext),s=t.createOscillator(),o=t.createGain();s.connect(o),o.connect(t.destination);const n=[{freq:200,type:"square",decay:.1},{freq:150,type:"sawtooth",decay:.15},{freq:300,type:"square",decay:.08},{freq:100,type:"triangle",decay:.2}],r=n[Math.floor(Math.random()*n.length)];s.type=r.type,s.frequency.setValueAtTime(r.freq,t.currentTime),s.frequency.exponentialRampToValueAtTime(50,t.currentTime+r.decay),o.gain.setValueAtTime(.3,t.currentTime),o.gain.exponentialRampToValueAtTime(.01,t.currentTime+r.decay),s.start(t.currentTime),s.stop(t.currentTime+r.decay)}catch{}}function k({lang:t="es"}){const[s,o]=i.useState(y),[n,r]=i.useState(0),[m,d]=i.useState(""),[c,u]=i.useState(null),[f,l]=i.useState("normal");i.useEffect(()=>{const a=C("boss-hits-record",y);o(a)},[]);const p=i.useCallback(a=>{I(),r(E=>E+1);const v=n+1,h={totalHits:s.totalHits+1,lastPlayed:new Date().toISOString()};o(h),T("boss-hits-record",h),d(x(N));const g=a.currentTarget.getBoundingClientRect(),S=a.clientX-g.left,j=a.clientY-g.top;u({x:S,y:j,sound:x(A),id:Date.now()}),l("hit"),setTimeout(()=>l(v%10===0?"angry":"normal"),300),setTimeout(()=>u(null),800)},[n,s.totalHits]),b=()=>{switch(f){case"hit":return"😵";case"angry":return"🤬";default:return"👔"}};return e.jsxs("div",{className:"tool-container",children:[e.jsxs("div",{className:"game-area",children:[e.jsxs("div",{className:"game-header",children:[e.jsxs("div",{className:"stat",children:[e.jsx("span",{className:"stat-label",children:t==="es"?"GOLPES ESTA SESIÓN":"COLPI QUESTA SESSIONE"}),e.jsx("span",{className:"stat-value",children:n})]}),e.jsxs("div",{className:"stat",children:[e.jsx("span",{className:"stat-label",children:t==="es"?"RÉCORD TOTAL":"RECORD TOTALE"}),e.jsx("span",{className:"stat-value",children:s.totalHits})]})]}),e.jsxs("div",{className:"boss-container",onClick:p,role:"button",tabIndex:0,onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&p(a)},children:[e.jsxs("div",{className:"boss","data-state":f,children:[e.jsx("span",{className:"boss-emoji",children:b()}),e.jsx("span",{className:"boss-title",children:t==="es"?"EL JEFE":"IL BOSS"})]}),c&&e.jsx("div",{className:"hit-effect",style:{left:c.x,top:c.y},children:c.sound})]}),m&&e.jsxs("div",{className:"phrase-display",children:[e.jsxs("span",{className:"phrase-tag",children:["#",n,":"]}),m]}),e.jsxs("div",{className:"game-instructions",children:[e.jsx("p",{children:t==="es"?"👆 HAZ CLIC EN EL JEFE PARA GOLPEARLO":"👆 CLICCA SUL BOSS PER COLPIRLO"}),e.jsx("p",{children:t==="es"?"Cada click es un golpe. Cada golpe es terapéutico.":"Ogni clic è un colpo. Ogni colpo è terapeutico."})]}),e.jsx("div",{className:"game-footer",children:e.jsx("button",{className:"btn btn-small",onClick:()=>{r(0),d(""),l("normal")},children:t==="es"?"REINICIAR SESIÓN":"REINIZIA SESSIONE"})})]}),e.jsx("style",{children:`
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
      `})]})}export{k as default};
