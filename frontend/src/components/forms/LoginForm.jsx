import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginFormSchema = z.object({
  username: z.string().min(1, { message: "กรุณาระบุชื่อผู้ใช้ (Username)" }),
  password: z.string().min(1, { message: "กรุณาระบุรหัสผ่าน" }),
});

export default function LoginForm() {
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function loginFormOnSubmit(values) {
    // console.log(input)
    try {
      // validation
      const rs = await axios.post("http://localhost:3001/auth/login", values);
      // console.log(rs.data.token)
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:3001/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      // console.log(rs1.data)
      setUser(rs1.data);
      // navigateToHome()
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <form
      className="p-2 shadow-xl card w-[500px]"
      onSubmit={handleSubmit(loginFormOnSubmit)}
    >
      <div className="w-full card-body gap-y-4">
        <h1 className="card-title">เข้าสู่ระบบ</h1>

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

        <div className="items-center justify-center w-full card-actions">
          <div className="flex flex-col gap-y-6">
            <div>
              ยังไม่มีบัญชี?{" "}
              <Link className="font-bold text-primary" to="/register">
                ลงทะเบียนได้ที่นี่
              </Link>
            </div>

            <button type="submit" className="rounded-3xl btn btn-primary">
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
