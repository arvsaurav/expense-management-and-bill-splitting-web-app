import axios from "axios";

const baseUrl = "http://localhost:3001/user";

const addUser = async (user) => {
    try {
        const response = await axios.post(baseUrl, user);
        const doesUserAdded = response.status === 201 ? true : false;
        return doesUserAdded;
    }
    catch {
        alert("Something went wrong.");
    }
}

const getAllUsers = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    }
    catch {
        alert("Something went wrong.");
    }
}

const getUserById = async (id) => {
    try {
        const response = await axios.get(baseUrl+'/'+id);
        return response.data;
    }
    catch(err) {
        if(err.response.status === 404) {
            return {};
        }
        else {
            alert("Something went wrong.");
        }
    }
}

const updateUser = async (id, user) => {
    try {
        const response = await axios.patch(baseUrl+'/'+id, user);
        const doesUserUpdated = response.status === 200 ? true : false;
        return doesUserUpdated;
    }
    catch {
        alert("Something went wrong.");
    }
}

const UserService = {
    addUser,
    getAllUsers,
    getUserById,
    updateUser
}

export default UserService;