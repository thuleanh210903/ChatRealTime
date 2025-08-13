import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../../../context/UserProvider';
import { login } from '../../../../services/auth.service';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface ILoginProps {
  email: string;
  password: string;
}
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginProps>({
    mode: 'onChange',
  });

  const onSubmit = async (data: ILoginProps) => {
    try {
      setIsLoading(true);

      const response = await login(data);

      if (response.success && response.user) {
        setUser(response.user);
        toast.success('Login successfully');
        navigate('/');
      }
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
    <div className="page page-auth page-login">
      <div className="page-content">
        <h1 className="page-title">LOGIN</h1>
        <form className="page-form" onSubmit={handleSubmit(onSubmit)}>
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
                {...field}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            label="Login"
            isLoading={isLoading}
            isDisabled={!isValid || isLoading}
          />
        </form>
        <p className="page-link">
          <Link to="/auth/register">You don't have account ?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
