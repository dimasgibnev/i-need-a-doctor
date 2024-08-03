/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { TableRow } from "../table-row/TableRow";
import styled from "styled-components";

const RequestRowContainer = ({
  className,
  _id,
  fullName,
  createdAt,
  phoneNumber,
  problem,
}) => {
  return (
    <div className={className}>
      <TableRow >
        <div className="date-column">{createdAt.slice(0, 10)}</div>
        <div className="name-column">{fullName}</div>
        <div className="phone-column">{phoneNumber}</div>
        <div className="problem-column">{problem.slice(0, 30)}...</div>
      </TableRow>
    </div>
  );
};

export const RequestRow = styled(RequestRowContainer)`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`;
