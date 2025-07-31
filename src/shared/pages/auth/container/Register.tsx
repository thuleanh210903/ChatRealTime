import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const Register = () => {
  return (
    <div className="page page-register">
      <h1 className="page-title">REGISTER</h1>
      <form className="page-form">
        <Input label="Email" placeHolder="user@gmail.com" />
        <Input label="Password" type="password" placeHolder="123456" />
        <Button label="Register" />
      </form>
      <p>
        <Link to="">Already have an account</Link>
      </p>
    </div>
  );
};

export default Register;
