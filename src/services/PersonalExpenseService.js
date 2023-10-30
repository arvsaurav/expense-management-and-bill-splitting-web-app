import axios from "axios";

const baseUrl = "https://split-bills-2jjh.onrender.com/personal-expense";

const createExpenseList = async (list) => {
    try {
        const response = await axios.post(baseUrl, list);
        const doesPersonalExpenseListCreated = response.status === 201 ? true : false;
        return doesPersonalExpenseListCreated;
    }
    catch {
        alert("Something went wrong.");
    }
}

const updateExpenseById = async (id, expense) => {
    try {
        const response = await axios.patch(baseUrl+'/'+id, expense);
        const doesPersonalExpenseListUpdated = response.status === 200 ? true : false;
        return doesPersonalExpenseListUpdated;
    }
    catch {
        alert("Something went wrong.");
    }
}

const getExpenseByExpenseType = async (id, expenseType) => {
    try {
        const response = await axios.get(baseUrl+'/'+id);
        return response.data[expenseType];
    }
    catch {
        alert("Something went wrong.");
    }
}

const getExpenseById = async (id) => {
    try {
        const response = await axios.get(baseUrl+'/'+id);
        return response.data;
    }
    catch {
        alert("Something went wrong.");
    }
}

const PersonalExpenseService = {
    createExpenseList,
    updateExpenseById,
    getExpenseByExpenseType,
    getExpenseById
}

export default PersonalExpenseService;