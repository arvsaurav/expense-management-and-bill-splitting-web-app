import { useEffect, useState } from "react";
import FriendService from "../../services/FriendService";
import EmptyFriendList from "./EmptyFriendList";
import FriendList from "./FriendList";
import { useLocation, useNavigate } from "react-router";
import "./ManageFriends.css";

function ManageFriends({userState}) {

    const [friendList, setFriendList] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getAllFriends = async () => {
            try {
                const friendsArray = await FriendService.getFriendList(userState.email);
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
        <div className="container-div">
            <h1>Manage Friends</h1>
            <div className="friendList">
                {
                    friendsCount !== 0 ? <FriendList userState={userState} friendList={friendList} setFriendList={setFriendList} setFriendsCount={setFriendsCount} /> : <EmptyFriendList/>
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