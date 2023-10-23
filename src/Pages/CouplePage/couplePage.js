import "./couplePage.css"
import React, { useEffect } from "react";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import { useDataBaseContext } from "../../database/teste";
export default function CouplePage() {
  const { getAllUsers, usersAll } = useDataBaseContext();

  useEffect(() => {
    getAllUsers();
  }, []);
  function onFinish(values) {
    console.log(values);
  }
  function onFinishFailed(values) {
    console.log(values);
  }
  return (
    <>
      <h2>Vamos convidar os nossos convidados!</h2>
      <div className="home_page_box">
        <div className="home_page_content">
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
                  message:
                    "Por favor insira o seu numero de telemovel antes de continuar",
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
                  Enviar Confirmação
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
        <div>
          {/* <div style={{ display: "flex", flexDirection: "column" , justifyContent: "center", alignItems: "center", gap: "10px", border: "1px solid black"}}>
            {usersAll.map((user) => (
              <div key={user.id}>{user.name + " " + user.phone}</div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}
