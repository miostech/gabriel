import "./couplePage.css";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import { useDataBaseContext } from "../../database/teste";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";

export default function CouplePage() {
  const { addUser, usersAll, getAllUsers, deleteUser } = useDataBaseContext();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("coupleData"));
  const [form] = Form.useForm();
  const targetDate = new Date("2024-02-04T16:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const currentDate = new Date().getTime();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      getAllUsers();
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [form, loggedIn]);
  const onReset = () => {
    form.resetFields();
  };
  function onFinish(values) {
    console.log(values);
    addUser(values.description, values.greatings, values.name, values.phone);
    getAllUsers();
    form.resetFields();
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
    <div className="countainer_couple">
      <div className="countdownTimerContainer">
        <h2>Countdown Timer</h2>
        <div className="countdownTimer">
          <div>{timeLeft.days} Dias</div>
          <div>{timeLeft.hours} Horas</div>
          <div>{timeLeft.minutes} Minutos</div>
          <div>{timeLeft.seconds} Segundos</div>
        </div>
      </div>
      <div className="couple_page_box">
        <div className="couple_page_content">
          <Form
            name="basic"
            layout="vertical"
            form={form}
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
            <Form.Item>
              <ConfigProvider
                theme={{ token: { colorPrimaryHover: "#5f021fd0" } }}
              >
                <Button type="primary" htmlType="submit" className="button">
                  Adicionar Convidado
                </Button>
              </ConfigProvider>
            </Form.Item>
            <Form.Item>
              <ConfigProvider
                theme={{ token: { colorPrimaryHover: "#5f021fd0" } }}
              >
                <Button type="primary" className="button" onClick={onReset}>
                  Reset
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
        <div>
          <div className="guests_container">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <h1>Convidados</h1>
              <Link to={"/allguests"}>Ver Todos os Convidados Confirmados</Link>
            </div>

            <div>
              {usersAll.map((user) => (
                <>
                  <div key={user.id} className="guests_box">
                    <div>
                      <div>
                        <strong>Nome: </strong>
                        {user.name}
                      </div>
                      <div>
                        <strong>Telemovel: </strong>
                        {user.phone}
                      </div>
                    </div>
                    <div>
                      <div>
                        <strong>Descrição: </strong>
                        {user.description}
                      </div>
                      <div>
                        <strong>Boas Vindas: </strong>
                        {user.greatings}
                      </div>
                    </div>
                    <Button
                      type="primary"
                      className="button"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      Apagar Convidado
                    </Button>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
