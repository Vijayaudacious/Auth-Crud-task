import axios from "axios";
import styles from "./styles.module.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { message, Form, Input, Button, Card } from "antd";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const Create = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://63bd0c7afa38d30d85d7791e.mockapi.io/crud", {
        e_name: name,
        e_age: age,
        e_email: email,
      })
      .then(() => {
        navigate("/");
        message.success("successfuly add data");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <Card
          title={
            <>
              <div>
                <Link to="/">
                  <p className="btn">
                    <ArrowLeftOutlined /> Data List
                  </p>
                </Link>
              </div>
            </>
          }
          bordered
          hoverable
          style={{ width: 370, marginTop: 10 }}
        >
          <div className="p4 text-center">
            <h3>Add Data</h3>
            <hr />
          </div>
          <form 
            {...layout}
            name="register"
           onSubmit={handleSubmit}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name={["user", "name"]}
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
              ]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              name={["age"]}
              label="Age"
              rules={[
                {
                  type: "number",
                  min: 0,
                  max: 99,
                },
                {
                  required: true,
                  message: "Age is required",
                },
              ]}
            >
              <Input onChange={(e) => setAge(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 130 }}
                value="submit"
              >
                Add Data
              </Button>
            </Form.Item>
            {/* <div className="d-grid">
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-primary"
                  />
                </div> */}
          </form>
        </Card>
      </div>
    </>
  );
};

export default Create;
