import { useState, useEffect, useCallback } from 'react';
import { bossHitsPhrases, getRandomItem } from '../data/es/phrases';
import {
  getStorageItem,
  setStorageItem,
  type BossHitsRecord,
  defaultBossHitsRecord,
} from '../utils/localStorage';

interface Props {
  lang?: 'es' | 'it';
}

const hitSounds = [
  '¡POW!',
  '¡WHACK!',
  '¡BAM!',
  '¡SLAP!',
  '¡OUCH!',
  '¡THWACK!',
];

export default function BossHitsGame({ lang = 'es' }: Props) {
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
    // Increment hits
    setCurrentHits(prev => prev + 1);
    const totalHits = currentHits + 1;

    // Update record
    const newRecord: BossHitsRecord = {
      totalHits: record.totalHits + 1,
      lastPlayed: new Date().toISOString(),
    };
    setRecord(newRecord);
    setStorageItem('boss-hits-record', newRecord);

    // Show phrase
    setCurrentPhrase(getRandomItem(bossHitsPhrases));

    // Show hit effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHitEffect({
      x,
      y,
      sound: getRandomItem(hitSounds),
      id: Date.now(),
    });

    // Boss reaction
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
            <span className="stat-label">GOLPES ESTA SESIÓN</span>
            <span className="stat-value">{currentHits}</span>
          </div>
          <div className="stat">
            <span className="stat-label">RÉCORD TOTAL</span>
            <span className="stat-value">{record.totalHits}</span>
          </div>
        </div>

        <div
          className="boss-container"
          onClick={handleHit}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleHit(e as any);
            }
          }}
        >
          <div className="boss" data-state={bossState}>
            <span className="boss-emoji">{getBossEmoji()}</span>
            <span className="boss-title">EL JEFE</span>
          </div>

          {hitEffect && (
            <div
              className="hit-effect"
              style={{
                left: hitEffect.x,
                top: hitEffect.y,
              }}
            >
              {hitEffect.sound}
            </div>
          )}
        </div>

        {currentPhrase && (
          <div className="phrase-display">
            <span className="phrase-tag">GOLPE #{currentHits}:</span>
            {currentPhrase}
          </div>
        )}

        <div className="game-instructions">
          <p>👆 HAZ CLIC EN EL JEFE PARA GOLPEARLO</p>
          <p>Cada click es un golpe. Cada golpe es terapéutico.</p>
        </div>

        <div className="game-footer">
          <button
            className="btn btn-small"
            onClick={() => {
              setCurrentHits(0);
              setCurrentPhrase('');
              setBossState('normal');
            }}
          >
            REINICIAR SESIÓN
          </button>
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

        .game-header .stat {
          text-align: center;
        }

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

        .boss-container:hover {
          transform: scale(1.05);
        }

        .boss-container:active {
          transform: scale(0.95);
        }

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

        .game-instructions p {
          margin: 0.5rem 0;
        }

        .game-footer {
          margin-top: 1.5rem;
        }

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
