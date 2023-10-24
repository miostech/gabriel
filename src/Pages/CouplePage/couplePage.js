import "./couplePage.css";
import React, { useEffect } from "react";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import { useDataBaseContext } from "../../database/teste";

export default function CouplePage() {
  const { addUser, usersAll, getAllUsers } = useDataBaseContext();
  useEffect(() => {
    getAllUsers();
  }, []);
  function onFinish(values) {
    console.log(values);
    addUser(values.description, values.greatings, values.name, values.phone);
    getAllUsers();
  }
  function onFinishFailed(values) {
    console.log(values);
  }
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
    <>
      <h2>Vamos convidar os nossos convidados!</h2>
      <div className="couple_page_box">
        <div className="couple_page_content">
          <Form
            name="basic"
            layout="vertical"
            style={{
              maxWidth: 300,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Nome do Convidado"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Inisira o nome do convidado",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Dar as boas vindas!"
              name="greatings"
              rules={[
                {
                  required: true,
                  message: "Inisira as boas vindas do convidado",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="O que mais gostas dessa pessoa?"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Inisira a descrição do convidado",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="O numero de telemovel"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Inisira o numero de telemovel do convidado",
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
              <ConfigProvider
                theme={{ token: { colorPrimaryHover: "#5f021fd0" } }}
              >
                <Button type="primary" htmlType="submit" className="button">
                  Adicionar Convidado
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
        <div>
          <div>
            <h1>Convidados</h1>
            <div>
              {usersAll.map((user) => (
                <div key={user.id}>
                  <div>{user.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
