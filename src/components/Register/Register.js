import { useState } from 'react';
import '../Login/Login.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const checkUserExistence = async () => {
        try {
            const response = await UserService.getUserById(email);
            const isExistingUser = Object.keys(response).length === 0 ? false : true;
            return isExistingUser;
        }
        catch {
            alert("Something went wrong.");
        }
    }

    const registerUser = async () => {
        try {
            const user = {
                id: email,
                name: name,
                password: password
            }
            const response = await UserService.addUser(user);
            if(response) {
                alert("User registration successful.");
                navigate('../login');
            }
            else {
                alert("User registration failed.");
            }
        }
        catch {
            alert("Something went wrong.");
        }
    }

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    const checkExistenceAndRegisterUser = async (event) => {
        try {
            event.preventDefault();
            const doesUserAlreadyExists = await checkUserExistence();
            !doesUserAlreadyExists ? await registerUser() : alert("User already exists. Try using different email.");
            resetForm();
        }
        catch {
            alert("Something went wrong.");
        }
    };

    return (
        <div className='registerDiv'>
            <h2>Register</h2>
            <form className='registerForm' onSubmit={checkExistenceAndRegisterUser}>
                <label id='nameLabel'>
                    Name
                    <br/>
                    <input name='name' type='text' placeholder='Enter your name' required value={name} onChange={(event) => {setName(event.target.value)}}/>
                </label>
                <br/>
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
                <input name='submit' type='submit' value='Register'/>
            </form>
        </div>
    );
}

export default Register;