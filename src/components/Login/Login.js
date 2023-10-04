import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

function Login({setUserState}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateAndLogin = async () => {
        try {
            const response = await UserService.getUserById(email);
            if(response.password === password) {
                setUserState({
                    doesUserLoggedIn: true,
                    email: response.id,
                    name: response.name
                });
                navigate('/landingpage');
            }
            else {
                alert("Invalid credentials.");
            }
        }
        catch {
            alert("Something went wrong.");
        }
    }

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const validateCredentialsAndLoginUser = async (event) => {
        try {
            event.preventDefault();
            const doesUserExists = await UserService.checkUserExistence(email);
            doesUserExists ? await validateAndLogin() : alert("Invalid credentials.");
            resetForm();
        }
        catch {
            alert("Something went wrong.");
        }
    }

    return (
        <div className='loginDiv'>
            <h2>Login</h2>
            <form className='loginForm' onSubmit={validateCredentialsAndLoginUser}>
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