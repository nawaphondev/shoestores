import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { thaiDateFormat } from "../../lib/utils";

export default function UserOrders() {
  const { user } = useAuth();
  const {
    data: orders,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3001/api/orders/user/${user.id}`)
        .then((res) => res.data);
    },
  });

  if (isError) return <div>เกิดข้อผิดพลาด</div>;
  if (isLoading) return <div>กำลังโหลด...</div>;

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-8/12 mx-auto">
      <h1>คำสั่งซื้อ</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>วันที่สั่งซื้อ</th>
              <th>จำนวน</th>
              <th>ยอดรวม</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="hover" key={order.id}>
                <th>#{order.id}</th>
                <td>{thaiDateFormat(order.orderDate)}</td>
                <td>x {order.orderDetails.length}</td>
                <td>
                  ฿{order.orderDetails.reduce(
                    (acc, cur) => acc + cur.price * cur.quantity,
                    0
                  )}
                </td>
                <th>
                  <Link
                    to={`/order/${order.id}`}
                    className="btn btn-ghost btn-xs"
                  >
                    รายละเอียดคำสั่งซื้อ
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
