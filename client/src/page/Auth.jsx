import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Auth() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('refreshToken');
        if (token) {
            localStorage.setItem('refreshToken', token);
            toast.success("Google login successful");
            navigate('/dashboard');
        } else {
            toast.error("Google login failed");
            navigate('/login');
        }
    }, []);

    return <div>Redirecting...</div>;
}

export default Auth;
