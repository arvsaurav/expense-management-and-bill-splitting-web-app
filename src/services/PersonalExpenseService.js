import axios from "axios";

const baseUrl = "http://localhost:3001/personal-expense";

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

const PersonalExpenseService = {
    createExpenseList,
    updateExpenseById,
    getExpenseByExpenseType
}

export default PersonalExpenseService;