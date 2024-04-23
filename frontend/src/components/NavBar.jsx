import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useSearch from "../hooks/useSearch";
import logo from "../assets/logo.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const { setFilter, setLoading } = useSearch();
  const { pathname } = useLocation();

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      setLoading(true);
      const data = axios
        .get("http://localhost:3001/api/products/all")
        .then((res) => res.data);
      const p = await data;
      setFilter(p);

      setLoading(false);
      return p;
    },
  });

  if (!user) return null;

  function hdlLogout() {
    try {
      logout();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex items-center justify-between p-4 navbar bg-base-100">
      <Link to="/" className="h-20">
        <img src={logo} />
      </Link>
      {pathname === "/" ||
        (pathname === "/home" && (
          <div className="w-[600px] form-control">
            <label className="flex items-center w-full gap-2 input input-bordered input-lg rounded-3xl">
              <input
                type="text"
                className="w-full grow"
                placeholder="ค้นหาสินค้า"
                onChange={(e) => {
                  setFilter(
                    products.filter((product) =>
                      product.name.toLowerCase().includes(e.target.value)
                    )
                  );
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        ))}
      <div className="flex items-center justify-center px-2 gap-x-4">
        <Link to="/cart" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="badge badge-sm indicator-item">
                {cart.length}
              </span>
            )}
          </div>
        </Link>
        <div className="dropdown dropdown-end">
          <div className="flex items-center gap-x-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`http://localhost:3001/avatar/${user.avatar}`}
                />
              </div>
            </div>
            <div className="grow">{user.username}</div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/orders">คำสั่งซื้อ</Link>
            </li>
            <li>
              <Link to="/account">บัญชี</Link>
            </li>
            <div className="divider"></div>
            <li onClick={hdlLogout}>
              <a>ออกจากระบบ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
