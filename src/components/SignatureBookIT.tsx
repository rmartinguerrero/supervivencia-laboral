import { useState, useEffect } from 'react';
import { signatureCategories } from '../data/it/phrases';

interface Firma {
  id: string;
  alias: string;
  message: string;
  category: string;
  timestamp: string;
}

export default function SignatureBookIT() {
  const [firmas, setFirmas] = useState<Firma[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  const fetchFirmas = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/firmas?lang=it&page=${pageNum}&limit=20`);
      const data = await response.json();
      setFirmas(data.firmas);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      console.error('Error fetching firmas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFirmas(page);
  }, [page]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSubmitting(true);

    try {
      const response = await fetch('/api/firmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias, message, category, lang: 'it' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setSuccess(true);
      setAlias('');
      setMessage('');
      setCategory('');
      fetchFirmas(1);
      setPage(1);
    } catch (err) {
      setError('Errore nell\'invio della firma. Riprova.');
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryLabel = (catId: string): string => {
    const cat = signatureCategories.find(c => c.id === catId);
    return cat?.label || catId;
  };

  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="signature-book">
      <div className="form-section card">
        <h2>FIRMA ADESSO</h2>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            La tua firma è stata registrata! Grazie per la lotta.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>IL TUO NOME O ALIAS</label>
            <input type="text" value={alias} onChange={(e) => setAlias(e.target.value)}
              maxLength={50} required placeholder="Lavoratore Anonimo" />
          </div>

          <div className="form-group">
            <label>IL TUO MESSAGGIO / CAUSA</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}
              maxLength={500} required rows={3} placeholder="Firmo per..." />
            <small>{message.length}/500</small>
          </div>

          <div className="form-group">
            <label>CATEGORIA</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Seleziona...</option>
              {signatureCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'INVIO IN CORSO...' : '✍️ FIRMA'}
          </button>
        </form>
      </div>

      <div className="list-section">
        <h2>
          LIBRO DELLE FIRME
          <span className="total-count"> ({total} firme)</span>
        </h2>

        {loading ? (
          <p className="loading">Caricamento firme...</p>
        ) : firmas.length === 0 ? (
          <p className="empty">Non ci sono ancora firme. Sii il primo!</p>
        ) : (
          <div className="firmas-list">
            {firmas.map(firma => (
              <div key={firma.id} className="firma-card card">
                <div className="firma-header">
                  <span className="firma-alias">{firma.alias}</span>
                  <span className="firma-category">{getCategoryLabel(firma.category)}</span>
                </div>
                <p className="firma-message">"{firma.message}"</p>
                <span className="firma-date">{formatDate(firma.timestamp)}</span>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button className="btn btn-small" onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}>← PRECEDENTE</button>
            <span className="page-info">{page} / {totalPages}</span>
            <button className="btn btn-small" onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}>SUCCESSIVO →</button>
          </div>
        )}
      </div>

      <style>{`
        .signature-book {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .signature-book { grid-template-columns: 1fr; }
        }
        .form-section h2, .list-section h2 { margin-bottom: 1.5rem; }
        .total-count {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: normal;
        }
        .error-message {
          background: rgba(214, 48, 49, 0.2);
          border: 1px solid var(--color-error);
          padding: 0.75rem;
          margin-bottom: 1rem;
          color: var(--color-error);
        }
        .success-message {
          background: rgba(0, 184, 148, 0.2);
          border: 1px solid var(--color-success);
          padding: 0.75rem;
          margin-bottom: 1rem;
          color: var(--color-success);
        }
        .form-group small {
          display: block;
          text-align: right;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
        }
        .loading, .empty {
          text-align: center;
          color: var(--color-text-muted);
          padding: 2rem;
        }
        .firmas-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .firma-card { padding: 1rem; }
        .firma-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .firma-alias {
          font-weight: bold;
          color: var(--color-secondary);
        }
        .firma-category {
          font-size: 0.75rem;
          background: var(--color-primary);
          color: white;
          padding: 0.2rem 0.5rem;
        }
        .firma-message {
          font-style: italic;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }
        .firma-date {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .page-info { color: var(--color-text-muted); }
      `}</style>
    </div>
  );
}
