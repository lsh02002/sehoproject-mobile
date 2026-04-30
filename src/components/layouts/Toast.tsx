import { ToastContainer, ToastContainerProps } from "react-toastify";

export const StyledToastContainer = (props: ToastContainerProps) => {
  return (
    <>
      <style>
        {`
          .toast-container-wrapper {
            padding: 0 20px;
            box-sizing: border-box;
            margin-bottom: 70px;
            z-index: 1000;
          }

          .Toastify__toast {
            color: white;
            font-size: 0.9rem;
          }

          .Toastify__toast--success {
            background-color: #28a745;
          }

          .Toastify__toast--warning {
            background-color: #f0ad4e;
          }

          .Toastify__toast--error {
            background-color: #dc3545;
          }

          .Toastify__toast--info {
            background-color: #17a2b8;
          }
        `}
      </style>

      <div className="toast-container-wrapper">
        <ToastContainer {...props} />
      </div>
    </>
  );
};
