import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    // Load from localStorage on first render
    const [transactions, setTransactions] = useState(() => {
        const localData = localStorage.getItem("transactions");
        return localData ? JSON.parse(localData) : [];
    });

    // Sync to localStorage whenever transactions update
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (transaction) => {
        setTransactions((prev) => [...prev, transaction]);
    };

    const deleteTransaction = (id) => {
        setTransactions((prev) =>
            prev.filter((transaction) => transaction.id !== id)
        );
    };

    return (
        <GlobalContext.Provider
            value={{ transactions, addTransaction, deleteTransaction }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
