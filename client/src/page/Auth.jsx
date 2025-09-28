import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // ✅ hook must be top-level

  useEffect(() => {
    const token = searchParams.get('refreshToken');
    if (token) {
      localStorage.setItem('refreshToken', token);
      toast.success("Google login successful");
      navigate('/dashboard');
    } else {
      toast.error("Google login failed");
      navigate('/signin'); // ✅ should be /signin (you don't have /login route)
    }
  }, [searchParams, navigate]);

  return <div>Redirecting...</div>;
}

export default Auth;
