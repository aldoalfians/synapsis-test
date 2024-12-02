import styled from "styled-components";
import BrandLogo from "./BrandLogo";
import Container from "./Container";
import { Layout } from "antd";

const HeaderStyled = styled(Layout.Header)`
  background-color: var(--ant-color-white) !important;
  height: fit-content;
  box-shadow: var(--ant-box-shadow) !important;
  width: 100%;
  top: 0;
  z-index: 10;
  position: sticky;
`;

export default function Header() {
  return (
    <HeaderStyled>
      <Container>
        <BrandLogo />
      </Container>
    </HeaderStyled>
  );
}
