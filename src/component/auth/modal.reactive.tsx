"use client";

import { sendRequest } from "@/utils/api";
import { useHasMounted } from "@/utils/customHook";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, notification, Steps } from "antd";
import { useEffect, useState } from "react";

const ModelReactive = (props: any) => {
  const { isModalOpen, setIsModalOpen, userEmail } = props;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const hasMounted = useHasMounted();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (userEmail) {
      form.setFieldsValue({ email: userEmail });
    }
  }, [userEmail, form]);

  const onFinishStep0 = async (values: any) => {
    const { email } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
      method: "POST",
      body: {
        email,
      },
    });
    if (res?.data) {
      setUserId(res.data?.id);
      setCurrent(1);
    } else {
      notification.error({
        message: "Gửi lại thất bại",
        description: res.error,
      });
    }
  };
  const onFinishStep1 = async (values: any) => {
    const { code } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
      method: "POST",
      body: {
        id: userId,
        code,
      },
    });
    if (res?.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: "Code không hợp lệ",
        description: res.error,
      });
    }
  };

  if (!hasMounted) return null;

  return (
    <Modal
      title="Kích hoạt tài khoản"
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      maskClosable={false}
      footer={null}
    >
      <Steps
        current={current}
        items={[
          { title: "Login", icon: <UserOutlined /> },
          { title: "Verification", icon: <SolutionOutlined /> },
          { title: "Done", icon: <SmileOutlined /> },
        ]}
      />
      {current === 0 && (
        <div style={{ marginTop: "20px 0px" }}>
          <p>Tài khoản chưa được kích hoạt</p>
          <Form
            name="basic"
            autoComplete="off"
            layout="vertical"
            form={form}
            onFinish={onFinishStep0}
          >
            <Form.Item name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Resend
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {current === 1 && (
        <div style={{ marginTop: "20px 0px" }}>
          <p>Xác thực email của bạn</p>
          <Form
            name="verification"
            autoComplete="off"
            layout="vertical"
            onFinish={onFinishStep1}
            form={form}
          >
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Active
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {current === 2 && (
        <div style={{ marginTop: "20px 0px" }}>
          <p>Tài khoản của bạn đã được kích hoạt thành công!</p>
        </div>
      )}
    </Modal>
  );
};

export default ModelReactive;
