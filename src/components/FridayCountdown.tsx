import { useState, useEffect } from 'react';
import { fridayPhrases, getRandomItem } from '../data/es/phrases';
import { getTimeUntilFriday } from '../utils/dates';
import {
  getStorageItem,
  setStorageItem,
  type FridayConfig,
  defaultFridayConfig,
} from '../utils/localStorage';

export default function FridayCountdown() {
  const [config, setConfig] = useState<FridayConfig>(defaultFridayConfig);
  const [showConfig, setShowConfig] = useState(false);
  const [phrase, setPhrase] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFriday: false,
    isPast: false,
  });

  useEffect(() => {
    const saved = getStorageItem<FridayConfig>('friday-config', defaultFridayConfig);
    setConfig(saved);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!config.isConfigured) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isFriday: false, isPast: false });
      setPhrase('');
      return;
    }

    const today = new Date().getDay();
    const phrases = fridayPhrases[today] || fridayPhrases[0];
    setPhrase(getRandomItem(phrases));

    const updateTimer = () => {
      const remaining = getTimeUntilFriday(config.targetHour, config.targetMinute);
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [config]);

  const handleSave = () => {
    setStorageItem('friday-config', { ...config, isConfigured: true });
    setConfig({ ...config, isConfigured: true });
    setShowConfig(false);
  };

  const getDayName = (day: number): string => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[day];
  };

  return (
    <div className="tool-container">
      <div className="result">
        {!config.isConfigured ? (
          <>
            <h2>CUÁNTO FALTA PARA EL VIERNES</h2>
            <div className="big-number" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', padding: '1rem' }}>
              Configura la hora objetivo para empezar a contar
            </div>
          </>
        ) : timeLeft.isPast ? (
          <>
            <h2>¡¡¡LO HAS CONSEGUIDO!!!</h2>
            <div className="big-number">🎉 ¡ES VIERNES! 🎉</div>
            {phrase && <p className="phrase">{phrase}</p>}
          </>
        ) : (
          <>
            <h2>FALTAN {timeLeft.days} DÍAS PARA EL VIERNES</h2>
            <div className="big-number">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
            {phrase && <p className="phrase">{phrase}</p>}

            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Hoy es {getDayName(new Date().getDay())} — Objetivo: Viernes {config.targetHour}:{config.targetMinute.toString().padStart(2, '0')}
            </p>
          </>
        )}
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
            <label>HORA OBJETIVO</label>
            <input
              type="number"
              min="0"
              max="23"
              value={config.targetHour}
              onChange={(e) => setConfig({ ...config, targetHour: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="form-group">
            <label>MINUTO OBJETIVO</label>
            <input
              type="number"
              min="0"
              max="59"
              value={config.targetMinute}
              onChange={(e) => setConfig({ ...config, targetMinute: parseInt(e.target.value) || 0 })}
            />
          </div>

          <button className="btn" onClick={handleSave}>
            GUARDAR
          </button>
        </div>
      )}
    </div>
  );
}
