import { useState, useEffect } from 'react';
import { lifeSalaryPhrases, getRandomItem } from '../data/es/phrases';
import {
  getStorageItem,
  setStorageItem,
  type LifeSalaryConfig,
  defaultLifeSalaryConfig,
} from '../utils/localStorage';

interface Props {
  lang?: 'es' | 'it';
}

export default function LifeSalaryCalc(_props: Props) {
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
    const annualWorkHours = annualWorkDays * config.weeklyHours;
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

    // Determine phrase based on salary
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
          <h2 style={{ marginBottom: '1rem' }}>INTRODUCE TUS DATOS</h2>

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
            <label>HORAS DE TRABAJO SEMANALES</label>
            <input
              type="number"
              min="1"
              max="80"
              value={config.weeklyHours}
              onChange={(e) => setConfig({ ...config, weeklyHours: parseInt(e.target.value) || 40 })}
            />
          </div>

          <div className="form-group">
            <label>DÍAS DE VACACIONES AL AÑO</label>
            <input
              type="number"
              min="0"
              max="60"
              value={config.vacationDays}
              onChange={(e) => setConfig({ ...config, vacationDays: parseInt(e.target.value) || 22 })}
            />
          </div>
          <div className="form-group">
            <label>TIEMPO DE DESPLAZAMIENTO DIARIO (minutos)</label>
            <input
              type="number"
              min="0"
              max="300"
              value={config.dailyCommuteMinutes}
              onChange={(e) => setConfig({ ...config, dailyCommuteMinutes: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="form-group">
            <label>EDAD ACTUAL (opcional)</label>
            <input
              type="number"
              min="16"
              max="100"
              value={config.age || ''}
              onChange={(e) => setConfig({ ...config, age: parseInt(e.target.value) || undefined })}
            />
          </div>

          <div className="form-group">
            <label>AÑOS TRABAJADOS (opcional)</label>
            <input
              type="number"
              min="0"
              max="50"
              value={config.yearsWorked || ''}
              onChange={(e) => setConfig({ ...config, yearsWorked: parseInt(e.target.value) || undefined })}
            />
          </div>

          <button className="btn" onClick={calculate}>
            CALCULAR MI DESGRACIA LABORAL
          </button>
        </div>
      ) : (
        <div className="result">
          <h2>TU VIDA LABORAL VALORADA</h2>

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">SALARIO POR HORA</span>
              <span className="stat-value">{results?.salaryPerHour}€</span>
            </div>

            <div className="stat-item">
              <span className="stat-label">SALARIO POR DÍA</span>
              <span className="stat-value">{results?.salaryPerDay}€</span>
            </div>

            <div className="stat-item">
              <span className="stat-label">HORAS ANUALES DE TRABAJO</span>
              <span className="stat-value">{results?.annualWorkHours}h</span>
            </div>

            <div className="stat-item">
              <span className="stat-label">HORAS ANUALES DE DESPLAZAMIENTO</span>
              <span className="stat-value">{results?.annualCommuteHours}h</span>
            </div>

            <div className="stat-item highlight">
              <span className="stat-label">VALOR DE UNA HORA DE TU VIDA LABORAL</span>
              <span className="stat-value big">{results?.lifeValuePerHour}€</span>
            </div>
          </div>

          <p className="phrase">{phrase}</p>

          <button
            className="btn btn-small"
            onClick={() => setShowConfig(true)}
            style={{ marginTop: '1.5rem' }}
          >
            RECALCULAR
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
