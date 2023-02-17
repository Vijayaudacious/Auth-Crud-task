import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { message, Form, Input, Button, Card } from "antd";

const Edit = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setAge(localStorage.getItem("age"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://63bd0c7afa38d30d85d7791e.mockapi.io/crud/${id}`, {
        e_name: name,
        e_age: age,
        e_email: email,
      })
      .then(() => {
        message.success("Successfully Updated");
        navigate("/");
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
              <Link to="/">
                <button className="btn" style={{ marginLeft: 2 }}>
                  <ArrowLeftOutlined /> Data List
                </button>
              </Link>
              {/* <h7 style={{ marginRight: "7rem" }}>Update Data</h7> */}
            </>
          }
          bordered
          hoverable
          style={{ width: 370 }}
        >
          <div
            className={styles.form}
            style={{ width: "46vh", height: "60vh" }}
          >
            <div className="p4 text-center">
              <h3>Update Data</h3>
              <hr />
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <Form.Item>
                  Name:
                  <Input
                    type="text"
                    placeholder="Enter name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item>Email: 
                <Input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                /></Form.Item>
              </div>
              <div className="form-group">
                <Form.Item>Age: 
                <Input
                  type="number"
                  placeholder="Enter Age"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                /></Form.Item>
              </div>

              <br />
              <div className="grid text-center">
                <Button
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                >Save</Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Edit;
