import { Text } from "@chakra-ui/react";
import { Header } from "../header/Header";
import { Page } from "../page/Page";

export const Error = ({ children }) => {
  return (
    <>
      <Header />
      <Page>
        <Text textAlign="center">{children}</Text>
      </Page>
    </>
  );
};
