import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Landing() {
  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="flex-col hero-content lg:flex-row">
        <img src={logo} />
        <div className="flex flex-col items-center justify-center gap-y-3">
          <h1 className="text-5xl font-bold text-center">Welcome</h1>
          <p>
          สวัสดีครับ/ค่ะ! ยินดีต้อนรับทุกท่านเข้าสู่ [Footstep store] - ที่รวบรวมรองเท้าทุกสไตล์และความสะดวกสบายให้คุณ!
          </p>
          <Link to={"/login"} className="btn btn-wide btn-primary">Login</Link>
          <Link to={"/register"} className="btn btn-wide btn-primary">Register</Link>
        </div>
      </div>
    </div>
  );
}
