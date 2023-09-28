import { useState } from 'react';
import '../Login/Login.css';
import axios from 'axios';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const url = "http://localhost:3001/users";

    const addUser = async () => {
        await axios.post(url, {
            id: email,
            name: name,
            password: password,
            friends: []
        }).then(() => {
            alert("User registration successful.");
        }).catch(() => {
            alert("Something went wrong.");
        });
    };

    const checkUserExistence = async () => {
        await axios.get(url)
            .then((res) => {
                let doesUserExists = false;
                res.data.forEach((user) => {
                    if(user.id === email) {
                        doesUserExists = true;
                        return;
                    }
                });
                !doesUserExists ? addUser() : alert("User already exists. Try using different email.");
            })
            .catch(() => {
                alert("Something went wrong.");
            });
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    const userRegistration = (event) => {
        event.preventDefault();
        checkUserExistence();
        resetForm();
    };

    return (
        <div className='registerDiv'>
            <h2>Register</h2>
            <form className='registerForm' onSubmit={userRegistration}>
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