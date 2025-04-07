// import { handleUpdateAnimalAction } from "@/services/animal"; // Giả định service
import { Modal, Input, Form, Row, Col, message, notification } from "antd";
import { useEffect } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: IAnimals | null;
  setDataUpdate: (v: IAnimals | null) => void;
}

const AnimalUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;
  const [form] = Form.useForm<Partial<IAnimals>>();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        age: dataUpdate.age,
        description: dataUpdate.description,
        categories: dataUpdate.categories,
        habitats: dataUpdate.habitats,
        conservations: dataUpdate.conservations,
      });
    } else {
      form.resetFields();
    }
  }, [dataUpdate, form]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  // const onFinish = async (values: Partial<IAnimals>) => {
  //   if (!dataUpdate) {
  //     notification.error({
  //       message: "Error",
  //       description: "No animal selected for update",
  //     });
  //     return;
  //   }

  //   const res = await handleUpdateAnimalAction(dataUpdate.id, values);

  //   if (res?.data) {
  //     handleCloseUpdateModal();
  //     message.success("Update animal succeed");
  //   } else {
  //     notification.error({
  //       message: "Update Animal error",
  //       description: res?.message || "Something went wrong",
  //     });
  //   }
  // };

  return (
    <Modal
      title="Update an animal"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
      maskClosable={false}
    >
      <Form name="basic" layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input animal name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
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
          <Col span={24} md={12}>
            <Form.Item
              label="Categories"
              name="categories"
              rules={[{ required: true, message: "Please input categories!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              label="Habitats"
              name="habitats"
              rules={[{ required: true, message: "Please input habitats!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              label="Conservation Status"
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

export default AnimalUpdate;
