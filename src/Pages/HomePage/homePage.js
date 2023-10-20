import "./homePage.css";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
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
import { useEffect } from "react";


export default function Home() {

  const {
    adicionarUsuario,
    deletarUsuario,
    getAllUsers,
    getByPhoneNumber,
    userByPhoneNumber
  } = useDataBaseContext();
  useEffect(() => {
    if (userByPhoneNumber.length > 0) {
      console.log("InEffect", userByPhoneNumber);
      navigate("/video-page"); 
    }

  }, [userByPhoneNumber]);
  const navigate = useNavigate();
  const onFinish = (values) => {

    

    console.log("Success:", values);
    getByPhoneNumber(values.number);
    /* adicionarUsuario(
      "joao",
      "joao",
      false,
      "joao",
      "joao",
      "joao"
    ) */



  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function validatePhoneNumber(rule, value, callback) {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length === 9) {

      const validPrefixes = ['91', '92', '93', '96'];
      const prefix = cleanedValue.slice(0, 2);

      if (validPrefixes.includes(prefix)) {
        callback();
      } else {
        callback('Por favor inisra um numero de telemovel portugues');
      }
    } else {
      callback('Por favor insira o seu numero de telemóvel válido.');
    }
  }
  return (
    <div className="home_page_container">
      <div className="home_page_box">
        <div className="home_page_content">
          <h1 className="home_page_title">Confirme a sua presença</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 400,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Telemóvel"
              name="number"
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
              wrapperCol={{
                offset: 5,
                span: 16,
              }}
            >
              <ConfigProvider theme={{ token: { colorPrimaryHover: "#5f021fd0" } }}>
                <Button type="primary" htmlType="submit" className="button">
                  Enviar Confirmação
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
