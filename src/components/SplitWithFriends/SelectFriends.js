import { useState, useEffect } from "react";
import FriendService from "../../services/FriendService";
import { useLocation, useNavigate } from "react-router-dom";
import "./SelectFriends.css";
import SplitBillService from "../../services/SplitBillService";

function SelectFriends() {

    const [friendList, setFriendList] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);
    // store email of selected friends
    const [selectedFriends, setSelectedFriends] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const userState = location.state.userState;

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

    const selectFriend = (friendsEmail) => {
        if(document.getElementById(friendsEmail).checked) {
            setSelectedFriends([
                ...selectedFriends,
                friendsEmail
            ]);
        }
        else if(!document.getElementById(friendsEmail).checked) {
            const updatedList = selectedFriends.filter((email) => email !== friendsEmail);
            setSelectedFriends(updatedList);
        }
    }

    const splitBill = async () => {
        try {
            if(selectedFriends.length === 0) {
                alert("Please select atleast one friend.");
                return;
            }
            selectedFriends.forEach(async (friendsEmail) => {
                let id = friendsEmail.localeCompare(userState.email) === 1 ? friendsEmail+userState.email : userState.email+friendsEmail;
                const allTransactionOfCurrentFriend = await SplitBillService.getTransactionById(id); 
                const response = await SplitBillService.updateTransaction(id, {
                    transaction: [
                        ...allTransactionOfCurrentFriend,
                        {
                            date: location.state.dateString,
                            expenseType: location.state.expenseType,
                            amount: location.state.amount/(selectedFriends.length+1),
                            paidBy: userState.email,
                            isSettledUp: false
                        }
                    ]
                });
                if(!response) {
                    alert("Something went wrong.");
                }
            });
            alert("Bill splitted successfully.");
        }
        catch {
            alert("Something went wrong.");
        }
    }

    return (
        <div className="select-friend-container-div">
            <h1>Select Friends</h1>
            <div className="friendlist">
                {
                    friendsCount !== 0 && 
                    <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Select</th>
                        </tr>
                        {
                            friendList.map((friend, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{friend.name} </td>
                                        <td>{friend.email}</td>
                                        <td><input type="checkbox" id={friend.email} className="friend-selection-checkbox" name="friends" onChange={() => {selectFriend(friend.email)}} /></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    </table>
                }
                {
                    friendsCount === 0 &&
                        <div>
                            {
                                <div> No friends to show. </div>
                            }
                        </div>
                }
            </div>
            <div>
                <button className="button" onClick={() => splitBill()}>
                    Split
                </button>
                <button className="button" onClick={() => navigate('../addexpense', {state: {userState: userState, redirectedFrom: location.state.redirectedFrom}})}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default SelectFriends;