import { useState, useEffect } from 'react';
import { salaryPhrases, getRandomItem } from '../data/it/phrases';
import { getNextPayDate, getTimeRemaining, formatTimeRemainingIT } from '../utils/dates';
import {
  getStorageItem,
  setStorageItem,
  type SalaryConfig,
  defaultSalaryConfig,
} from '../utils/localStorage';

export default function SalaryCountdownIT() {
  const [config, setConfig] = useState<SalaryConfig>(defaultSalaryConfig);
  const [showConfig, setShowConfig] = useState(false);
  const [phrase, setPhrase] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    percentRemaining: 0,
  });
  const [extraInfo, setExtraInfo] = useState<{ type: string; date: Date; daysLeft: number } | null>(null);

  useEffect(() => {
    const saved = getStorageItem<SalaryConfig>('salary-config', defaultSalaryConfig);
    setConfig(saved);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!config.isConfigured) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, percentRemaining: 0 });
      setPhrase('');
      setExtraInfo(null);
      return;
    }

    const pickPhrase = (salary: number) => {
      if (salary < 1400) return getRandomItem(salaryPhrases.low);
      if (salary <= 2000) return getRandomItem(salaryPhrases.mid);
      return getRandomItem(salaryPhrases.high);
    };

    const updateTimer = () => {
      const payDate = getNextPayDate(config.payDay);
      const remaining = getTimeRemaining(payDate);
      setTimeLeft(remaining);
      setPhrase(pickPhrase(config.monthlySalary));

      const now = new Date();
      const year = now.getFullYear();

      if (config.hasSummerExtra) {
        const [month, day] = config.summerExtraDate.split('-').map(Number);
        let summerDate = new Date(year, month - 1, day);
        if (summerDate < now) summerDate = new Date(year + 1, month - 1, day);
        const summerDays = Math.ceil((summerDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        setExtraInfo({ type: 'summer', date: summerDate, daysLeft: summerDays });
      }

      if (config.hasChristmasExtra) {
        const [month, day] = config.christmasExtraDate.split('-').map(Number);
        let christmasDate = new Date(year, month - 1, day);
        if (christmasDate < now) christmasDate = new Date(year + 1, month - 1, day);
        const christmasDays = Math.ceil((christmasDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        setExtraInfo(prev => {
          if (!prev || christmasDays < prev.daysLeft) {
            return { type: 'christmas', date: christmasDate, daysLeft: christmasDays };
          }
          return prev;
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [config]);

  const handleSave = () => {
    setStorageItem('salary-config', { ...config, isConfigured: true });
    setConfig({ ...config, isConfigured: true });
    setShowConfig(false);
  };

  return (
    <div className="tool-container">
      <div className="result">
        {!config.isConfigured ? (
          <>
            <h2>QUANTO MANCANO PER LO STIPENDIO</h2>
            <div className="big-number" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', padding: '1rem' }}>
              Configura il giorno di pagamento per iniziare a contare
            </div>
          </>
        ) : (
          <>
            <h2>MANCANO {timeLeft.days} GIORNI PER LO STIPENDIO</h2>
            <div className="big-number">{formatTimeRemainingIT(timeLeft)}</div>
            {phrase && <p className="phrase">{phrase}</p>}

            {config.hasSummerExtra && extraInfo?.type === 'summer' && (
              <div className="extra-info">
                <p>MANCANO {extraInfo.daysLeft} GIORNI PER LA TREDICESIMA ESTIVA</p>
              </div>
            )}

            {config.hasChristmasExtra && extraInfo?.type === 'christmas' && (
              <div className="extra-info">
                <p>MANCANO {extraInfo.daysLeft} GIORNI PER LA TREDICESIMA DI NATALE</p>
              </div>
            )}

            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Percentuale del mese rimanente: {timeLeft.percentRemaining}%
            </p>
          </>
        )}
      </div>

      <button className="btn btn-small" onClick={() => setShowConfig(!showConfig)} style={{ marginTop: '1rem' }}>
        {showConfig ? 'ANNULLA' : 'CONFIGURA'}
      </button>

      {showConfig && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>CONFIGURAZIONE</h3>
          <div className="form-group">
            <label>GIORNO DI PAGAMENTO (1-31)</label>
            <input type="number" min="1" max="31" value={config.payDay}
              onChange={(e) => setConfig({ ...config, payDay: parseInt(e.target.value) || 1 })} />
          </div>
          <div className="form-group">
            <label>STIPENDIO MENSILE (€)</label>
            <input type="number" min="0" value={config.monthlySalary}
              onChange={(e) => setConfig({ ...config, monthlySalary: parseInt(e.target.value) || 0 })} />
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" checked={config.hasSummerExtra}
                onChange={(e) => setConfig({ ...config, hasSummerExtra: e.target.checked })} />
              HA TREDICESIMA ESTIVA
            </label>
          </div>
          {config.hasSummerExtra && (
            <div className="form-group">
              <label>DATA TREDICESIMA ESTIVA (MM-GG)</label>
              <input type="text" value={config.summerExtraDate}
                onChange={(e) => setConfig({ ...config, summerExtraDate: e.target.value })} placeholder="06-15" />
            </div>
          )}
          <div className="form-group">
            <label>
              <input type="checkbox" checked={config.hasChristmasExtra}
                onChange={(e) => setConfig({ ...config, hasChristmasExtra: e.target.checked })} />
              HA TREDICESIMA DI NATALE
            </label>
          </div>
          {config.hasChristmasExtra && (
            <div className="form-group">
              <label>DATA TREDICESIMA NATALE (MM-GG)</label>
              <input type="text" value={config.christmasExtraDate}
                onChange={(e) => setConfig({ ...config, christmasExtraDate: e.target.value })} placeholder="12-15" />
            </div>
          )}
          <button className="btn" onClick={handleSave}>SALVA</button>
        </div>
      )}
    </div>
  );
}
