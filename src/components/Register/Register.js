import { useState } from 'react';
import '../Login/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const url = "http://localhost:3001/users";

    const checkUserExistence = async () => {
        try {
            const response = await axios.get(url);
            let doesUserExists = false;
            response.data.forEach((user) => {
                if(user.id === email) {
                    doesUserExists = true;
                    return;
                }
            });
            return doesUserExists;
        }
        catch {
            alert("Something went wrong.");
        }
    }

    const registerUser = async () => {
        try {
            const response = await axios.post(url, {
                id: email,
                name: name,
                password: password,
                friends: []
            });
            if(response.status === 201) {
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
        event.preventDefault();
        const doesUserAlreadyExists = await checkUserExistence();
        !doesUserAlreadyExists ? registerUser() : alert("User already exists. Try using different email.");
        resetForm();
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