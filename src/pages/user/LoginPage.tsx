import React, { useState } from "react";
import { useLogin } from "../../context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import { UserLoginApi } from "../../api/sehomanagerapi";
import TextInput from "../../components/form/TextInput";
import PasswordInput from "../../components/form/PasswordInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import { SlLogin } from "react-icons/sl";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const OnLoginSubmit = () => {
    UserLoginApi(email, password)
      .then((res) => {
        console.log("login ", res);
        localStorage.setItem("userId", res.data.data.userId);
        localStorage.setItem("nickname", res.data.data.nickname);
        localStorage.setItem("workspaceId", res.data.data.workspaceId);
        localStorage.setItem("spaceId", res.data.data.spaceId);
        localStorage.setItem("projectId", res.data.data.projectId);
        localStorage.setItem("accessToken", res.headers.accesstoken);
        localStorage.setItem("refreshToken", res.headers.refreshtoken);

        setIsLogin(true);
        navigate("/");
      })
      .catch(() => {});
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100">
      <div className="w-100" style={{ maxWidth: "400px", padding: "20px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-normal mb-0">
            <SlLogin /> 로그인
          </h3>
          <Link
            style={{
              color: "#4680ff",
              textDecoration: "none",
              fontSize: "0.7rem",
            }}
            to="/register"
          >
            계정이 없으세요?
          </Link>
        </div>

        <TextInput
          name="email"
          title="이메일 주소"
          data={email}
          setData={setEmail}
        />
        <PasswordInput
          name="password"
          title="비밀 번호"
          data={password}
          setData={setPassword}
        />

        <div className="mt-3">
          <ConfirmButton title="로그인" onClick={OnLoginSubmit} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
