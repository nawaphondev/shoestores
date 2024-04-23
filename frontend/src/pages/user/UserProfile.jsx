import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

const userFormSchema = z.object({
  username: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1).max(10),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "รหัสผ่านไม่ตรงกัน",
  });

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState([]);
  const queryClient = useQueryClient();

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setUserImg(acceptedFiles);

    const formData = new FormData();

    formData.append("id", user.id);
    formData.append("username", user.username);
    formData.append("avatar", acceptedFiles[0]);
    axios
      .put("http://localhost:3001/api/users/changeAvatar", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // logout();
          // navigate("/");

          queryClient.invalidateQueries("user");
        }
        // console.log(res)
      })
      .catch((err) => {
        console.log(err.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const imageInputProps = getInputProps();
  imageInputProps.multiple = false;

  // 1. Define your form.
  const userForm = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: user.username,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    formData.append("id", user.id);

    axios
      .put(
        "http://localhost:3001/api/users/update",
        { ...values, id: user.id },
        // formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries("user");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function passwordFormOnSubmit(values) {
    console.log({ ...values, id: user.id });
    axios
      .post(
        "http://localhost:3001/auth/changePassword",
        { ...values, id: user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        logout();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="flex items-center justify-center flex-1 w-8/12 mx-auto gap-x-2">
      <div className="flex flex-col">
        <form onSubmit={userForm.handleSubmit(onSubmit)} className="card">
          <div className="card-body">
            <div className="card-title">โปรไฟล์</div>
            <label className="flex items-center gap-2 input input-bordered">
              ชื่อ
              <input
                type="text"
                name="firstName"
                {...userForm.register("firstName")}
                className="grow"
              />
              {userForm.formState.errors.firstName && (
                <p className="text-red-600">
                  {userForm.formState.errors.firstName.message}
                </p>
              )}
            </label>

            <label className="flex items-center gap-2 input input-bordered">
              นามสกุล
              <input
                type="text"
                name="lastName"
                {...userForm.register("lastName")}
                className="grow"
              />
              {userForm.formState.errors.lastName && (
                <p className="text-red-600">
                  {userForm.formState.errors.lastName.message}
                </p>
              )}
            </label>
            <label className="flex items-center gap-2 input input-bordered">
              อีเมล
              <input
                type="text"
                name="email"
                {...userForm.register("email")}
                className="grow"
              />
              {userForm.formState.errors.email && (
                <p className="text-red-600">
                  {userForm.formState.errors.email.message}
                </p>
              )}
            </label>
            <label className="flex items-center gap-2 input input-bordered">
              หมายเลขโทรศัพท์
              <input
                type="text"
                name="phoneNumber"
                {...userForm.register("phoneNumber")}
                className="grow"
              />
              {userForm.formState.errors.phoneNumber && (
                <p className="text-red-600">
                  {userForm.formState.errors.phoneNumber.message}
                </p>
              )}
            </label>

            <label className="flex items-center gap-2 input input-bordered input-disabled">
              ชื่อผู้ใช้ (Username)
              <input
                type="text"
                autoComplete="username"
                autoSave="off"
                name="username"
                disabled
                {...userForm.register("username")}
                className="grow"
              />
              {userForm.formState.errors.username && (
                <p className="text-red-600">
                  {userForm.formState.errors.username.message}
                </p>
              )}
            </label>
            <button type="submit" className="btn btn-primary">
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </form>

        <form
          onSubmit={passwordForm.handleSubmit(passwordFormOnSubmit)}
          className="card"
        >
          <div className="card-body">
            <div className="card-title">เปลี่ยนรหัสผ่าน</div>
            <label className="flex items-center gap-2 input input-bordered">
              รหัสผ่านปัจจุบัน
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-red-600">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
              <input
                type="password"
                name="currentPassword"
                {...passwordForm.register("currentPassword")}
                className="grow"
              />
            </label>

            <label className="flex items-center gap-2 input input-bordered">
              รหัสผ่านใหม่
              <input
                type="password"
                name="newPassword"
                {...passwordForm.register("newPassword")}
                className="grow"
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-red-600">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </label>

            <label className="flex items-center gap-2 input input-bordered">
              ยืนยันรหัสผ่าน
              <input
                type="password"
                name="confirmPassword"
                {...passwordForm.register("confirmPassword")}
                className="grow"
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-red-600">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </label>
            <button className="btn btn-primary" type="submit">
              ยืนยันการเปลี่ยนรหัสผ่าน
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center mt-16 mb-auto avatar" {...getRootProps()}>
        <input
          {...imageInputProps}
          className="hidden w-[300px] mask mask-squircle"
        />
        <div className="w-[300px] mask mask-squircle">
          {userImg.length > 0 ? (
            <img src={URL.createObjectURL(userImg[0])} />
          ) : (
            user.avatar && (
              <img src={`http://localhost:3001/avatar/${user.avatar}`} />
            )
          )}
        </div>
        <label className="text-center label">
          {isDragActive
            ? "ลากไฟล์มาวางที่นี่"
            : "คลิ๊กที่รูปเพื่อเปลี่ยน"}
        </label>
      </div>
    </div>
  );
}
