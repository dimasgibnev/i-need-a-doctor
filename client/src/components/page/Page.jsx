/* eslint-disable react/prop-types */

import styled from "styled-components";

export const PageContainer = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const Page = styled(PageContainer)`
  width: 100%;
  min-height: 840px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dbdbdb47;
`;
