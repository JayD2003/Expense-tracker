import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db} from '../config/firebase-config';
import {useGetUserInfo} from './useGetUserInfo';


//created custom hook to give function to send data to the server
export const useAddTransaction = () => {

    // initialized the connection
    const transactionCollectionRef = collection(db, "transactions");

    // info from user
    const {userID} = useGetUserInfo();

    //connection to send the data to the server
    // used async 
    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType
    }
    ) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        });
    }

    //returing the hook function
    return { addTransaction };
}