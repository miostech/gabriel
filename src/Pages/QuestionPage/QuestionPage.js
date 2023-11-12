import React from "react";
import "./QuestionPage.css";
import { useNavigate } from "react-router-dom";
import { Form, Input, ConfigProvider, Button } from "antd";
import { useDataBaseContext } from "../../database/teste";
import { LoadingOutlined } from "@ant-design/icons";

export default function QuestionPage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { getByPhoneNumber, addQuestion, error, deleteQuestion } =
    useDataBaseContext();
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const deleteQuestionInPage = (id, phone) => {
    setLoading(true);
    deleteQuestion(id)
      .then(() => {
        getByPhoneNumber(phone)
          .then((data) => {
            localStorage.setItem("userData", JSON.stringify(data[0]));
            setLoading(false);
          })
          .catch((er) => {
            console.log(er);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);
    addQuestion(userData.id, values.question)
      .then(() => {
        getByPhoneNumber(userData.phone)
          .then((data) => {
            localStorage.setItem("userData", JSON.stringify(data[0]));
            setLoading(false);
            form.resetFields();
          })
          .catch((er) => {
            console.log(er);
            onFinishFailed(er);
            setLoading(false);
            form.resetFields();
          });
      })
      .catch((err) => {
        onFinishFailed(err);
        setLoading(false);
        form.resetFields();
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    form.resetFields();
  };

  React.useEffect(() => {
    console.log(userData);
    if (!userData) {
      navigate("/");
    }
  }, [userData]);
  return (
    <>
      <div className="question_container">
        <div>
          <ConfigProvider theme={{ token: { colorPrimaryHover: "#5f021fd0" } }}>
            <Button
              type="primary"
              className="button"
              disabled={loading}
              onClick={() => {
                navigate("/");
              }}
            >
              Ir para a página principal
            </Button>
          </ConfigProvider>
          <p>
            Bem-vindo à página onde podes colocar a pergunta queres fazer aos
            noivos!
          </p>
          <p>
            Aqui podes mandar-nos a tua pergunta, bem como a veres e apagares.
            Ela vai ser lida depois da cerimónia para todos, portanto não és
            obrigado a participar neste jogo, {userData.name} 😀
          </p>
        </div>
        {userData.question ? (
          <div>
            <div className="question_page_box">
              <p>{userData.question}</p>
              <ConfigProvider
                theme={{ token: { colorPrimaryHover: "#5f021fd0" } }}
              >
                <Button
                  type="primary"
                  className="button"
                  disabled={loading}
                  onClick={() => {
                    deleteQuestionInPage(userData.id, userData.phone);
                  }}
                >
                  {loading ? <LoadingOutlined /> : "Apagar Pergunta"}
                </Button>
              </ConfigProvider>
            </div>
          </div>
        ) : (
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Põe aqui a tua pergunta!"
              name="question"
              rules={[
                {
                  required: true,
                  message: "Por favor insere primeiro a tua pergunta",
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button"
                  disabled={loading}
                >
                  {loading ? <LoadingOutlined /> : "Enviar Pergunta"}
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        )}
      </div>
    </>
  );
}
