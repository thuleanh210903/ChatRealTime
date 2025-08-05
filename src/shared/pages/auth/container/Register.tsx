import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { register } from '../../../../services/auth.service';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface IRegisterForm {
  fullName: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password at least 6 character')
    .required('Password is required'),
});
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: IRegisterForm) => {
    try {
      setIsLoading(true);
      const payload = {
        ...data,
      };
      await register(payload);
      toast.success('Register successfully');
      navigate('/auth/login');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Register failed');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="page page-auth page-register">
      <div className="page-content">
        <h1 className="page-title">REGISTER</h1>
        <form className="page-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <Input
                label="Full Name"
                placeHolder="Tom Ridard"
                {...field}
                errorMessage={errors.fullName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                label="Email"
                type="email"
                {...field}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                label="Password"
                type="password"
                placeHolder="123456"
                {...field}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            label="Register"
            isLoading={isLoading}
            isDisabled={!isValid || isLoading}
          />
        </form>
        <p className="page-link">
          <Link to="/auth/login">Already have an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
