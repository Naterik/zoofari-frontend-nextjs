"use client";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authenticate } from "@/services/action";
import ModelReactive from "./modal.reactive";
import { useState } from "react";
import ModalChangePassword from "./modal.change.password";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setUserEmail("");
    const res = await authenticate(username, password);
    if (res?.error) {
      if (res.code === 2) {
        notification.error({
          message: "Tài khoản chưa kích hoạt",
          description: "Vui lòng kích hoạt tài khoản",
        });
        setIsModalOpen(true);
        setUserEmail(username);
      } else if (res.code === 1) {
        notification.error({
          message: "Đăng nhập thất bại",
          description: "Email hoặc mật khẩu không đúng",
        });
      } else {
        notification.error({
          message: "Lỗi hệ thống",
          description: "Vui lòng thử lại sau",
        });
      }
    } else if (res?.success) {
      notification.success({
        message: "Đăng nhập thành công",
        description: "Chuyển hướng đến dashboard...",
      });
      router.push("/dashboard");
    }
  };

  return (
    <>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <legend>Đăng Nhập</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
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

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                  <Button
                    type="link"
                    htmlType="submit"
                    onClick={() => setChangePassword(true)}
                  >
                    Quên mật khẩu ?
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <Link href={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Chưa có tài khoản?{" "}
              <Link href={"/auth/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
      <ModelReactive
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userEmail={userEmail}
      />
      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />
    </>
  );
};

export default Login;
