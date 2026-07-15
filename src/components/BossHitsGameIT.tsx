import { useState, useEffect, useCallback } from 'react';
import { bossHitsPhrases, getRandomItem } from '../data/it/phrases';
import {
  getStorageItem,
  setStorageItem,
  type BossHitsRecord,
  defaultBossHitsRecord,
} from '../utils/localStorage';

const hitTexts = [
  'POW!',
  'WHACK!',
  'BAM!',
  'SLAP!',
  'OUCH!',
  'THWACK!',
];

function playHitSound() {
  if (typeof window === 'undefined') return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const sounds = [
      { freq: 200, type: 'square' as OscillatorType, decay: 0.1 },
      { freq: 150, type: 'sawtooth' as OscillatorType, decay: 0.15 },
      { freq: 300, type: 'square' as OscillatorType, decay: 0.08 },
      { freq: 100, type: 'triangle' as OscillatorType, decay: 0.2 },
    ];

    const sound = sounds[Math.floor(Math.random() * sounds.length)];

    oscillator.type = sound.type;
    oscillator.frequency.setValueAtTime(sound.freq, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + sound.decay);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.decay);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.decay);
  } catch {}
}

export default function BossHitsGameIT() {
  const [record, setRecord] = useState<BossHitsRecord>(defaultBossHitsRecord);
  const [currentHits, setCurrentHits] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [hitEffect, setHitEffect] = useState<{ x: number; y: number; sound: string; id: number } | null>(null);
  const [bossState, setBossState] = useState<'normal' | 'hit' | 'angry'>('normal');

  useEffect(() => {
    const saved = getStorageItem<BossHitsRecord>('boss-hits-record', defaultBossHitsRecord);
    setRecord(saved);
  }, []);

  const handleHit = useCallback((e: React.MouseEvent) => {
    playHitSound();

    setCurrentHits(prev => prev + 1);
    const totalHits = currentHits + 1;

    const newRecord: BossHitsRecord = {
      totalHits: record.totalHits + 1,
      lastPlayed: new Date().toISOString(),
    };
    setRecord(newRecord);
    setStorageItem('boss-hits-record', newRecord);

    setCurrentPhrase(getRandomItem(bossHitsPhrases));

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHitEffect({ x, y, sound: getRandomItem(hitTexts), id: Date.now() });

    setBossState('hit');
    setTimeout(() => setBossState(totalHits % 10 === 0 ? 'angry' : 'normal'), 300);
    setTimeout(() => setHitEffect(null), 800);
  }, [currentHits, record.totalHits]);

  const getBossEmoji = () => {
    switch (bossState) {
      case 'hit': return '😵';
      case 'angry': return '🤬';
      default: return '👔';
    }
  };

  return (
    <div className="tool-container">
      <div className="game-area">
        <div className="game-header">
          <div className="stat">
            <span className="stat-label">COLPI QUESTA SESSIONE</span>
            <span className="stat-value">{currentHits}</span>
          </div>
          <div className="stat">
            <span className="stat-label">RECORD TOTALE</span>
            <span className="stat-value">{record.totalHits}</span>
          </div>
        </div>

        <div className="boss-container" onClick={handleHit} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleHit(e as any); }}>
          <div className="boss" data-state={bossState}>
            <span className="boss-emoji">{getBossEmoji()}</span>
            <span className="boss-title">IL BOSS</span>
          </div>
          {hitEffect && (
            <div className="hit-effect" style={{ left: hitEffect.x, top: hitEffect.y }}>
              {hitEffect.sound}
            </div>
          )}
        </div>

        {currentPhrase && (
          <div className="phrase-display">
            <span className="phrase-tag">#{currentHits}:</span>
            {currentPhrase}
          </div>
        )}

        <div className="game-instructions">
          <p>👆 CLICCA SUL BOSS PER COLPIRLO</p>
          <p>Ogni clic è un colpo. Ogni colpo è terapeutico.</p>
        </div>

        <div className="game-footer">
          <button className="btn btn-small" onClick={() => {
            setCurrentHits(0);
            setCurrentPhrase('');
            setBossState('normal');
          }}>REINIZIA SESSIONE</button>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}
