import { useState } from 'react';
import '../Login/Login.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import FriendService from '../../services/FriendService';
import PersonalExpenseService from '../../services/PersonalExpenseService';
import CryptoJS from 'crypto-js';
import Loader from '../Loader/Loader';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageColor, setMessageColor] = useState('#800000');
    const navigate = useNavigate();

    const encryptPassword = () => {
        // secrete passphrase 
        const secretPass = "XkhZG4fW2t2W";
        const data = CryptoJS.AES.encrypt(
            JSON.stringify(password),
            secretPass
        ).toString();
        return data;
    }

    const registerUser = async () => {
        try {
            const encryptedPassword = encryptPassword();
            const response1 = await UserService.addUser({
                id: email,
                name: name,
                password: encryptedPassword
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
                setMessageColor('#004526');
                document.getElementById('user-registration-message').innerHTML = "User registration successful. You will be redirected to login page in 5 seconds...";
                setTimeout(() => {
                    navigate('../login');
                }, 5000);
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
            setIsLoading(true);
            const doesUserAlreadyExists = await UserService.checkUserExistence(email);
            !doesUserAlreadyExists ? await registerUser() : document.getElementById('user-registration-message').innerHTML = "User already exists. Try using different email.";
            setIsLoading(false);
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
                <div id='user-registration-message' style={{color: `${messageColor}`, width: 'fit-content', textAlign: 'left' ,maxWidth: '30vw'}} />
                {
                    !isLoading && <input id='button' name='submit' type='submit' value='Register'/>
                }
                {
                    isLoading && <input id='button' name='submit' type='submit' value='Register' style={{pointerEvents: 'none', opacity: '0.8'}} />
                }
                {
                    isLoading && <Loader />
                }
            </form>
        </div>
    );
}

export default Register;