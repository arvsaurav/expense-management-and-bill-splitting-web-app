import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddFriend.css";

function AddFriend() {

    const url = "http://localhost:3001/users";
    const navigate = useNavigate();
    // consuming userState that is passed as a second argument inside navigate in LoggedInUserLandingPage component
    // state holds loggedIn user data
    const { state } = useLocation();
    const [friendsEmail, setFriendsEmail] = useState('');

    const validateUserExistence = async () => {
        try {
            const response = await axios.get(url);
            let doesUserExists = false;
            let userToBeAddedAsFriend = {};
            response.data.forEach((user) => {
                if(user.id === friendsEmail) {
                    doesUserExists = true;
                    userToBeAddedAsFriend = user;
                    return;
                }
            });
            return { doesUserExists, userToBeAddedAsFriend };
        }
        catch {
            alert('Something went wrong.');
        }
    }

    const checkFriendship = async (userToBeAddedAsFriend) => {
        try {
            const response = await axios.get(url+'/'+state.email);
            let alreadyAddedAsFriend = false;
            response.data.friends.forEach((friend) => {
                if(friend.friendEmail === userToBeAddedAsFriend.id) {
                    alreadyAddedAsFriend = true;
                    return;
                }
            });
            return alreadyAddedAsFriend;
        }
        catch {
            alert("Something went wrong.");
        }
    }

    const addFriend = async (userToBeAddedAsFriend) => {
        try {
            if(state.email === userToBeAddedAsFriend.id) {
                alert("Can't add yourself as a friend.");
                return;
            }
            const doesUserAlreadyAddedAsFriend = await checkFriendship(userToBeAddedAsFriend);
            if(doesUserAlreadyAddedAsFriend) {
                alert("User already added as a friend.");
                return;
            }
            // adding friend for loggedIn user
            const response1 = await axios.patch(url+'/'+state.email, {
                friends: [
                    ...state.friends,
                    {
                        friendName: userToBeAddedAsFriend.name,
                        friendEmail: userToBeAddedAsFriend.id
                    }
                ]   
            });
            // adding loggedIn user as a friend for userToBeAddedAsFriend
            const response2 = await axios.patch(url+'/'+userToBeAddedAsFriend.id, {
                friends: [
                    ...userToBeAddedAsFriend.friends,
                    {
                        friendName: state.name,
                        friendEmail: state.email
                    }
                ]
            });
            response1.status === 200 && response2.status === 200 ? alert('Friend added.') : alert('Something went wrong.');
        }
        catch {
            alert('Something went wrong.');
        }
    }

    const resetForm = () => {
        setFriendsEmail('');
    }

    const validateUserAndAddAsFriend = async (event) => {
        event.preventDefault();
        const { doesUserExists, userToBeAddedAsFriend } = await validateUserExistence();
        doesUserExists ? addFriend(userToBeAddedAsFriend) : alert("User doesn't exists. Ask your friend to register first.");
        resetForm();
    }

    const returnToLandingPage = () => {
        navigate('../landingpage');
    }

    return(
        <div className="container">
            <h2>Add friend</h2>
            <form onSubmit={validateUserAndAddAsFriend}>
                <label className="emailLabel">
                    Email
                    <br/>
                    <input name="email" type="email" placeholder="Enter your friend's email" required value={friendsEmail} onChange={(event) => {setFriendsEmail(event.target.value)}} />
                </label>
                <br/>
                <input className="button" name="submit" type="submit" value="Add" />
                <input className="button" type="button" value="Cancel" onClick={returnToLandingPage} />
            </form>
        </div>
    );
}

export default AddFriend;