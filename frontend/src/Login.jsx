import { useState } from 'react';
import { authApi } from '../api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.login(form);
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.doctor);
    } catch {
      alert('❌ Ошибка авторизации. Проверьте логин/пароль.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>🔐 ТМониторинг v1.0</h2>
        <input type="text" placeholder="Логин" required value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
        <input type="password" placeholder="Пароль" required value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <button type="submit" className="btn btn-primary">🚪 Войти в систему</button>
      </form>
    </div>
  );
}