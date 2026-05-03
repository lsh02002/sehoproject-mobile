import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserSignupApi } from "../../api/sehomanagerapi";
import { UserSignupType } from "../../types/type";
import TextInput from "../../components/form/TextInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import { FaRegistered } from "react-icons/fa6";
import PasswordVisibleInput from "../../components/form/PasswordVisibleInput";
import { layout } from "../../theme/Theme";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const OnSignupSubmit = () => {
    const userInfo: UserSignupType = {
      email,
      password,
      passwordConfirm,
      nickname,
    };

    UserSignupApi(userInfo)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {});
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div
        className="w-100"
        style={{ maxWidth: layout.maxWidth, padding: "20px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-normal mb-0">
            <FaRegistered /> 회원가입
          </h3>
          <Link
            style={{
              color: "#4680ff",
              textDecoration: "none",
              fontSize: "0.8rem",
            }}
            to="/login"
          >
            이미 계정이 있으세요?
          </Link>
        </div>

        <TextInput
          name="email"
          title="이메일 주소"
          data={email}
          setData={setEmail}
        />

        <TextInput
          name="nickname"
          title="닉네임"
          data={nickname}
          setData={setNickname}
        />

        <PasswordVisibleInput
          name="password"
          title="비밀번호"
          data={password}
          setData={setPassword}
        />

        <PasswordVisibleInput
          name="passwordConfirm"
          title="비밀번호 확인"
          data={passwordConfirm}
          setData={setPasswordConfirm}
        />

        <div className="mt-3">
          <ConfirmButton title="회원 가입" onClick={OnSignupSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
