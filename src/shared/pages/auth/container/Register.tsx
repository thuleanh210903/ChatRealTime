import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { register } from '../../../../services/auth.service';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, fullName);
      toast.success('Register successfully');
      navigate('/auth/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="page page-auth page-register">
      <div className="page-content">
        <h1 className="page-title">REGISTER</h1>
        <form className="page-form" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            placeHolder="Tom Ridard"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            label="Email"
            placeHolder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeHolder="123456"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label="Register" />
        </form>
        <p className="page-link">
          <Link to="/auth/login">Already have an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
