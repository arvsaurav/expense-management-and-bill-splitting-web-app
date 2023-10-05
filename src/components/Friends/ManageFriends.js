import { useEffect, useState } from "react";
import FriendService from "../../services/FriendService";
import EmptyFriendList from "./EmptyFriendList";
import FriendList from "./FriendList";
import { useNavigate } from "react-router";

function ManageFriends({userState}) {

    const [friendList, setFriendList] = useState([]);
    const [isFriendListEmpty, setIsFriendListEmpty] = useState(true);
    const navigate = useNavigate();

    const getAllFriends = async () => {
        try {
            const friendsArray = await FriendService.getFriendList(userState.email);
            setFriendList(friendsArray);
            if(friendsArray.length !== 0) {
                setIsFriendListEmpty(false);
            }
        }
        catch {
            alert("Something went wrong.");
        }
    }

    useEffect(() => {
        getAllFriends();
    }, []);

    return (
        <div>
            Manage Friends
            <div>
                {
                    !isFriendListEmpty ? <FriendList friendList={friendList} /> : <EmptyFriendList/>
                }
            </div>
            <button onClick={() => navigate('../addfriend', {state: userState})}>
                Add Friend
            </button>
            <button onClick={() => navigate('../landingpage')}>
                Cancel
            </button>
        </div>
    );
}

export default ManageFriends;