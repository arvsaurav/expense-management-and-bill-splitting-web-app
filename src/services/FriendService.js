import axios from "axios";

const baseUrl = "http://localhost:3001/friend";

const createFriendList = async (body) => {
    try {
        const response = await axios.post(baseUrl, body);
        const doesFriendListCreated = response.status === 201 ? true : false;
        return doesFriendListCreated;
    }
    catch {
        alert("Something went wrong.");
    }
}

const getFriendList = async (id) => {
    try {
        const response = await axios.get(baseUrl+'/'+id);
        return response.data.friendList;
    }
    catch {
        alert("Something went wrong.");
    }
}

const updateFriendList = async (id, friendList) => {
    try {
        const response = await axios.patch(baseUrl+'/'+id, friendList);
        const doesFriendListUpdated = response.status === 200 ? true : false;
        return doesFriendListUpdated;
    }
    catch {
        alert("Something went wrong.");
    }
}

const FriendService = {
    createFriendList,
    getFriendList,
    updateFriendList
}

export default FriendService;