/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, FormRequest, Requests } from "./pages";
import { withAppProvider } from "./hoc";
import { Problem } from "./pages/requests/components/Problem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe, selectIsAuth } from "./store/authSlice";
import { Error } from "./components";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormRequest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/requests/:id" element={<Problem />} />
        <Route path="*" element={<Error>Страница не найдена</Error>} />
      </Routes>
    </BrowserRouter>
  );
};

export default withAppProvider(App);
