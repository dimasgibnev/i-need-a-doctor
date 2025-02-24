/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */

import { Provider } from "react-redux";
import { store } from "../store/store";

export const withAppProvider =
  (Component) =>
  ({ ...props }) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
