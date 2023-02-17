import React from "react";
import { Layout } from "antd";
import {
  InstagramOutlined,
  LinkedinOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.css";

const { Footer } = Layout;
const Footerr = () => {
  return (
    <Layout>
      <div style={{}}>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          CRUD Design ©2023 Created by Vijay saratkar
          <div>
            <InstagramOutlined /> <LinkedinOutlined /> <FacebookOutlined />
            <YoutubeOutlined
              style={{
                marginLeft: 5,
              }}
            />
          </div>
        </Footer>
      </div>
    </Layout>
  );
};
export default Footerr;
