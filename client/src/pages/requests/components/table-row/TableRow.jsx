/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import styled from "styled-components";

export const TableRowContainer = ({ className, children }) => {
  return <Box bg="white" className={className}>{children}</Box>;
};

export const TableRow = styled(TableRowContainer)`
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #3d59f7;
  width: 1000px;
  margin-bottom: 10px;

  & > div {
    padding: 0 10px;
    width: 250px;
    
  }
`;
