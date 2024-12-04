import PageLayout from "@/components/layout/page-layout";
import Container from "@/components/layout/page-layout/Container";
import { Col, Form, Row, Space, Typography } from "antd";

const { Title, Text } = Typography;

function Add() {
  return (
    <PageLayout>
      <Container>
        <Space direction="vertical">
          <Title style={{ margin: "auto" }} level={2}>
            Tambah Data
          </Title>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </Space>

        <Row justify="center">
          <Col span={24} md={12}>
            <Form></Form>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}

export default Add;
