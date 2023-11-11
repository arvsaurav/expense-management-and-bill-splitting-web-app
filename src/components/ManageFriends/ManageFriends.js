import { useEffect, useState } from "react";
import FriendService from "../../services/FriendService";
import EmptyFriendList from "./EmptyFriendList";
import FriendList from "./FriendList";
import { useLocation, useNavigate } from "react-router";
import "./ManageFriends.css";
import Loader from '../Loader/Loader';

function ManageFriends({userState}) {

    const [friendList, setFriendList] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getAllFriends = async () => {
            try {
                const friendsArray = await FriendService.getFriendList(userState.email);
                setIsLoading(false);
                setFriendList(friendsArray);
                setFriendsCount(friendsArray.length);
            }
            catch {
                alert("Something went wrong.");
            }
        }
        getAllFriends();
    }, [userState]);

    return (
        <div className="manage-friends-div">
            <h1>Manage Friends</h1>
            <div className="friendList">
                {
                    isLoading ? <Loader /> : 
                        friendsCount === 0 ? <EmptyFriendList /> :
                            <FriendList userState={userState} friendList={friendList} setFriendList={setFriendList} setFriendsCount={setFriendsCount} /> 
                }
            </div>
            <div>
                <button className="button" onClick={() => navigate('../addfriend', {state: {userState: userState, redirectedFrom: location.pathname}})}>
                    Add Friend
                </button>
                <button className="button" onClick={() => navigate('../landingpage')}>
                    Return to Homepage
                </button>
            </div>
        </div>
    );
}

export default ManageFriends;