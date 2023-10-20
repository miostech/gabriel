import { db } from "../index";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    onSnapshot,

} from "firebase/firestore";

import { createContext, useContext, useMemo, useState } from "react";

const DataBaseContext = createContext();
export const useDataBaseContext = () => useContext(DataBaseContext);

export default function DataBaseProvider({ children }) {
    const [usersAll, setUsersAll] = useState([]);
    const [userByPhoneNumber, setUserByPhoneNumber] = useState([]);
    const collectionRef = useMemo(() => collection(db, "users"), []);
    const adicionarUsuario = async (
        description,
        greatings,
        isGoing,
        name,
        phone,
        question
    ) => {
        try {
            const docRef = await addDoc(collectionRef, {
                description: description,
                greatings: greatings,
                is_going: isGoing,
                name: name,
                phone: phone,
                question: question,
            });
            console.log("Usuário adicionado com ID:", docRef.id);
            return docRef.id; // Retorne o ID do documento criado (opcional)
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
            throw error; // Você pode lançar o erro para lidar com ele posteriormente
        }
    };

    const deletarUsuario = async (userId) => {

        try {
            const docRef = doc(db, "users", userId);
            await deleteDoc(docRef);
            console.log("Usuário deletado com ID:", userId);
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            throw error;
        }
    };

    const getAllUsers = async () => {

        try {
            const data = await getDocs(collectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUsersAll(filteredData);
            console.log(usersAll)
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error);
            throw error;
        }
    };

    const getByPhoneNumber = async (phoneNumber) => {
        try {
            const queryPhoneNumber = query(collectionRef, where("phone", "==", phoneNumber));
            const snapshot = await getDocs(queryPhoneNumber);
            const docs = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUserByPhoneNumber(docs);
            console.log("InDB", userByPhoneNumber);
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error);
        }
        
    }
    // Get by phonenumber

    //Update User by id

    const contextBoxValues = {
        adicionarUsuario,
        deletarUsuario,
        getAllUsers,
        usersAll,
        getByPhoneNumber,
        userByPhoneNumber,
    };

    return (
        <DataBaseContext.Provider value={contextBoxValues}>
            {children}
        </DataBaseContext.Provider>
    );
}
