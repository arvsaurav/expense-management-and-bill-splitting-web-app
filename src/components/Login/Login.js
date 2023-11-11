import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import CryptoJS from 'crypto-js';
import Loader from '../Loader/Loader';

function Login({setUserState}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const decryptPassword = (fetchedPassword) => {
        const secretPass = "XkhZG4fW2t2W";
        const bytes = CryptoJS.AES.decrypt(fetchedPassword, secretPass);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return data;
    }

    const validateAndLogin = async () => {
        try {
            const response = await UserService.getUserById(email);
            const decryptedPassword = decryptPassword(response.password);
            if(decryptedPassword === password) {
                setUserState({
                    doesUserLoggedIn: true,
                    email: response.id,
                    name: response.name
                });
                navigate('/landingpage');
            }
            else {
                document.getElementById('invalid-credentials').innerHTML = "Invalid credentials.";
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
            setIsLoading(true);
            const doesUserExists = await UserService.checkUserExistence(email);
            doesUserExists ? await validateAndLogin() : document.getElementById('invalid-credentials').innerHTML = "Invalid credentials.";
            setIsLoading(false);
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
                <div id='invalid-credentials' style={{color: '#800000', width: 'fit-content'}}></div>
                {
                    !isLoading && <input id='button' name='submit' type='submit' value='Login' />
                }
                {
                    isLoading && <input id='button' name='submit' type='submit' value='Login' style={{pointerEvents: 'none', opacity: '0.8'}} />
                }
                {
                    isLoading && <Loader />
                }
            </form>
        </div>
    );
}

export default Login;