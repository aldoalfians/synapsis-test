import { Layout } from "antd";
import React from "react";
import styled from "styled-components";
import Header from "./Header";

const { Content } = Layout;

const LayoutStyled = styled(Layout)`
  > .ant-layout-header,
  .ant-layout-content {
    background-color: var(--ant-color-white);
  }

  .ant-layout-content {
    min-height: 100vh;
  }
`;

interface Props {
  children?: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <LayoutStyled>
      <Header />
      <Content>{children}</Content>
    </LayoutStyled>
  );
}
