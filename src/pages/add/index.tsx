import PageLayout from '@/components/layout/page-layout';
import Container from '@/components/layout/page-layout/Container';
import usePostMutator from '@/utilities/hooks/posts/usePostMutator';
import { Button, Col, Form, Input, notification, Row, Space, Typography } from 'antd';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;

interface Values {
  title: string;
  body: string;
}

function Add() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onSuccessAddPost = () => {
    router.back();
    notification.open({
      type: 'success',
      message: 'Berahsil',
      description: 'Data berhasil ditambahkan',
      placement: 'top',
    });
  };

  const { submitPost, isLoadingSubmitPost } = usePostMutator({
    onSuccessAddPost,
  });

  const onFinish = (values: Values) => {
    submitPost &&
      submitPost({
        ...values,
        user_id: '7563750',
      });
  };

  return (
    <PageLayout>
      <Container style={{ padding: '48px 16px' }}>
        <Space direction="vertical">
          <Title style={{ margin: 'auto' }} level={2}>
            Tambah Data
          </Title>
          <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
        </Space>

        <Row justify="start" style={{ marginTop: 16 }}>
          <Col span={24} md={12}>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item label="Judul" name="title" rules={[{ required: true }]}>
                <Input placeholder="Masukan Judul" size="large" />
              </Form.Item>
              <Form.Item label="Keterangan" name="body" rules={[{ required: true }]}>
                <Input.TextArea rows={5} placeholder="Masukan Keterangan" />
              </Form.Item>

              <Form.Item>
                <Button loading={isLoadingSubmitPost} type="primary" htmlType="submit" size="large">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}

export default Add;
