import { useParams } from "react-router-dom";
import { Header, Loader } from "../../../components";
import { Page } from "../../../components/page/Page";
import { useEffect, useState } from "react";
import { TableRow } from "./table-row/TableRow";
import httpClient from "../../../api/http";

export const Problem = () => {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState({
    createdAt: "",
    fullName: "",
    phoneNumber: "",
    problem: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    httpClient
      .get(`/requests/${id}`)
      .then(({ data }) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [id]);

  return (
    <>
      <Header />
      <Page>
        {isLoading ? (
          <Loader />
        ) : (
          <TableRow>
            <div className="date-column">{data.createdAt.slice(0, 10)}</div>
            <div className="name-column">{data.fullName}</div>
            <div className="phone-column">{data.phoneNumber}</div>
            <div>{data.problem}</div>
          </TableRow>
        )}
      </Page>
    </>
  );
};
