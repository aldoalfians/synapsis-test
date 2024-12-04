import { useLogin } from "@/utilities/authorization";
import { Button, Form, Input, Modal } from "antd";
import React from "react";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

interface FormName {
  name: string;
  token: string;
}

function AuthroziationModal({ onClose, isOpen }: Props) {
  const [form] = Form.useForm();

  const { submitLogin } = useLogin();

  const onFinish = (values: FormName) => {
    submitLogin && submitLogin(values);
    setTimeout(() => {
      onClose && onClose();
    }, 100);
  };

  return (
    <Modal
      title="Masuk"
      open={isOpen}
      onOk={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Nama" rules={[{ required: true }]} name="name">
          <Input size="large" placeholder="Masukkan Nama" />
        </Form.Item>
        <Form.Item label="Token" rules={[{ required: true }]} name="token">
          <Input size="large" placeholder="Masukkan Token" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              width: "100%",
            }}
          >
            Masuk
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AuthroziationModal;
