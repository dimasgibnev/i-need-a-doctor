/* eslint-disable react/prop-types */
import { Header, Loader, Page, PrivateContent } from "../../components";
import { TableRow, RequestRow } from "./components";
import { useEffect } from "react";
import {
  fetchRequests,
  selectLoadingState,
  selectRequests,
} from "../../store/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const H2 = styled.h2`
  margin-bottom: 40px;
  font-weight: bold;
`;

const RequestsContainer = ({ className }) => {
  const isLoading = useSelector(selectLoadingState);
  const requests = useSelector(selectRequests);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  return (
    <div className={className}>
      <Header />
      <PrivateContent access={isAuthenticated} >
        <Page>
          <H2>Список Заявок</H2>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <TableRow>
                <div className="date-column">Дата Отправки</div>
                <div className="name-column">ФИО</div>
                <div className="phone-column">Телефон</div>
                <div className="request-column">Проблема</div>
              </TableRow>

              {requests.map(
                ({ _id, fullName, createdAt, phoneNumber, problem }) => {
                  return (
                    <Link key={_id} to={`/requests/${_id}`}>
                      <RequestRow
                        id={_id}
                        fullName={fullName}
                        createdAt={createdAt}
                        phoneNumber={phoneNumber}
                        problem={problem}
                      />
                    </Link>
                  );
                }
              )}
            </>
          )}
        </Page>
      </PrivateContent>
    </div>
  );
};

export const Requests = styled(RequestsContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;
