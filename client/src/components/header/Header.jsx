/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout, selectIsAuth } from "../../store/authSlice";

const HeaderContainer = ({ className }) => {
  const isAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <nav className={`${className}`}>
      <ul className="">
        <li className="reception">
          <Link className="nav-link" to={"/"}>
            Записаться
          </Link>
        </li>{" "}
        <li className="login">
          {isAuthenticated ? (
            <Link onClick={onClickLogout} className="nav-link" to={"/"}>
              Выйти
            </Link>
          ) : (
            <Link className="nav-link" to={"/login"}>
              Войти
            </Link>
          )}
        </li>
        {isAuthenticated && (
          <li className="requests">
            <Link className="nav-link" to={"/requests"}>
              Список
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export const Header = styled(HeaderContainer)`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: #3182ce;
  font-weight: bold;

  & .nav-link {
    text-decoration: none;
    color: #ffffff;
  }
  & ul {
    margin: 0;
    display: flex;
    list-style-type: none;
    & li {
      margin-right: 20px;
    }
  }
`;
