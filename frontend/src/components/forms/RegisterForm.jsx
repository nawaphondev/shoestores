/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";

const passwordFormSchema = z
  .object({
    username: z.string().min(1, { message: "กรุณาระบุชื่อผู้ใช้ (Username)" }),
    firstName: z.string().min(1, { message: "กรุณาระบุชื่อ" }),
    lastName: z.string().min(1, { message: "กรุณาระบุนามสกุล" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "กรุณาระบุรหัสผ่าน" }),
    confirmPassword: z.string().min(8, { message: "กรุณาระบุรหัสผ่านให้ตรงกัน" }),
    phoneNumber: z.string().min(10, { message: "กรุณาระบุหมายเลขโทรศัพท์" }).max(10, { message: "กรุณาระบุกรอกข้อมูลให้ถูกต้อง" }),
    avatar: z.instanceof(File),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "รหัสผ่านไม่ตรงกัน",
  });

export default function RegisterForm() {
  const [userImg, setUserImg] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      avatar: null,
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    setUserImg(acceptedFiles);
    setValue("avatar", acceptedFiles[0], {
      shouldValidate: true,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const imageInputProps = getInputProps();
  imageInputProps.multiple = false;

  async function passwordFormOnSubmit(values) {
    if (userImg.length == 0) return alert("กรุณาเลือกรูปภาพ");
    // console.log(values);

    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const rs = await axios.post(
      "http://localhost:3001/auth/register",
      formData
    );
    console.log(rs);
    navigate("/login");
  }

  return (
    <form
      onSubmit={handleSubmit(passwordFormOnSubmit)}
      autoComplete="off"
      className="card shadow-xl w-[500px]"
    >
      <div className="grid grid-cols-2 gap-y-0 card-body">
        <h1 className="col-span-2 card-title">ลงทะเบียน</h1>

        <div
          className="col-span-2 avatar justify-self-center"
          {...getRootProps()}
        >
          <input
            {...imageInputProps}
            name="avatar"
            {...register("avatar")}
            className="hidden h-[110px] mask mask-squircle"
          />
          <div className="h-[110px] mask mask-squircle">
            {userImg.length > 0 ? (
              <img src={URL.createObjectURL(userImg[0])} />
            ) : (
              <label className="flex items-center justify-center text-center label">
                {isDragActive
                  ? "Drop it here"
                  : "ลากไฟล์มาวางที่นี่ หรือ คลิ๊กเพื่อเลือกไฟล์"}
              </label>
            )}
          </div>
        </div>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">ชื่อ</span>
          </div>
          <input
            type="text"
            name="firstName"
            {...register("firstName")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.firstName && (
              <span className="text-red-600 label-text-alt">
                {errors.firstName.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">นามสกุล</span>
          </div>
          <input
            type="text"
            name="lastName"
            {...register("lastName")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.lastName && (
              <span className="text-red-600 label-text-alt">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full col-span-2 form-control">
          <div className="label">
            <span className="label-text">อีเมล</span>
          </div>
          <input
            type="text"
            name="email"
            {...register("email")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.email && (
              <span className="text-red-600 label-text-alt">
                {errors.email.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">หมายเลขโทรศัพท์</span>
          </div>
          <input
            type="text"
            name="phoneNumber"
            {...register("phoneNumber")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.phoneNumber && (
              <span className="text-red-600 label-text-alt">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">ชื่อผู้ใช้ (Username)</span>
          </div>
          <input
            type="text"
            name="username"
            {...register("username")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.username && (
              <span className="text-red-600 label-text-alt">
                {errors.username.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">รหัสผ่าน</span>
          </div>
          <input
            type="password"
            name="password"
            autoComplete="password"
            autoSave="off"
            {...register("password")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.password && (
              <span className="text-red-600 label-text-alt">
                {errors.password.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-fullform-control">
          <div className="label">
            <span className="label-text">ยืนยันรหัสผ่าน</span>
          </div>
          <input
            type="password"
            name="confirmPassword"
            autoComplete="confirmPassword"
            autoSave="off"
            {...register("confirmPassword")}
            className="w-full input input-bordered "
          />
          <div className="label">
            {errors.confirmPassword && (
              <span className="text-red-600 label-text-alt">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </label>

        <div className="items-center justify-center col-span-2 card-actions gap-y-6">
          <button type="submit" className="w-full btn rounded-3xl btn-primary">
            ยืนยันการลงทะเบียน
          </button>

          <div>
            มีบัญชีอยู่แล้ว?{" "}
            <Link className="font-bold text-primary" to="/login">
              เข้าสู่ระบบได้ที่นี่
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
