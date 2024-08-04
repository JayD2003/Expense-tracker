import { useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

//custom hook to get transaction info from server
export const useGetTransactions = () => {

    // used usestate to update the transactions from server
    const [transactions, setTransactions] = useState([]);
    //for getting the balance and other totals from data
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0,
    });

    //connection for the server and collections
    const transactionCollectionRef = collection(db, "transactions");
    const {userID} = useGetUserInfo();

    //function to get the info from server
    const getTransactions = async () => {
        //created the intialization outside of the try block
        //as we need to run this function at every time we return
        let unsubsribe;
        try {
            // query for getting data
            const queryTransactions = query(transactionCollectionRef, 
                where("userID", "==", userID),
                orderBy("createdAt")
            );

            // snapshot of the data and retrieving daata
            unsubsribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpenses = 0;

                //iterating through every collection in the database
                //getting the document data and adding it into list of data
                snapshot.forEach((doc) => {
                    // data and its id
                    const data = doc.data();
                    const id = doc.id;
                    //pushing data
                    // three dots ... used for to push the whole array into it as key pair
                    docs.push({...data, id});

                    //getting the expenses and income total
                    if(data.transactionType === "expense") {
                        totalExpenses += Number(data.transactionAmount);
                    }else{
                        totalIncome += Number(data.transactionAmount);
                    }

                });

                // setting transactions for return
                setTransactions(docs);

                //setting the transaction totals
                let balance = totalIncome - totalExpenses;
                setTransactionTotals({
                    balance,
                    expenses: totalExpenses,
                    income: totalIncome,
                });
            });
        } catch (err) {
            console.error(err);
        }

        //running the function to get data
        return () => unsubsribe();
    };

    useEffect(() => {
        //will be used every single time when there is some effect
        getTransactions();
    });

    //returing the transaction data and totals
    return { transactions , transactionTotals };
};