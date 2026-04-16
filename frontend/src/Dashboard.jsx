import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { patientApi } from '../api';

export default function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    patientApi.getAll().then(res => setPatients(res.data));
  }, []);

  return (
    <div className="patient-grid">
      {patients.map(p => (
        <Link key={p.id} to={`/patient/${p.id}`} className="patient-tile">
          <div className="tile-header">
            <span className="tile-name">{p.name}</span>
            <span className={`tile-status status-${p.status==='Стабильно'?'ok':'warn'}`}>
              {p.status === 'Стабильно' ? '✅ Стабильно' : `⚠️ ${p.status}`}
            </span>
          </div>
          <div className="tile-meta">{p.age} | {p.diagnosis} | ID: {p.id}</div>
          <div className="tile-metrics">
            <div className="metric-mini"><span className="val">{p.bp.split('/')[0]}</span><span className="lbl">АД сист.</span></div>
            <div className="metric-mini"><span className="val">{p.hr}</span><span className="lbl">ЧСС</span></div>
            <div className="metric-mini"><span className="val">{p.spo2}%</span><span className="lbl">SpO2</span></div>
          </div>
        </Link>
      ))}
    </div>
  );
}