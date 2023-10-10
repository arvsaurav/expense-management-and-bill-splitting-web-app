import { useState } from 'react';
import '../Login/Login.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import FriendService from '../../services/FriendService';
import PersonalExpenseService from '../../services/PersonalExpenseService';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const registerUser = async () => {
        try {
            const response1 = await UserService.addUser({
                id: email,
                name: name,
                password: password
            });
            const response2 = await FriendService.createFriendList({
                id: email,
                friendList: []
            });
            const response3 = await PersonalExpenseService.createExpenseList({
                id: email,
                shopping: [],
                travel: [],
                food: [],
                movie: [],
                rent: [],
                grocery: [],
                fuel: [],
                others: []
            });
            if(response1 && response2 && response3) {
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
            const doesUserAlreadyExists = await UserService.checkUserExistence(email);
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
                <input id='button' name='submit' type='submit' value='Register'/>
            </form>
        </div>
    );
}

export default Register;