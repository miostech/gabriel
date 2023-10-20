import "./couplePage.css"
import React from "react";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
export default function CouplePage() {
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
            getAllUsers
        </div>
      </div>
    </>
  );
}
