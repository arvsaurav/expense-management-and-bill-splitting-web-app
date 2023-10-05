function FriendList({friendList}) {
    
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                {
                    friendList.map((friend, index) => {
                        return (
                            <tr key={index}>
                                <td>{friend.name} </td>
                                <td>{friend.email}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

export default FriendList;