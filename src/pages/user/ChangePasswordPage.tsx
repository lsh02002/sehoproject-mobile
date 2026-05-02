import React, { useState } from "react";
import PasswordVisibleInput from "../../components/form/PasswordVisibleInput";
import ConfirmButton from "../../components/form/ConfirmButton";
import { ChangePasswordRequestType } from "../../types/type";
import { showToast, UserChangePasswordApi } from "../../api/sehomanagerapi";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const OnChangePasswordSubmit = () => {
    const changePasswordRequest: ChangePasswordRequestType = {
      oldPassword,
      newPassword,
      newPasswordConfirm,
    };

    UserChangePasswordApi(changePasswordRequest)
      .then(() => {
        showToast("비밀번호 변경에 성공했습니다.", "success");
      })
      .catch(() => {});
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="w-100">
        
        <PasswordVisibleInput
          name="oldpassword"
          title="이전 비밀번호"
          data={oldPassword}
          setData={setOldPassword}
        />

        <PasswordVisibleInput
          name="newpassword"
          title="새 비밀번호"
          data={newPassword}
          setData={setNewPassword}
        />

        <PasswordVisibleInput
          name="newpasswordconfirm"
          title="새 비밀번호 확인"
          data={newPasswordConfirm}
          setData={setNewPasswordConfirm}
        />

        <div className="mt-3">
          <ConfirmButton title="로그인" onClick={OnChangePasswordSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
