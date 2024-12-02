import React from "react";
import { Grid } from "antd";
import styled, { css } from "styled-components";

interface ContainerStyledProps {
  xl?: boolean;
  xxl?: boolean;
}

const ContainerStyled = styled.div<ContainerStyledProps>`
  max-width: 100%;
  padding: 0 16px;
  margin: 0 auto;

  ${({ xl, xxl }) =>
    (xl || xxl) &&
    css`
      max-width: 1200px;
    `};
`;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <ContainerStyled
      {...breakpoint}
      className={`hw-container ${props.className || ""}`}
      style={props.style}
    >
      {children}
    </ContainerStyled>
  );
};

export default Container;
