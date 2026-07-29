import { useState, useEffect, useRef } from 'react';
import { retirementPhrases, getRandomItem } from '../data/it/phrases';
import { calculateRetirement } from '../utils/dates';
import {
  getStorageItem,
  setStorageItem,
  type RetirementConfig,
  defaultRetirementConfig,
} from '../utils/localStorage';
import confetti from 'canvas-confetti';

export default function RetirementCalcIT() {
  const [config, setConfig] = useState<RetirementConfig>(defaultRetirementConfig);
  const [showConfig, setShowConfig] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof calculateRetirement> | null>(null);
  const [phrase, setPhrase] = useState('');
  const confettiPlayed = useRef(false);

  useEffect(() => {
    const saved = getStorageItem<RetirementConfig>('retirement-config', defaultRetirementConfig);
    setConfig(saved);

    if (saved.isConfigured) {
      const retirement = calculateRetirement(
        saved.currentAge,
        saved.retirementAge,
        saved.yearsContributed
      );
      setResult(retirement);
      selectPhrase(retirement);
      setShowConfig(false);
    } else {
      setShowConfig(true);
    }
  }, []);

  const selectPhrase = (retirement: ReturnType<typeof calculateRetirement>) => {
    if (retirement.isRetired) {
      setPhrase(getRandomItem(retirementPhrases.today));
    } else if (retirement.yearsRemaining >= 30) {
      setPhrase(getRandomItem(retirementPhrases.decades));
    } else if (retirement.yearsRemaining >= 1) {
      setPhrase(getRandomItem(retirementPhrases.years));
    } else if (retirement.monthsRemaining >= 1) {
      setPhrase(getRandomItem(retirementPhrases.months));
    } else {
      setPhrase(getRandomItem(retirementPhrases.days));
    }
  };

  useEffect(() => {
    if (result?.isRetired && !confettiPlayed.current) {
      confettiPlayed.current = true;
      const duration = 5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff6b35', '#f7c948', '#e84393', '#00b894'],
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff6b35', '#f7c948', '#e84393', '#00b894'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [result]);

  const calculate = () => {
    const retirement = calculateRetirement(
      config.currentAge,
      config.retirementAge,
      config.yearsContributed
    );
    setResult(retirement);
    selectPhrase(retirement);
    setStorageItem('retirement-config', { ...config, isConfigured: true });
    setShowConfig(false);
  };

  return (
    <div className="tool-container">
      {showConfig ? (
        <div className="card">
          <h2 style={{ marginBottom: '1rem' }}>CALCOLATRICE PENSIONE</h2>

          <div className="form-group">
            <label>ETÀ DI PENSIONAMENTO NEL TUO PAESE</label>
            <input
              type="number"
              min="50"
              max="80"
              value={config.retirementAge}
              onChange={(e) => setConfig({ ...config, retirementAge: parseInt(e.target.value) || 67 })}
            />
          </div>

          <div className="form-group">
            <label>ETÀ ATTUALE</label>
            <input
              type="number"
              min="16"
              max="100"
              value={config.currentAge}
              onChange={(e) => setConfig({ ...config, currentAge: parseInt(e.target.value) || 30 })}
            />
          </div>

          <div className="form-group">
            <label>ANNI CONTRIBUTITI</label>
            <input
              type="number"
              min="0"
              max="50"
              value={config.yearsContributed}
              onChange={(e) => setConfig({ ...config, yearsContributed: parseInt(e.target.value) || 0 })}
            />
          </div>

          <button className="btn" onClick={calculate}>
            CALCOLA LA MIA LIBERTÀ
          </button>
        </div>
      ) : (
        <div className="result">
          {result?.isRetired ? (
            <>
              <h2>OGGI VAI IN PENSIONE!</h2>
              <div className="big-number celebration">🎉🎉🎉</div>
            </>
          ) : (
            <>
              <h2>MANCANO PER LA PENSIONE</h2>
              <div className="retirement-countdown">
                <div className="countdown-item">
                  <span className="countdown-number">{result?.yearsRemaining ?? 0}</span>
                  <span className="countdown-label">ANNI</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number">{result?.monthsRemaining ?? 0}</span>
                  <span className="countdown-label">MESI</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number">{result?.daysRemaining ?? 0}</span>
                  <span className="countdown-label">GIORNI</span>
                </div>
              </div>
            </>
          )}

          {phrase && <p className="phrase">{phrase}</p>}

          <button
            className="btn btn-small"
            onClick={() => {
              setShowConfig(true);
              confettiPlayed.current = false;
            }}
            style={{ marginTop: '1.5rem' }}
          >
            RICALCOLA
          </button>
        </div>
      )}

      <style>{`
        .retirement-countdown {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }
        .countdown-item { text-align: center; }
        .countdown-number {
          display: block;
          font-family: var(--font-heading);
          font-size: 4rem;
          color: var(--color-secondary);
          text-shadow: 3px 3px 0 var(--color-primary);
          line-height: 1;
        }
        .countdown-label {
          display: block;
          font-size: 1rem;
          color: var(--color-text-muted);
          margin-top: 0.5rem;
          text-transform: uppercase;
        }
        .celebration {
          font-size: 4rem;
          animation: pulse 0.5s ease-in-out infinite alternate;
        }
        @keyframes pulse {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
