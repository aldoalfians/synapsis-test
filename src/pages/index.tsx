import styled from "styled-components";
import { Button, Typography, Space } from "antd";
import { HeartOutlined, StarOutlined } from "@ant-design/icons";
import PageLayout from "@/components/layout/page-layout";

const { Title, Paragraph } = Typography;

const StyledTitle = styled(Title)`
  color: #1890ff;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

export default function Home() {
  return (
    <PageLayout>
      <StyledTitle level={1}>
        Next.js with Styled Components & Ant Design
      </StyledTitle>

      <Paragraph>
        A powerful combination of Next.js Pages Router, TypeScript, Styled
        Components, and Ant Design.
      </Paragraph>

      <ButtonContainer>
        <Button type="primary" icon={<HeartOutlined />}>
          Primary Button
        </Button>

        <Button type="default" icon={<StarOutlined />}>
          Secondary Button
        </Button>
      </ButtonContainer>
    </PageLayout>
  );
}
