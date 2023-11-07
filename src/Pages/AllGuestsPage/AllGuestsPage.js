import "./AllGuestsPage.css";

import React, { useEffect, useState } from "react";
import { useDataBaseContext } from "../../database/teste";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function AllGuestsPage() {
  const { getAllUsers, deleteUser } = useDataBaseContext();
  const [usersAll, setUsersAll] = useState([])
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("coupleData"));
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      getAllUsers().then((data)=>{
        setUsersAll(data)
      }).catch((er)=>{
        console.log(er)
      });
    }
  }, [loggedIn]);
  return (
    <div className="guests_container">
      <h1>Convidados</h1>
      <div>
        {usersAll.map((user) => (
          <>
            <div key={user.id} className="guests_box">
              <div>
                <div>
                  <strong>Nome: </strong>
                  {user.name}
                </div>
                <div>
                  <strong>Telemovel: </strong>
                  {user.phone}
                </div>
              </div>
              <div>
                <div>
                  <strong>Descrição: </strong>
                  {user.description}
                </div>
                <div>
                  <strong>Boas Vindas: </strong>
                  {user.greatings}
                </div>
              </div>
              <div>
                <strong>Vai? : </strong>
                {user.is_confirmed === 0
                  ? "Nao sabemos"
                  : user.is_confirmed === 1 && user.is_going === false
                  ? "Não"
                  : "Sim"}
              </div>
              <Button
                type="primary"
                className="button"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Apagar Convidado
              </Button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
