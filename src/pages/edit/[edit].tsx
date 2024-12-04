import PageLayout from '@/components/layout/page-layout';
import Container from '@/components/layout/page-layout/Container';
import usePostMutator from '@/utilities/hooks/posts/usePostMutator';
import useQueryFetch from '@/utilities/hooks/useQueryFetch';
import { Button, Col, Form, Input, notification, Row, Space, Spin, Typography } from 'antd';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;

interface EditPageProps {
  params: {
    edit?: string;
  };
}

interface Values {
  title: string;
  body: string;
}

function Edit({ params }: EditPageProps) {
  const [form] = Form.useForm();
  const router = useRouter();

  const { data, isLoading, refetch } = useQueryFetch({
    url: `posts/${params?.edit}`,
  });

  const onSuccessEditPost = () => {
    router.back();
    notification.open({
      type: 'success',
      message: 'Berahsil',
      description: 'Data berhasil diupdate',
      placement: 'top',
    });
    refetch();
  };

  const { submitEditPost, isLoadingEditPost } = usePostMutator({
    onSuccessEditPost,
    id: params?.edit,
  });

  const onFinish = (values: Values) => {
    submitEditPost &&
      submitEditPost({
        ...values,
        user_id: '7563750',
      });
  };

  return (
    <PageLayout>
      <Container style={{ padding: '48px 16px' }}>
        <Space direction="vertical">
          <Title style={{ margin: 'auto' }} level={2}>
            Edit Data
          </Title>
          <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
        </Space>

        <Row justify="start" style={{ marginTop: 16 }}>
          <Col span={24} md={12}>
            <Spin spinning={isLoading}>
              <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={{
                  title: data?.title,
                  body: data?.body,
                }}
              >
                <Form.Item label="Judul" name="title">
                  <Input placeholder="Masukan Judul" size="large" />
                </Form.Item>
                <Form.Item label="Keterangan" name="body">
                  <Input.TextArea rows={5} placeholder="Masukan Keterangan" />
                </Form.Item>

                <Form.Item>
                  <Button loading={isLoadingEditPost} type="primary" htmlType="submit" size="large">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}

export async function getServerSideProps(context: { params: EditPageProps['params'] }) {
  return {
    props: {
      params: context.params || {},
    },
  };
}

export default Edit;
