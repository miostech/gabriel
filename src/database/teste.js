import { db, auth } from "../index";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { createContext, useContext, useState } from "react";

const DataBaseContext = createContext();
export const useDataBaseContext = () => useContext(DataBaseContext);

export default function DataBaseProvider({ children }) {
  const [usersAll, setUsersAll] = useState([]);
  const [userByPhoneNumber, setUserByPhoneNumber] = useState([]);
  const [error, setError] = useState("");
  const collectionRef = collection(db, "users");

  const addUser = async (description, greatings, name, phone) => {
    try {
      const docRef = await addDoc(collectionRef, {
        description: description,
        greatings: greatings,
        is_going: false,
        name: name,
        phone: phone,
        question: "",
        is_confirmed: 0,
      });
      console.log("Usuário adicionado com ID:", docRef.id);
      return docRef.id; // Retorne o ID do documento criado (opcional)
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      throw error; // Você pode lançar o erro para lidar com ele posteriormente
    }
  };

  const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
      const data = await getDocs(collectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (filteredData.length === 0) {
        reject("erro ao procurar utilizadores ou nao existe");
      } else {
        resolve(filteredData);
      }
    });
  };

  const getByPhoneNumber = (phoneNumber) => {
    return new Promise(async (resolve, reject) => {
      const queryPhoneNumber = query(
        collectionRef,
        where("phone", "==", phoneNumber)
      );
      const snapshot = await getDocs(queryPhoneNumber);
      console.log("snapshot", snapshot);
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(docs.length);
      if (docs.length === 0) {
        reject("erro ao procurar o numero");
        setError("erro ao procurar o numero");
      } else {
        resolve(docs);
      }
    });
  };
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser.email);
      if (auth) {
        let userLogedIn = {
          uuid: auth.currentUser.uid,
          email: auth.currentUser.email,
        };
        localStorage.setItem("coupleData", JSON.stringify(userLogedIn));
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setError("Password ou email errado");
    }
  };

  const updateGuest = async (id, is_going) => {
    return new Promise(async (resolve, reject) => {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, { is_going: is_going, is_confirmed: 1 })
        .then(() => {
          resolve("success");
        })
        .catch(() => {
          reject("not updated");
        });
    });
  };

  const addQuestion = async (id, question) => {
    return new Promise(async (resolve, reject) => {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, { question: question })
        .then(() => {
          resolve("success");
        })
        .catch(() => {
          reject("not updated");
        });
    });
  };

  const deleteQuestion = async (id) => {
    return new Promise(async (resolve, reject) => {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, { question: "" })
        .then(() => {
          resolve("success");
        })
        .catch(() => {
          reject("not updated");
        });
    });
  };

  const deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
      const docRef = doc(db, "users", userId);
      await deleteDoc(docRef);
      resolve("Usuário deletado com ID:", userId);
    });
  };

  const contextBoxValues = {
    addUser,
    deleteUser,
    getAllUsers,
    usersAll,
    getByPhoneNumber,
    userByPhoneNumber,
    signIn,
    error,
    setError,
    updateGuest,
    addQuestion,
    deleteQuestion
  };

  return (
    <DataBaseContext.Provider value={contextBoxValues}>
      {children}
    </DataBaseContext.Provider>
  );
}
