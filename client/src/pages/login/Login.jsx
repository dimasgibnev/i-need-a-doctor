/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Header } from "../../components";
import { Page } from "../../components/page/Page";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import styled from "styled-components";

const H2 = styled.h2`
  margin-bottom: 40px;
  font-weight: bold;
`;

export const Login = ({ className }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "dima@mail.com",
      password: "123123",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(signIn(values)).then(() => {
      navigate("/requests");
    });
  };

  return (
    <div className={className}>
      <Header />
      <Page>
        <H2>Войти</H2>
        <Box bg="white" minW="200px" padding="40px" borderRadius="10px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired mb="40px">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register("email", { required: "укажите почту" })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
            </FormControl>
            <FormControl isRequired mb="40px">
              <FormLabel>Пароль</FormLabel>
              <Input
                type="password"
                {...register("password", { required: "укажите пароль" })}
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </FormControl>
            <FormControl display="flex" justifyContent="center">
              <Button type="submit" colorScheme="blue">
                Войти
              </Button>
            </FormControl>
          </form>
        </Box>
      </Page>
    </div>
  );
};
