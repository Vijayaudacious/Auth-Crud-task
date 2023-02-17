import { useEffect, useState } from "react";
import Footerr from "../Footer/Footer";
import Link from "antd/es/typography/Link";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Table, Tooltip, Button, Modal, message } from "antd";

const { confirm } = Modal;
const Read = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [apiData, setApiData] = useState([]);
  console.log("apiData", apiData);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  function getData() {
    axios
      .get("https://63bd0c7afa38d30d85d7791e.mockapi.io/crud")
      .then((response) => {
        setApiData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
     // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  function setDataStorage(id, name, age, email) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);
    localStorage.setItem("email", email);
  }

  const logout = async () => {
     Cookies.remove("token");
    navigate("/login");
  };

  function handleDelete(id) {
    axios
      .delete(`https://63bd0c7afa38d30d85d7791e.mockapi.io/crud/${id}`)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEdit = (item) => {
    setDataStorage(item.id, item.e_name, item.e_age, item.e_email);
    navigate(`/edit`);
  };
  const Onclick = () => {
    navigate("/create");
  };

  const columns = [
    {
      title: "ID No.",
      dataIndex: "id",
      width: "7%",
    },
    {
      title: "Name",
      dataIndex: "e_name",
      dataSource: "e_name",
      width: "20%",
      render: (e_name) => {
        return <>{e_name?.charAt(0).toUpperCase() + e_name?.slice(1)}</>;
      },
    },
    {
      title: "Age",
      dataIndex: "e_age",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "e_email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <>
            <>
              <Link to="/edit">
                <Tooltip title="Edit">
                  <Button
                    icon={<EditOutlined />}
                    className={styles.editBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                  ></Button>
                </Tooltip>
              </Link>
              <Tooltip title="Delete">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    confirm({
                      title: "Do you want to remove this role?",
                      icon: <ExclamationCircleFilled />,
                      async onOk() {
                        try {
                          return await new Promise((resolve, reject) => {
                            handleDelete(item.id);
                            setTimeout(
                              Math.random() > 0.5 ? resolve : reject,
                              1000
                            );
                          });
                        } catch
                         {
                          return await 
                          // message.warning("Something went a worng");
                          console.log("Something went a worng");
                        }
                      },
                      onCancel() {},
                    });
                  }}
                ></Button>
              </Tooltip>
            </>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className={styles.header}>
        <img
          src="https://assets.website-files.com/5ff66329429d880392f6cba2/61c323afb777801522775611_CRUD%20%20Preview.png"
          alt="Logo"
          style={{ marginRight: "38rem", width: "8rem" }}
        />
        <Button
          type="primary"
          style={{ margin: "1rem", left: "17rem" }}
          ghost
          onClick={Onclick}
        >
          Add Data
        </Button>
        <Button
          danger
          icon={<PoweroffOutlined />}
          onClick={() => logout()}
          style={{ margin: "1rem 11rem", left: "6rem" }}
        >
          Logout
        </Button>
      </div>
      <div
        style={{ marginTop: "7rem", marginRight: "6rem", marginLeft: "6rem" }}
      >
        <Table
        style={{marginBottom: "96px"}}
          columns={columns}
          dataSource={apiData}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
      <div className={styles.footerr}>
        <Footerr />
      </div>
    </>
  );
};
export default Read;
