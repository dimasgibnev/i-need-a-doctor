export const PrivateContent = ({ children, access }) => {
  return access ? children : <h2>Доступ запрещен</h2>;
};
