import { useState, useEffect } from 'react';
import { salaryPhrases, getRandomItem } from '../data/es/phrases';
import { getNextPayDate, getTimeRemaining, formatTimeRemaining } from '../utils/dates';
import {
  getStorageItem,
  setStorageItem,
  type SalaryConfig,
  defaultSalaryConfig,
} from '../utils/localStorage';

interface Props {
  lang?: 'es' | 'it';
}

export default function SalaryCountdown({ lang = 'es' }: Props) {
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
  const [nextPay, setNextPay] = useState<Date>(new Date());
  const [extraInfo, setExtraInfo] = useState<{ type: string; date: Date; daysLeft: number } | null>(null);

  useEffect(() => {
    const saved = getStorageItem<SalaryConfig>('salary-config', defaultSalaryConfig);
    setConfig(saved);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateTimer = () => {
      const payDate = getNextPayDate(config.payDay);
      setNextPay(payDate);
      const remaining = getTimeRemaining(payDate);
      setTimeLeft(remaining);

      // Determine phrase based on days
      if (remaining.days <= 3) {
        setPhrase(getRandomItem(salaryPhrases.soon));
      } else if (remaining.days <= 15) {
        setPhrase(getRandomItem(salaryPhrases.mid));
      } else {
        setPhrase(getRandomItem(salaryPhrases.far));
      }

      // Check extras
      const now = new Date();
      const year = now.getFullYear();

      if (config.hasSummerExtra) {
        const [month, day] = config.summerExtraDate.split('-').map(Number);
        let summerDate = new Date(year, month - 1, day);
        if (summerDate < now) {
          summerDate = new Date(year + 1, month - 1, day);
        }
        const summerDays = Math.ceil((summerDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        setExtraInfo({
          type: 'summer',
          date: summerDate,
          daysLeft: summerDays,
        });
      }

      if (config.hasChristmasExtra) {
        const [month, day] = config.christmasExtraDate.split('-').map(Number);
        let christmasDate = new Date(year, month - 1, day);
        if (christmasDate < now) {
          christmasDate = new Date(year + 1, month - 1, day);
        }
        const christmasDays = Math.ceil((christmasDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (!extraInfo || christmasDays < extraInfo.daysLeft) {
          setExtraInfo({
            type: 'christmas',
            date: christmasDate,
            daysLeft: christmasDays,
          });
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [config]);

  const handleSave = () => {
    setStorageItem('salary-config', config);
    setShowConfig(false);
  };

  const phrases = lang === 'es' ? salaryPhrases : salaryPhrases;

  return (
    <div className="tool-container">
      <div className="result">
        <h2>FALTAN {timeLeft.days} DÍAS PARA COBRAR</h2>
        <div className="big-number">{formatTimeRemaining(timeLeft)}</div>
        <p className="phrase">{phrase}</p>

        {config.hasSummerExtra && (
          <div className="extra-info">
            <p>FALTAN {extraInfo?.daysLeft || 0} DÍAS PARA LA PAGA EXTRA DE VERANO</p>
          </div>
        )}

        {config.hasChristmasExtra && (
          <div className="extra-info">
            <p>FALTAN {extraInfo?.daysLeft || 0} DÍAS PARA LA PAGA EXTRA DE NAVIDAD</p>
          </div>
        )}

        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
          Porcentaje del mes restante: {timeLeft.percentRemaining}%
        </p>
      </div>

      <button
        className="btn btn-small"
        onClick={() => setShowConfig(!showConfig)}
        style={{ marginTop: '1rem' }}
      >
        {showConfig ? 'CANCELAR' : 'CONFIGURAR'}
      </button>

      {showConfig && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>CONFIGURACIÓN</h3>

          <div className="form-group">
            <label>DÍA DE COBRO (1-31)</label>
            <input
              type="number"
              min="1"
              max="31"
              value={config.payDay}
              onChange={(e) => setConfig({ ...config, payDay: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div className="form-group">
            <label>SALARIO MENSUAL (€)</label>
            <input
              type="number"
              min="0"
              value={config.monthlySalary}
              onChange={(e) => setConfig({ ...config, monthlySalary: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={config.hasSummerExtra}
                onChange={(e) => setConfig({ ...config, hasSummerExtra: e.target.checked })}
                style={{ marginRight: '0.5rem' }}
              />
              TIENE PAGA EXTRA DE VERANO
            </label>
          </div>

          {config.hasSummerExtra && (
            <div className="form-group">
              <label>FECHA PAGA EXTRA VERANO (MM-DD)</label>
              <input
                type="text"
                value={config.summerExtraDate}
                onChange={(e) => setConfig({ ...config, summerExtraDate: e.target.value })}
                placeholder="06-15"
              />
            </div>
          )}

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={config.hasChristmasExtra}
                onChange={(e) => setConfig({ ...config, hasChristmasExtra: e.target.checked })}
                style={{ marginRight: '0.5rem' }}
              />
              TIENE PAGA EXTRA DE NAVIDAD
            </label>
          </div>

          {config.hasChristmasExtra && (
            <div className="form-group">
              <label>FECHA PAGA EXTRA NAVIDAD (MM-DD)</label>
              <input
                type="text"
                value={config.christmasExtraDate}
                onChange={(e) => setConfig({ ...config, christmasExtraDate: e.target.value })}
                placeholder="12-15"
              />
            </div>
          )}

          <button className="btn" onClick={handleSave}>
            GUARDAR
          </button>
        </div>
      )}
    </div>
  );
}
