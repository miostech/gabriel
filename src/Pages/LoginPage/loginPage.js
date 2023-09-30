import "./loginPage.css";
import { Button, ConfigProvider, Form, Input, Select } from "antd";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dbData from "./db.json";

export default function LoginPage() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the JSON file using the fetch API
    console.log(dbData);
  }, []);
  const onSuccess = (values) => {
    console.log("Success:", values);
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
    </div>
  );
}
