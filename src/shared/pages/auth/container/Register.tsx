import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import React, { useState } from 'react';
import { register } from '../../../../services/auth.service';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    try {
      await register(email, password);
      toast.success('Register successfully');
      alert('hi');
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
