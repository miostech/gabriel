import "./homePage.css";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/video-page");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="home_page_container">
      <div className="home_page_box">
        <div className="home_page_content">
          <h1 className="home_page_title">Confime a sua presença</h1>
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
              label="Telefone"
              name="number"
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
              <Button type="primary" htmlType="submit" className="button">
                Enviar Confirmação
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
