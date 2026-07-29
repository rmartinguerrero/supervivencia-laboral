import { useState, useEffect } from 'react';
import { lifeSalaryPhrases, getRandomItem } from '../data/it/phrases';
import {
  getStorageItem,
  setStorageItem,
  type LifeSalaryConfig,
  defaultLifeSalaryConfig,
} from '../utils/localStorage';

export default function LifeSalaryCalcIT() {
  const [config, setConfig] = useState<LifeSalaryConfig>(defaultLifeSalaryConfig);
  const [showConfig, setShowConfig] = useState(true);
  const [results, setResults] = useState<{
    salaryPerHour: number;
    salaryPerDay: number;
    annualWorkHours: number;
    annualCommuteHours: number;
    lifeValuePerHour: number;
  } | null>(null);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const saved = getStorageItem<LifeSalaryConfig>('life-salary-config', defaultLifeSalaryConfig);
    setConfig(saved);
  }, []);

  const calculate = () => {
    const weeksPerYear = 52;
    const workDaysPerWeek = 5;
    const vacationWeeks = config.vacationDays / workDaysPerWeek;
    const workedWeeks = weeksPerYear - vacationWeeks;

    const annualSalary = config.monthlySalary * 12;
    const annualWorkDays = workedWeeks * workDaysPerWeek;
    const annualWorkHours = workedWeeks * config.weeklyHours;
    const annualCommuteHours = annualWorkDays * (config.dailyCommuteMinutes / 60);

    const salaryPerHour = annualSalary / annualWorkHours;
    const salaryPerDay = annualSalary / annualWorkDays;
    const lifeValuePerHour = annualSalary / (annualWorkHours + annualCommuteHours);

    setResults({
      salaryPerHour: Math.round(salaryPerHour * 100) / 100,
      salaryPerDay: Math.round(salaryPerDay * 100) / 100,
      annualWorkHours: Math.round(annualWorkHours),
      annualCommuteHours: Math.round(annualCommuteHours),
      lifeValuePerHour: Math.round(lifeValuePerHour * 100) / 100,
    });

    if (config.monthlySalary >= 2000) {
      setPhrase(getRandomItem(lifeSalaryPhrases.high));
    } else if (config.monthlySalary >= 1400) {
      setPhrase(getRandomItem(lifeSalaryPhrases.mid));
    } else {
      setPhrase(getRandomItem(lifeSalaryPhrases.low));
    }

    setShowConfig(false);
    setStorageItem('life-salary-config', config);
  };

  return (
    <div className="tool-container">
      {showConfig ? (
        <div className="card">
          <h2 style={{ marginBottom: '1rem' }}>INSERISCI I TUOI DATI</h2>
          <div className="form-group">
            <label>STIPENDIO MENSILE (€)</label>
            <input type="number" min="0" value={config.monthlySalary}
              onChange={(e) => setConfig({ ...config, monthlySalary: parseInt(e.target.value) || 0 })} />
          </div>
          <div className="form-group">
            <label>ORE DI LAVORO SETTIMANALI</label>
            <input type="number" min="1" max="80" value={config.weeklyHours}
              onChange={(e) => setConfig({ ...config, weeklyHours: parseInt(e.target.value) || 40 })} />
          </div>
          <div className="form-group">
            <label>GIORNI DI VACANZE ALL'ANNO</label>
            <input type="number" min="0" max="60" value={config.vacationDays}
              onChange={(e) => setConfig({ ...config, vacationDays: parseInt(e.target.value) || 22 })} />
          </div>
          <div className="form-group">
            <label>TEMPO DI SPOSTAMENTO GIORNALIERO (minuti)</label>
            <input type="number" min="0" max="300" value={config.dailyCommuteMinutes}
              onChange={(e) => setConfig({ ...config, dailyCommuteMinutes: parseInt(e.target.value) || 0 })} />
          </div>
          <button className="btn" onClick={calculate}>CALCOLA LA MIA DISGRAZIA LAVORATIVA</button>
        </div>
      ) : (
        <div className="result">
          <h2>LA TUA VITA LAVORATIVA VALORIZZATA</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">STIPENDIO ORARIO</span>
              <span className="stat-value">{results?.salaryPerHour}€</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">STIPENDIO GIORNALIERO</span>
              <span className="stat-value">{results?.salaryPerDay}€</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">ORE ANNUALI DI LAVORO</span>
              <span className="stat-value">{results?.annualWorkHours}h</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">ORE ANNUALI DI SPOSTAMENTO</span>
              <span className="stat-value">{results?.annualCommuteHours}h</span>
            </div>
            <div className="stat-item highlight">
              <span className="stat-label">VALORE DI UN'ORA DELLA TUA VITA LAVORATIVA</span>
              <span className="stat-value big">{results?.lifeValuePerHour}€</span>
            </div>
          </div>
          <p className="holiday-notice"><span className="holiday-notice-text">NOTA: Le festività nazionali non sono incluse in questo calcolo</span></p>

          <p className="phrase">{phrase}</p>
          <button className="btn btn-small" onClick={() => setShowConfig(true)} style={{ marginTop: '1.5rem' }}>
            RICALCOLA
          </button>
        </div>
      )}

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .stat-item {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-card-border);
          padding: 1rem;
          text-align: center;
        }
        .stat-item.highlight {
          border-color: var(--color-secondary);
          background: rgba(247, 201, 72, 0.1);
        }
        .stat-label {
          display: block;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--color-primary);
        }
        .stat-value.big {
          font-size: 2rem;
          color: var(--color-secondary);
        }
      `}</style>
    </div>
  );
}
