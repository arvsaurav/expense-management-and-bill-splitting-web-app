import axios from "axios";

const baseUrl = "http://localhost:3001/group-expense";

const createTransaction = async (transactionList) => {
    try {
        const response = await axios.post(baseUrl, transactionList);
        const doesTransactionListCreated = response.status === 201 ? true : false;
        return doesTransactionListCreated;
    }
    catch {
        alert("Something went wrong.");
    }
}

const deleteTransaction = async (id) => {
    try {
        const response = await axios.delete(baseUrl+'/'+id);
        const doesTransactionDeleted = response.status === 200 ? true : false;
        return doesTransactionDeleted;
    }
    catch {
        alert("Something went wrong.");
    }
}

const updateTransaction = async (id, transactionList) => {
    try {
        const response = await axios.patch(baseUrl+'/'+id, transactionList);
        const doesTransactionUpdated = response.status === 200 ? true : false;
        return doesTransactionUpdated;
    }
    catch {
        alert("Something went wrong.");
    }
}

const getTransactionById = async (id) => {
    try {
        const response = await axios.get(baseUrl+'/'+id);
        return response.data.transaction;
    }
    catch {
        alert("Something went wrong.");
    }
}

const SplitBillService = {
    createTransaction,
    deleteTransaction,
    updateTransaction,
    getTransactionById
}

export default SplitBillService;