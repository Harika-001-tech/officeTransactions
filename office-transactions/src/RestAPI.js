const getTransactions = async () => {
    var response = await fetch("http://localhost:3001/transactions");
    const json = await response.json();
    return json;
};

const addTransaction = async (transaction) => {
    await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    });
};

export {
    getTransactions,
    addTransaction
};