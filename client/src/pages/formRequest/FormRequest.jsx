/* eslint-disable react/prop-types */
import { Header, Loader } from "../../components";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";
import { Page } from "../../components/page/Page";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectLoadingState } from "../../store/requestSlice";
import { useForm } from "react-hook-form";
import httpClient from "../../api/http";
import { useState } from "react";

const H2 = styled.h2`
  margin-bottom: 40px;
  font-weight: bold;
`;

export const FormRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      problem: "",
    },
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    httpClient
      .post("/requests", values)
      .then(() => {
        setIsLoading(false);
        reset();
        alert("Запись успешно создана");
      })
      .catch((error) => {
        setError("error", {
          type: "custom",
          message: error.response.data[0].msg,
        });
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Header />
      <Page>
        <H2>Запись к врачу</H2>
        {isLoading ? (
          <Loader />
        ) : (
          <Box bg="white" minW="400px" padding="40px" borderRadius="10px">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired mb="40px">
                <FormLabel>ФИО</FormLabel>
                <Input type="text" name="name" {...register("fullName")} />
              </FormControl>
              <FormControl isRequired mb="40px">
                <FormLabel>Номер телефона</FormLabel>
                <Input type="text" name="phone" {...register("phoneNumber")} />
              </FormControl>
              <FormControl isRequired mb="40px">
                <FormLabel>Ваш вопрос</FormLabel>
                <Textarea
                  placeholder="Опишите проблему"
                  type="text"
                  name="problem"
                  {...register("problem")}
                />
              </FormControl>
              <FormControl display="flex" justifyContent="center">
                <Button type="submit" colorScheme="blue">
                  Отправить
                </Button>
              </FormControl>
            </form>
            {errors.error && (
              <Text color="red.500" textAlign="center">
                {errors.error.message}
              </Text>
            )}
          </Box>
        )}
      </Page>
    </div>
  );
};
