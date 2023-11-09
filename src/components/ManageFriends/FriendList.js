import FriendService from "../../services/FriendService";
import SplitBillService from "../../services/SplitBillService";
import "./ManageFriends.css";

function FriendList({ userState, friendList, setFriendList, setFriendsCount }) {

    const removeFriend = async (friendsName, friendsEmail) => {
        try {
            // removing friendsEmail from 'loggedIn user' friend list
            let updatedFriendList = friendList.filter((friend) => friend.email !== friendsEmail);
            const response1 = await FriendService.updateFriendList(userState.email, {
                friendList: updatedFriendList
            });
            // updating friend list to be rendered on the screen
            setFriendList(updatedFriendList);
            setFriendsCount((prev) => prev-1);
            
            // removing loggedIn user from 'friendsEmail' friend list
            const otherUserFriendList = await FriendService.getFriendList(friendsEmail);
            updatedFriendList = otherUserFriendList.filter((friend) => friend.email !== userState.email);
            const response2 = await FriendService.updateFriendList(friendsEmail, {
                friendList: updatedFriendList
            });

            // deleting transaction between user and friend
            let id = friendsEmail.localeCompare(userState.email) === 1 ? friendsEmail+userState.email : userState.email+friendsEmail;
            const response3 = await SplitBillService.deleteTransaction(id);

            response1 && response2 && response3 ? alert(`${friendsName} has been removed from the friend list. All the transactions between you and ${friendsName} is deleted.`) : alert("Something went wrong.");
        }
        catch {
            alert("Something went wrong.");
        }
    }
    
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                {
                    friendList.map((friend, index) => {
                        return (
                            <tr key={index}>
                                <td>{friend.name} </td>
                                <td>{friend.email}</td>
                                <td><button className="remove-button" onClick={() => { window.confirm(`All the transactions between you and ${friend.name} will be deleted. Do you still want to continue?`) && removeFriend(friend.name, friend.email)}}>Remove</button></td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

export default FriendList;