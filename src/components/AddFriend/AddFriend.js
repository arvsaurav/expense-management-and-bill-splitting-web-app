import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddFriend.css";
import FriendService from "../../services/FriendService";
import UserService from "../../services/UserService";
import SplitBillService from "../../services/SplitBillService";
import Loader from "../Loader/Loader";

function AddFriend() {

    const navigate = useNavigate();
    // consuming userState that is passed as a second argument inside navigate in LoggedInUserLandingPage component
    // state.userState holds loggedIn user data
    const location = useLocation();
    const userState = location.state.userState;
    const [friendsName, setFriendsName] = useState('');
    const [friendsEmail, setFriendsEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageColor, setMessageColor] = useState('#800000');

    const checkFriendship = async () => {
        try {
            const loggedInUserFriendList = await FriendService.getFriendList(userState.email);
            let isAlreadyFriend = false;
            loggedInUserFriendList.forEach((friend) => {
                if(friend.email === friendsEmail) {
                    isAlreadyFriend = true;
                    return;
                }
            });
            return isAlreadyFriend;
        }
        catch {
            alert("Something went wrong.");
        }
    }

    const addFriend = async () => {
        try {
            if(userState.email === friendsEmail) {
                document.getElementById('add-friend-message').innerHTML = "Can't add yourself as a friend.";
                return;
            }
            const doesUserAlreadyAddedAsFriend = await checkFriendship();
            if(doesUserAlreadyAddedAsFriend) {
                document.getElementById('add-friend-message').innerHTML = "User already added as a friend.";
                return;
            }
            // adding friend for loggedIn user
            const friendListOfLoggedInUser = await FriendService.getFriendList(userState.email);
            const response1 = await FriendService.updateFriendList(userState.email, {
                friendList: [
                    ...friendListOfLoggedInUser,
                    {
                        name: friendsName,
                        email: friendsEmail
                    }
                ]   
            });
            // adding loggedIn user as a friend for userToBeAddedAsFriend
            const friendListOfOtherUser = await FriendService.getFriendList(friendsEmail);
            const response2 = await FriendService.updateFriendList(friendsEmail, {
                friendList: [
                    ...friendListOfOtherUser,
                    {
                        name: userState.name,
                        email: userState.email
                    }
                ]
            });
            // create empty transaction list with unique id
            let id = friendsEmail.localeCompare(userState.email) === 1 ? friendsEmail+userState.email : userState.email+friendsEmail;
            const response3 = await SplitBillService.createTransaction({
                id: id,
                transaction: []
            });

            if(response1 && response2 && response3) {
                setMessageColor('#004526');
                document.getElementById('add-friend-message').innerHTML = "Friend added. You will be redirected to friend list in 5 seconds...";
                setTimeout(() => {
                    navigate('../friends');
                }, 5000);
            }
            else {
                alert('Something went wrong.');
            }
        }
        catch {
            alert('Something went wrong.');
        }
    }

    const resetForm = () => {
        setFriendsName('');
        setFriendsEmail('');
    }

    const validateUserAndAddAsFriend = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            const doesUserExists = await UserService.checkUserExistence(friendsEmail);
            doesUserExists ? await addFriend() : document.getElementById('add-friend-message').innerHTML = "User doesn't exists. Ask your friend to register first.";
            setIsLoading(false);
            resetForm();
        }
        catch {
            alert("Something went wrong.");
        }
    }

    const returnToPreviousPage = () => {
        navigate('..'+location.state.redirectedFrom);
    }

    return(
        <div className="container-div">
            <h2>Add Friend</h2>
            <form onSubmit={validateUserAndAddAsFriend}>
                <label className="label">
                    Name
                    <br/>
                    <input name="name" type="text" placeholder="Enter your friend's name" required value={friendsName} onChange={(event) => {setFriendsName(event.target.value)}} />
                </label>
                <br/>
                <label className="label">
                    Email
                    <br/>
                    <input name="email" type="email" placeholder="Enter your friend's email" required value={friendsEmail} onChange={(event) => {setFriendsEmail(event.target.value)}} />
                </label>
                <div id='add-friend-message' style={{color: `${messageColor}`, width: 'fit-content', maxWidth: '30vw', textAlign: 'left', paddingLeft: '2%'}}></div>
                {
                    isLoading && <input className="button" name="submit" type="submit" value="Add" style={{pointerEvents: 'none', opacity: '0.8'}} />
                }
                {
                    isLoading && <input className="button" type="button" value="Cancel" style={{pointerEvents: 'none', opacity: '0.8'}} />
                }
                {
                    isLoading && <Loader />
                }
                {
                    !isLoading && <input className="button" name="submit" type="submit" value="Add" />
                }
                {
                    !isLoading && <input className="button" type="button" value="Cancel" onClick={returnToPreviousPage} />
                }
            </form>
        </div>
    );
}

export default AddFriend;