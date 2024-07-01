import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/login.css'; 

export class ApiError extends Error {
  public status: number;

  constructor(status: number, msg: string) {
    super(msg);
    this.status = status;
  }
}

export const Login = () => {
  const nav = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState() as any;
  const username = 'admin'
  const pass = 'admin'

  const handleSubmit = useCallback(
    async (e: React.FormEvent | React.MouseEvent) => {
      e.preventDefault();
      if (login !== username || password !== pass) {
        return setError('Invalid login or password');
      }
      nav('/admin');
    },
    [login, nav, password]
  );

  return (
    <div className="login" >
      <form onSubmit={e => handleSubmit(e)} >
        <h3>Admin Login</h3>
        <label htmlFor="login">
          Login by <strong>Username</strong>
        </label>
        <input id="login" type="text" value={login} onChange={e => setLogin(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
