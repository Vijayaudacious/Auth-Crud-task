import { Button, Form, Input, Card, message } from "antd";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(`https://reqres.in/api/login`, values);
      Cookies.set("token", data.token);
      if (
        data.token === "QpwL5tke4Pnpja7X4" &&
        values.email === "eve.holt@reqres.in" &&
        values.password === "cityslicka"
      ) {
        navigate("/");
        message.success("Successfuly login");
        console.log("right id password");
      } else {
        message.error("Please enter correct email or password");
      }
    } catch (error) {
      message.error("Please enter correct email or password");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <Card
        title={
          <>
            <img
              src="https://assets.website-files.com/5ff66329429d880392f6cba2/61c323afb777801522775611_CRUD%20%20Preview.png"
              alt="login logo"
              style={{ width: "7rem" }}
            />{" "}
            <h7 style={{ marginRight: "7rem" }}>LOGIN FORM</h7>
          </>
        }
        bordered
        hoverable
        style={{ width: 370 }}
      >
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
            marginTop: 10,
            marginRight: 40,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Email is not valid"
              },
            ]}
          >
            <Input placeholder="Enter your Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
              { min: 8, message: "Required min 8 character" },
              { max: 10, message: "Required max 10 character" },
            ]}
          >
            <Input.Password placeholder="Enter your Password" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: 110,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
