import { useState } from 'react';
import './Login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const loginUser = (event) => {
        event.preventDefault();
        alert("Login successful.");
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