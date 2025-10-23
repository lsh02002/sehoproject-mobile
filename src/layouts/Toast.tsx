import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const StyledToastContainer = styled(ToastContainer)`
  padding: 0 20px;
  box-sizing: border-box;
  margin-bottom: 70px;
  .Toastify__toast {
    background-color: red;
    color: white;
    font-size: 0.9rem;
  }
`;
