// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { AuthContext } from '@/context/AuthContext';
import logo from '@/assets/logo1.png';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication logic
    // Replace this with real API call
    if (credentials.email === 'admin@drishti.com' && credentials.password === 'admin') {
      login({ name: 'Admin User', email: 'admin@drishti.com', role: 'Admin' });
      navigate('/admin-control-panel');
    } else {
      // For simplicity, any other credentials are treated as Investigator
      login({ name: 'John Doe', email: credentials.email, role: 'Investigator' });
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <div className="flex justify-center">
          <img src={logo} alt="Drishti Logo" className="h-12" />
        </div>
        <h2 className="text-2xl font-bold text-center">Login to Drishti</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email or Mobile Number</Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
        <div className="text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
        </div>
        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
