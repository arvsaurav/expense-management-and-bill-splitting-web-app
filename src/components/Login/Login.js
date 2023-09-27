import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({setUserState}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const url = "http://localhost:3001/users";

    const validateCredentials = async () => {
        await axios.get(url)
            .then((res) => {
                let isCredentialsValid = false;
                res.data.forEach((user) => {
                    if(user.id === email && user.password === password) {
                        isCredentialsValid = true;
                        setUserState({
                            'doesUserLoggedIn': true,
                            'email': email,
                            'name': user.name
                        });
                        return;
                    }
                });
                isCredentialsValid ? navigate('/') : alert("Invalid credentials.");
            })
            .catch(() => {
                alert("Something went wrong.");
            });
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const loginUser = (event) => {
        event.preventDefault();
        validateCredentials();
        resetForm();
    }

    return (
        <div className='loginDiv'>
            <h2>Login</h2>
            <form className='loginForm' onSubmit={loginUser}>
                <label id='emailLabel'>
                    Email
                    <br/>
                    <input name='email' type='email' placeholder='Enter your email' required value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                </label>
                <br/>
                <label id='passwordLabel'>
                    Password
                    <br/>
                    <input name='password' type='password' placeholder='Enter your password' required value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                </label>
                <br/>
                <input name='submit' type='submit' value='Login' />
            </form>
        </div>
    );

}

export default Login;