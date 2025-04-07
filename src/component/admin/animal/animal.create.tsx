// import { handleCreateAnimalAction } from "@/services/animal"; // Giả định service
import { Modal, Input, Form, Row, Col, message, notification } from "antd";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const AnimalCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  // const onFinish = async (values: any) => {
  //   const res = await handleCreateAnimalAction(values);
  //   if (res?.data) {
  //     handleCloseCreateModal();
  //     message.success("Create animal succeed!");
  //   } else {
  //     notification.error({
  //       message: "Create Animal error",
  //       description: res?.message,
  //     });
  //   }
  // };

  return (
    <Modal
      title="Add new animal"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input animal name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: "Please input animal age!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Categories"
              name="categories"
              rules={[{ required: true, message: "Please input categories!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Habitats"
              name="habitats"
              rules={[{ required: true, message: "Please input habitats!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Conservations"
              name="conservations"
              rules={[
                {
                  required: true,
                  message: "Please input conservation status!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AnimalCreate;
