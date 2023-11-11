import { useState, useEffect } from "react";
import FriendService from "../../services/FriendService";
import { useLocation, useNavigate } from "react-router-dom";
import "./SelectFriends.css";
import SplitBillService from "../../services/SplitBillService";
import PersonalExpenseService from "../../services/PersonalExpenseService";
import Loader from "../Loader/Loader";

function SelectFriends() {

    const [friendList, setFriendList] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);
    // store email of selected friends
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [splitBillLoadingObject, setsplitBillLoadingObject] = useState({
        isLoading: false,
        pointerEvent: 'auto',
        opacity: '1'
    });
    const [messageColor, setMessageColor] = useState('#800000');
    const location = useLocation();
    const navigate = useNavigate();
    const userState = location.state.userState;

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
                document.getElementById('split-bill-message').innerHTML = "Please select atleast one friend.";
                return;
            }
            setsplitBillLoadingObject({
                isLoading: true,
                pointerEvent: 'none',
                opacity: '0.8'
            });
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
            // add (total_amount/total_person) as personal expense
            const getAllExpenseOfCurrentExpenseType = await PersonalExpenseService.getExpenseByExpenseType(userState.email, location.state.expenseType);
            // check whether any expense already added on same date
            // if yes, sum both amounts
            // if no, push new expense object in the array
            let flag = false;
            const updatedExpenseListOfCurrentExpenseType = getAllExpenseOfCurrentExpenseType.map((expenseObject) => {
                if(expenseObject.date === location.state.dateString) {
                    expenseObject.amount = expenseObject.amount + parseInt(location.state.amount/(selectedFriends.length+1));
                    flag = true;
                }
                return expenseObject;
            });
            if(!flag) {
                updatedExpenseListOfCurrentExpenseType.push({
                    date: location.state.dateString,
                    amount: parseInt(location.state.amount/(selectedFriends.length+1))
                });
            }
            const doesExpenseListUpdatedSuccessfully = await PersonalExpenseService.updateExpenseById(userState.email, {
                [location.state.expenseType]: updatedExpenseListOfCurrentExpenseType
            });
            if(doesExpenseListUpdatedSuccessfully) {
                setsplitBillLoadingObject({
                    isLoading: false,
                    pointerEvent: 'none',
                    opacity: '0.8'
                });
                setMessageColor('#004526');
                document.getElementById('split-bill-message').innerHTML = "Bill splitted successfully. You will be redirected to manage expense page in 5 seconds...";
                setTimeout(() => {
                    navigate('/expenses');
                }, 5000);
            }
            else {
                alert("Something went wrong.");
            }
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
                    isLoading ? <Loader /> : 
                        friendsCount === 0 ? <div> No friends to show. </div> :
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
                                                <td><input type="checkbox" style={{pointerEvents: `${splitBillLoadingObject.pointerEvent}`, opacity: `${splitBillLoadingObject.opacity}`}} id={friend.email} className="friend-selection-checkbox" name="friends" onChange={() => {selectFriend(friend.email)}} /></td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                            </table>
                }
            </div>
            <div>
                <button className="button" style={{pointerEvents: `${splitBillLoadingObject.pointerEvent}`, opacity: `${splitBillLoadingObject.opacity}`}} onClick={() => splitBill()}>
                    Split
                </button>
                <button className="button" style={{pointerEvents: `${splitBillLoadingObject.pointerEvent}`, opacity: `${splitBillLoadingObject.opacity}`}} onClick={() => navigate('../addexpense', {state: {userState: userState, redirectedFrom: location.state.redirectedFrom}})}>
                    Back
                </button>
            </div>
            {
                splitBillLoadingObject.isLoading && <Loader />
            }
            <div id='split-bill-message' style={{color: `${messageColor}`, width: 'fit-content', textAlign: 'left', maxWidth: '30vw'}} />
        </div>    
    );
}

export default SelectFriends;