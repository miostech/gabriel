import React from "react";
import "./AllQuestionsPage.css";
import { useDataBaseContext } from "../../database/teste";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function AllQuestionsPage() {
  const { addUser, getAllUsers, deleteUser } = useDataBaseContext();
  const [usersAll, setUsersAll] = React.useState([]);
  React.useEffect(() => {
    getAllUsers()
      .then((data) => {
        const usersWithQuestions = data.filter(
          (user) => user.question.trim() !== ""
        );
        setUsersAll(usersWithQuestions);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);
  return (
    <>
      <div>
        <div className="question_guests_container">
          {usersAll.length === 0 ? (
            <>
              <div style={{ fontSize: 100, color: "#5f021fd0", marginTop:"10rem" }}>
                <LoadingOutlined />
              </div>
            </>
          ) : (
            usersAll.map((user) => (
              <>
                <div key={user.id} className="question_guests_box">
                  <div>
                    <strong>De:</strong> {user.name}
                  </div>
                  <div>
                    <strong>Pergunta:</strong> {user.question}
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
}
