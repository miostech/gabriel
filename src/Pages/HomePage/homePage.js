import "./homePage.css";
import { Button, Checkbox, ConfigProvider, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { db } from "../../index";
import { useDataBaseContext } from "../../database/teste";
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
import { useEffect, useState } from "react";

export default function Home() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { getByPhoneNumber, userByPhoneNumber, updateGuest, error } =
    useDataBaseContext();
  const [isGoing, setIsGoing] = useState(null);
  useEffect(() => {
    /*  if (userData) {
      navigate("/guest-page");
    } else if (userByPhoneNumber.length > 0) {
      console.log("InEffect", userByPhoneNumber);
      console.log(isGoing);
      updateGuest(userByPhoneNumber[0].id, isGoing);
      if (userData) {
        navigate("/guest-page");
      } else {
        localStorage.setItem("userData", JSON.stringify(userByPhoneNumber[0]));
        navigate("/guest-page");
      }
    } */
  }, [userByPhoneNumber]);
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    getByPhoneNumber(values.phone)
      .then((data) => {
        console.log("inPromise", data[0]);
        if(data.length > 0){
          updateGuest(data[0].id, values.is_going);
        }
        localStorage.setItem("userData", JSON.stringify(data[0]));
        navigate("/guest-page");
      })
      .catch((er) => {
        console.log(er);
        onFinishFailed(er);
      });
    setIsGoing(values.is_going);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function validatePhoneNumber(rule, value, callback) {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length === 9) {
      const validPrefixes = ["91", "92", "93", "96"];
      const prefix = cleanedValue.slice(0, 2);

      if (validPrefixes.includes(prefix)) {
        callback();
      } else {
        callback("Por favor inisra um numero de telemovel portugues");
      }
    } else {
      callback("Por favor insira o seu numero de telemóvel válido.");
    }
  }
  return (
    <div className="home_page_container">
      <div className="home_page_box">
        <div className="home_page_content">
          <h1 className="home_page_title">Confirme a sua presença</h1>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Telemóvel"
              name="phone"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor insira o seu numero de telemovel antes de continuar",
                },
                {
                  validator: validatePhoneNumber,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Vais ao nosso casamento?"
              name="is_going"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor insira o seu numero de telemovel antes de continuar",
                },
              ]}
            >
              <Select
                defaultValue=""
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: false,
                    label: "Não",
                  },
                  {
                    value: true,
                    label: "Sim",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 5,
                span: 16,
              }}
            >
              <ConfigProvider
                theme={{ token: { colorPrimaryHover: "#5f021fd0" } }}
              >
                <Button type="primary" htmlType="submit" className="button">
                  Enviar Confirmação
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
          {error && (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 style={{ color: "red" }}>Erro ao inserir numero</h3>
              <div style={{ color: "red" }}>{error}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
