import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { patientApi } from './api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [journalChartInstance, setJournalChartInstance] = useState(null);
  const [patientChartInstance, setPatientChartInstance] = useState(null);

  const [modals, setModals] = useState({
    addPatient: false,
    addUser: false,
    action: false,
    userProfile: false
  });
  const [modalData, setModalData] = useState({ title: '', type: '' });

  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientDiagnosis, setNewPatientDiagnosis] = useState('');
  const [newPatientId, setNewPatientId] = useState('');

  const [patients, setPatients] = useState([
    { id: "PT-1002", name: "Калыс Асылканов", age: "55 л.", diagnosis: "ИБС, Стенокардия", hr: 68, bp: "135/85", spo2: "98", status: "Стабильно", statusType: "ok" },
    { id: "PT-1003", name: "Айаруу Алымбекова", age: "70 л.", diagnosis: "ХСН IIФ", hr: 90, bp: "140/90", spo2: "89", status: "Гипоксемия", statusType: "err" },
    { id: "PT-1004", name: "Амина Калиева", age: "48 л.", diagnosis: "АГ I ст.", hr: 72, bp: "125/80", spo2: "99", status: "Стабильно", statusType: "ok" },
    { id: "PT-1005", name: "Эрмек Саматкулов", age: "65 л.", diagnosis: "Аритмия (ФП)", hr: 105, bp: "130/82", spo2: "96", status: "Тахикардия", statusType: "warn" },
    { id: "PT-1006", name: "Чолпон Шагиева", age: "58 л.", diagnosis: "СД 2 тип, АГ", hr: 78, bp: "145/88", spo2: "97", status: "Стабильно", statusType: "ok" },
    { id: "PT-1007", name: "Жылдыз Эгембердиева", age: "73 г.", diagnosis: "ХОБЛ", hr: 88, bp: "120/75", spo2: "92", status: "Гипоксемия", statusType: "warn" },
    { id: "PT-1008", name: "Асылбек Койчуманов", age: "60 л.", diagnosis: "Инфаркт в анамнезе", hr: 74, bp: "150/95", spo2: "95", status: "Гипертензия", statusType: "err" },
    { id: "PT-1009", name: "Далия Айтбаева", age: "52 л.", diagnosis: "ВСД, Панич. атаки", hr: 95, bp: "118/70", spo2: "99", status: "Тахикардия", statusType: "warn" },
    { id: "PT-1010", name: "Алтынай Карыбекова", age: "67 л.", diagnosis: "АГ II ст.", hr: 80, bp: "155/98", spo2: "94", status: "Гипертензия", statusType: "err" }
  ]);

  const [events, setEvents] = useState([
    { date: "14.04.2026 10:42", patient: "Калыс Асылканов", type: "Гипертензия", value: "165/95", comment: "Ожидает назначения" },
    { date: "14.04.2026 09:15", patient: "Айаруу Алымбекова", type: "Тахикардия", value: "112 уд/мин", comment: "Стабильно" }
  ]);

  const [alerts, setAlerts] = useState([
    { time: "14.04 10:42", doctor: "Асема Жамгырчиева", type: "Критический", description: "АД > 160 мм рт.ст.", status: "Активно", statusColor: "danger" },
    { time: "14.04 08:30", doctor: "Алтынай Карыбекова", type: "Информация", description: "Калибровка датчика", status: "Завершено", statusColor: "success" }
  ]);

  const [users, setUsers] = useState([
    { name: "Асема Жамгырчиева", position: "Врач-кардиолог", login: "a.zhamgyrchieva", status: "Активен" },
    { name: "Хадия Эсенгалиева", position: "Медсестра", login: "h.esengalieva", status: "Активен" }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser && loginPass) {
      setIsLoggedIn(true);
    } else {
      alert('Пожалуйста, введите логин и пароль');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUser('');
    setLoginPass('');
  };

  const openModal = (modalName, title = null, type = null) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
    if (title) {
      setModalData({ title, type });
    }
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  const openPatientCard = (patient) => {
    setSelectedPatient(patient);
    setActiveSection('patient');
  };

  const handleAddPatient = async () => {
    if (!newPatientName || !newPatientAge || !newPatientDiagnosis) {
      alert('Заполните ФИО, возраст и диагноз');
      return;
    }

    const patientData = {
      name: newPatientName,
      age: newPatientAge,
      diagnosis: newPatientDiagnosis,
      hr: 72,
      bp: '120/80',
      spo2: '98',
      status: 'Стабильно'
    };

    try {
      await patientApi.create(patientData);
      const res = await patientApi.getAll();

      const normalizedPatients = res.data.map((p) => ({
        ...p,
        statusType:
          p.status === 'Стабильно'
            ? 'ok'
            : p.status === 'Тахикардия' || p.status === 'Гипоксемия'
            ? 'warn'
            : 'err'
      }));

      setPatients(normalizedPatients);
      closeModal('addPatient');
      setNewPatientName('');
      setNewPatientAge('');
      setNewPatientDiagnosis('');
      setNewPatientId('');
      alert('Пациент добавлен');
    } catch (error) {
      console.error('Ошибка при добавлении пациента:', error);
      alert('Не удалось добавить пациента');
    }
  };

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const res = await patientApi.getAll();
        const normalizedPatients = res.data.map((p) => ({
          ...p,
          statusType:
            p.status === 'Стабильно'
              ? 'ok'
              : p.status === 'Тахикардия' || p.status === 'Гипоксемия'
              ? 'warn'
              : 'err'
        }));
        setPatients(normalizedPatients);
      } catch (error) {
        console.error('Ошибка загрузки пациентов:', error);
      }
    };

    loadPatients();
  }, []);

  const journalChartData = {
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    datasets: [
      { label: 'Тахикардия', data: [2, 1, 3, 0, 2, 1, 0], borderColor: '#ff6384', tension: 0.4, fill: false },
      { label: 'Гипертензия', data: [5, 4, 6, 3, 5, 4, 7], borderColor: '#36a2eb', tension: 0.4, fill: false },
      { label: 'Гипоксемия', data: [0, 1, 0, 2, 0, 1, 0], borderColor: '#ffcd56', tension: 0.4, fill: false }
    ]
  };

  const patientChartData = {
    labels: ['24ч', '20ч', '16ч', '12ч', '8ч', '4ч', '0ч'],
    datasets: [
      { label: 'ЧСС (уд/мин)', data: [72, 75, 68, 80, 85, 78, 74], borderColor: '#28a745', tension: 0.3 },
      { label: 'АД сист. (мм рт.ст.)', data: [120, 125, 118, 130, 135, 128, 122], borderColor: '#dc3545', tension: 0.3 }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } }
  };

  const getStatusClass = (statusType) => {
    switch(statusType) {
      case 'ok': return 'status-ok';
      case 'warn': return 'status-warn';
      case 'err': return 'status-err';
      default: return '';
    }
  };

  const getStatusIcon = (statusType) => {
    switch(statusType) {
      case 'ok': return '✅ Стабильно';
      case 'warn': return '⚠️ Гипоксемия';
      case 'err': return '🚨 Гипертензия';
      default: return statusType;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>🔐 ТМониторинг v1.0</h2>
          <p className="sub">Вход в систему</p>
          <form onSubmit={handleLogin} autoComplete="off">
            <div className="form-group">
              <label>Логин</label>
              <input 
                type="text" 
                value={loginUser} 
                onChange={(e) => setLoginUser(e.target.value)} 
                required 
                placeholder="admin"
              />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input 
                type="password" 
                value={loginPass} 
                onChange={(e) => setLoginPass(e.target.value)} 
                required 
                placeholder="admin"
              />
            </div>
            <button type="submit" className="btn btn-primary">🚪 Войти в систему</button>
          </form>
          <p className="note">Доступ только для авторизованного медицинского персонала</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container active">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🔐 ТМониторинг v1.0</h2>
          <p>Доступ только для авторизованного персонала</p>
        </div>
        <nav>
          <a className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSection('dashboard')}>📋 Сводная панель</a>
          <a className={`nav-link ${activeSection === 'patient' ? 'active' : ''}`} onClick={() => setActiveSection('patient')}>👨‍⚕️ Пациент</a>
          <a className={`nav-link ${activeSection === 'journal' ? 'active' : ''}`} onClick={() => setActiveSection('journal')}>📈 История</a>
          <a className={`nav-link ${activeSection === 'alerts' ? 'active' : ''}`} onClick={() => setActiveSection('alerts')}>⚠️ Оповещения</a>
          <a className={`nav-link ${activeSection === 'users' ? 'active' : ''}`} onClick={() => setActiveSection('users')}>👥 Пользователи</a>
          <a className={`nav-link ${activeSection === 'settings' ? 'active' : ''}`} onClick={() => setActiveSection('settings')}>⚙️ Настройки</a>
          <a className="nav-link" style={{ marginTop: '20px', color: '#e74c3c', cursor: 'pointer' }} onClick={handleLogout}>🚪 Выход</a>
        </nav>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <div className="doctor-info">👨‍⚕️ Врач-кардиолог: Асема Жамгырчиева</div>
          <button className="btn btn-primary" onClick={() => openModal('addPatient')}>➕ Добавить пациента</button>
        </div>

        <section className={`section ${activeSection === 'dashboard' ? 'active' : ''}`}>
          <div className="card-header"><h3>👥 Список пациентов</h3></div>
          <div className="patient-grid">
            {patients.map(patient => (
              <div key={patient.id} className="patient-tile" onClick={() => openPatientCard(patient)}>
                <div className="tile-header">
                  <span className="tile-name">{patient.name}</span>
                  <span className={`tile-status ${getStatusClass(patient.statusType)}`}>{getStatusIcon(patient.statusType)}</span>
                </div>
                <div className="tile-meta">{patient.age} | {patient.diagnosis} | ID: {patient.id}</div>
                <div className="tile-metrics">
                  <div className="metric-mini"><span className="val">{patient.bp.split('/')[0]}</span><span className="lbl">АД сист.</span></div>
                  <div className="metric-mini"><span className="val">{patient.hr}</span><span className="lbl">ЧСС</span></div>
                  <div className="metric-mini"><span className="val">{patient.spo2}%</span><span className="lbl">SpO2</span></div>
                </div>
                <div className="tile-actions">
                  <button className="btn btn-sm btn-secondary" onClick={(e) => { e.stopPropagation(); openModal('action', 'История', 'view'); }}>📅 История</button>
                  <button className="btn btn-sm btn-primary" onClick={(e) => { e.stopPropagation(); openModal('action', 'Комментарий', 'comment'); }}>📝 Комм.</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`section ${activeSection === 'patient' ? 'active' : ''}`}>
          <div className="card">
            <div className="card-header">
              <h3 id="patient-title">👨‍⚕️ Карточка пациента: {selectedPatient?.name || 'Не выбран'}</h3>
              <div>
                <button className="btn btn-secondary" onClick={() => setActiveSection('dashboard')}>🔙 Назад</button>
                <button className="btn btn-primary">📝 Назначить лечение</button>
              </div>
            </div>
            {selectedPatient && (
              <>
                <p style={{ color: 'var(--text-light)', marginBottom: '15px' }}>
                  Возраст: {selectedPatient.age} | Диагноз: {selectedPatient.diagnosis} | ID: {selectedPatient.id}
                </p>
                <div className="metrics-grid">
                  <div className="metric-box"><div className="label">ЧСС</div><div className="value">{selectedPatient.hr}</div></div>
                  <div className="metric-box"><div className="label">АД</div><div className="value">{selectedPatient.bp}</div></div>
                  <div className="metric-box"><div className="label">SpO2</div><div className="value">{selectedPatient.spo2}%</div></div>
                  <div className="metric-box"><div className="label">ЧД</div><div className="value">--</div></div>
                  <div className="metric-box"><div className="label">T</div><div className="value">--°C</div></div>
                </div>
                <div className="chart-container">
                  <Line data={patientChartData} options={lineChartOptions} />
                </div>
              </>
            )}
          </div>
        </section>

        <section className={`section ${activeSection === 'journal' ? 'active' : ''}`}>
          <div className="card">
            <div className="card-header">
              <h3>📈 Журнал событий и комментарии</h3>
              <button className="btn btn-secondary" onClick={() => setActiveSection('dashboard')}>🔙 На панель</button>
            </div>
            <div className="filters">
              <span className="filter-btn active">Все пациенты</span>
              <span className="filter-btn">Все типы</span>
              <span className="filter-btn">Тахикардия</span>
              <span className="filter-btn">Гипоксемия</span>
              <span className="filter-btn">Гипертензия</span>
              <span className="filter-btn">Брадикардия</span>
              <button className="btn btn-sm" style={{ marginLeft: 'auto' }}>🔄 Сбросить</button>
            </div>
            <div className="chart-container">
              <Line data={journalChartData} options={chartOptions} />
            </div>
            <table>
              <thead>
                <tr><th>Дата и время</th><th>Пациент</th><th>Событие</th><th>Значение</th><th>Комментарий врача</th><th>Действия</th></tr>
              </thead>
              <tbody>
                {events.map((event, idx) => (
                  <tr key={idx}>
                    <td>{event.date}</td><td>{event.patient}</td><td>{event.type}</td><td>{event.value}</td>
                    <td>{event.comment}</td>
                    <td><button className="btn btn-sm btn-primary" onClick={() => openModal('action', 'Добавить комментарий', 'comment')}>📝 Комментарии</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={`section ${activeSection === 'alerts' ? 'active' : ''}`}>
          <div className="card">
            <h3>⚠️ Журнал системных оповещений</h3>
            <table>
              <thead>
                <tr><th>Время</th><th>Пациент</th><th>Тип</th><th>Описание</th><th>Статус</th><th>Действия</th></tr>
              </thead>
              <tbody>
                {alerts.map((alert, idx) => (
                  <tr key={idx}>
                    <td>{alert.time}</td><td>{alert.doctor}</td><td>{alert.type}</td><td>{alert.description}</td>
                    <td><span style={{ color: `var(--${alert.statusColor})` }}>{alert.status}</span></td>
                    <td><button className="btn btn-sm btn-primary" onClick={() => openModal('action', 'Обработать оповещение', 'process')}>⚙️ Действия</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={`section ${activeSection === 'users' ? 'active' : ''}`}>
          <div className="card">
            <div className="card-header">
              <h3>👥 Справочник пользователей системы</h3>
              <button className="btn btn-primary" onClick={() => openModal('addUser')}>➕ Добавить пользователя</button>
            </div>
            <table>
              <thead>
                <tr><th>ФИО</th><th>Должность</th><th>Логин</th><th>Статус</th><th>Действия</th></tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td><td>{user.position}</td><td>{user.login}</td><td>{user.status}</td>
                    <td><button className="btn btn-sm" onClick={() => openModal('userProfile', 'Профиль пользователя')}>👤 Профиль</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={`section ${activeSection === 'settings' ? 'active' : ''}`}>
          <div className="card">
            <h3>⚙️ Настройки интерфейса</h3>
            <div className="form-group" style={{ maxWidth: '400px', marginTop: '15px' }}>
              <label>Тема оформления</label>
              <select><option>Светлая</option><option>Темная</option></select>
            </div>
            <div className="form-group" style={{ maxWidth: '400px' }}>
              <label>Частота обновления данных</label>
              <select>
                <option>Реальное время (1 сек)</option>
                <option>Быстрая (5 сек)</option>
                <option>Экономная (30 сек)</option>
              </select>
            </div>
            <div className="form-group" style={{ maxWidth: '400px' }}>
              <label><input type="checkbox" defaultChecked /> Включить звуковые оповещения</label>
            </div>
            <button className="btn btn-primary">💾 Сохранить изменения</button>

            <h3 style={{ marginTop: '30px' }}>🔒 Безопасность</h3>
            <div className="form-group" style={{ maxWidth: '400px', marginTop: '15px' }}>
              <label>Текущий пароль</label>
              <input type="password" />
            </div>
            <div className="form-group" style={{ maxWidth: '400px' }}>
              <label>Новый пароль</label>
              <input type="password" />
            </div>
            <div className="form-group" style={{ maxWidth: '400px' }}>
              <label>Подтверждение пароля</label>
              <input type="password" />
            </div>
            <button className="btn btn-secondary">🔒 Обновить пароль</button>
          </div>
        </section>
      </main>

      <div className={`modal-overlay ${modals.addPatient ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-header">
            <h3>➕ Добавить пациента</h3>
            <button className="close-modal" onClick={() => closeModal('addPatient')}>&times;</button>
          </div>

          <div className="form-group">
            <label>ФИО</label>
            <input
              type="text"
              placeholder="Иванов Иван Иванович"
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Дата рождения / Возраст</label>
            <input
              type="text"
              placeholder="55 л."
              value={newPatientAge}
              onChange={(e) => setNewPatientAge(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Основной диагноз</label>
            <input
              type="text"
              placeholder="ИБС, АГ II ст."
              value={newPatientDiagnosis}
              onChange={(e) => setNewPatientDiagnosis(e.target.value)}
            />
          </div>

          

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => closeModal('addPatient')}>
              Отмена
            </button>
            <button className="btn btn-primary" onClick={handleAddPatient}>
              💾 Сохранить
            </button>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${modals.addUser ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-header"><h3>➕ Добавить пользователя</h3><button className="close-modal" onClick={() => closeModal('addUser')}>&times;</button></div>
          <div className="form-group"><label>ФИО</label><input type="text" /></div>
          <div className="form-group"><label>Должность</label><select><option>Врач</option><option>Медсестра</option><option>Администратор</option></select></div>
          <div className="form-group"><label>Логин</label><input type="text" /></div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => closeModal('addUser')}>Отмена</button>
            <button className="btn btn-primary" onClick={() => { closeModal('addUser'); alert('Пользователь добавлен'); }}>Добавить</button>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${modals.action ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-header"><h3>{modalData.title || 'Действие'}</h3><button className="close-modal" onClick={() => closeModal('action')}>&times;</button></div>
          {modalData.type !== 'view' && modalData.type !== 'alert' && modalData.type !== 'process' ? (
            <>
              <div className="form-group"><label>Комментарий / Заметка</label><textarea placeholder="Введите текст..."></textarea></div>
              <div className="form-group"><label>Статус обработки</label><select><option>Принято</option><option>Требует внимания</option><option>Ложное срабатывание</option></select></div>
            </>
          ) : (
            <p style={{ padding: '20px', textAlign: 'center' }}>Форма обработки события</p>
          )}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => closeModal('action')}>Закрыть</button>
            <button className="btn btn-primary" onClick={() => { closeModal('action'); alert('Изменения сохранены'); }}>💾 Сохранить</button>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${modals.userProfile ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-header"><h3>👤 Профиль пользователя</h3><button className="close-modal" onClick={() => closeModal('userProfile')}>&times;</button></div>
          <div className="form-group"><label>ФИО</label><input type="text" defaultValue="Асема Жамгырчиева" /></div>
          <div className="form-group"><label>Должность</label><input type="text" defaultValue="Врач-кардиолог" /></div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => closeModal('userProfile')}>Закрыть</button>
            <button className="btn btn-primary" onClick={() => closeModal('userProfile')}>💾 Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;