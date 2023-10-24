import "./loginPage.css";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { useDataBaseContext } from "../../database/teste";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [data, setData] = useState([]);
  const { signIn, error, setError } = useDataBaseContext();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("coupleData"));
  useEffect(() => {
    if (loggedIn) {
      navigate("/couple-page");
    }
  }, [loggedIn]);
  const onSuccess = (values) => {
    console.log("Success:", values);
    signIn(values.email, values.password);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login_page_container">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onSuccess}
        onChange={() => setError("")}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Poe o teu email completo",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 9,
            span: 16,
          }}
        >
          <ConfigProvider theme={{ token: { colorPrimaryHover: "#5f021fd0" } }}>
            <Button type="primary" htmlType="submit" className="button">
              Entrar
            </Button>
          </ConfigProvider>
        </Form.Item>
      </Form>
      {error && (
        <>
          <h3>Erro ao logar</h3>
          <div>{error}</div>
        </>
      )}
    </div>
  );
}
