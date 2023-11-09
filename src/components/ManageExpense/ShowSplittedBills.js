import { useEffect } from "react";
import FriendService from "../../services/FriendService";
import { useState } from "react";
import "./ShowSplittedBills.css";
import SplitBillService from "../../services/SplitBillService";

function ShowSplittedBills({userState}) {

    const [myFriendList, setMyFriendList] = useState([]);
    const [transactionProfileCard, setTransactionProfileCard] = useState([]);
    const [settleUpBillStateToggle, setSettleUpBillStateToggle] = useState(false);

    useEffect(() => {
        try {
            const getMyFriendList = async () => {
                const friendList = await FriendService.getFriendList(userState.email);
                setMyFriendList(friendList);
            }
            getMyFriendList();
        }
        catch {
            alert("Something went wrong.");
        }
    }, [userState]);

    useEffect(() => {
        try {
            let tempArray = [];
            myFriendList.forEach(async (friend) => {
                const friendsEmail = friend.email;
                const id = friendsEmail.localeCompare(userState.email) === 1 ? friendsEmail+userState.email : userState.email+friendsEmail;
                const splittedBillsOfCurrentFriend = await SplitBillService.getTransactionById(id);
                tempArray.push({
                    name: friend.name,
                    email: friend.email,
                    transactionId: id,
                    transaction: splittedBillsOfCurrentFriend
                });
            })
            setTransactionProfileCard(tempArray);
        }
        catch {
            alert("Something went wrong.");
        }
    }, [myFriendList, userState, settleUpBillStateToggle]);

    const setVisibility = (id) => {
        let element = document.getElementById(id);
        if(element.style.display === 'none') {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    }

    const settleUpBill = async (id, index) => {
        try {
            let transactionList = await SplitBillService.getTransactionById(id);
            transactionList[index] = {
                ...transactionList[index],
                isSettledUp: true
            }
            const response = await SplitBillService.updateTransaction(id, {
                transaction: transactionList
            });
            response ? alert("Marked as settled up expense.") : alert("Something went wrong.");
            setSettleUpBillStateToggle(prev => !prev);
        }
        catch {
            alert("Something went wrong.");
        }
    }

    return (
        <div>
            {
                myFriendList.length === 0 && <div>No friends to show.</div>
            }
            {
                transactionProfileCard.map((profileCard, index) => {
                    return (
                        <div key={index}>
                            <button id="friend-card" onClick={() => setVisibility(profileCard.email)}>
                                <div id="friend-card-name-email">
                                    <h3>{profileCard.name}</h3>
                                    <p style={{marginTop: '-10px'}}>{profileCard.email}</p>
                                </div>
                            </button>
                            <div className="friend-card-view-all-bills" id={profileCard.email} style={{display: 'none'}}>
                                {
                                    profileCard.transaction.length === 0 && "No bills to show."
                                }
                                {
                                    profileCard.transaction.map((transaction, index) => {
                                        return (
                                            <div className="profile-card-transaction" key={index}>
                                                <div style={{marginLeft: '20px', backgroundColor: '#bdcfd4'}}>
                                                    {transaction.date}
                                                </div>
                                                <div>
                                                    <h3>{transaction.expenseType[0].toUpperCase()+ transaction.expenseType.slice(1)}</h3>
                                                </div>
                                                <div>
                                                    {
                                                        `${transaction.paidBy}` === `${userState.email}` && `You lent ${transaction.amount.toFixed(2)} rupees`
                                                    }
                                                    {
                                                        `${transaction.paidBy}` !== `${userState.email}` && `You borrowed ${transaction.amount.toFixed(2)} rupees`
                                                    }
                                                </div>
                                                <div style={{marginRight: '20px'}}>
                                                    {
                                                        `${transaction.isSettledUp}` === 'true' && <button id="settled-button">Settled</button>
                                                    }
                                                    {
                                                        `${transaction.isSettledUp}` === 'false' && <button id="settle-up-button" onClick={() => { window.confirm("Are you sure?") && settleUpBill(profileCard.transactionId , index)}}>Settle Up</button>
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default ShowSplittedBills;