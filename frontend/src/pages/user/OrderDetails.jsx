import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { thaiDateFormat } from "../../lib/utils";
import axios from "axios";

export default function OrderDetails() {
  const { id } = useParams();
  const {
    data: order,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3001/api/orders/${id}`)
        .then((res) => res.data);
    },
  });

  if (isError) return <div>พบข้อผิดพลาด</div>;
  if (isLoading) return <div>กำลังโหลด...</div>;

  return (
    <div className="flex items-center justify-center flex-1 w-8/12 mx-auto">
      <div className="card">
        <div className="card-body">
          <div className="card-title">รายละเอียดการสั่งซื้อ</div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div>#{order.id}</div>
              <div>{thaiDateFormat(order.orderDate)}</div>
            </div>
            <h1>
              ฿{order.orderDetails &&
                order.orderDetails?.reduce(
                  (acc, cur) => acc + cur.price * cur.quantity,
                  0
                )}
            </h1>
          </div>
          <div>
            คำสั่งซื้อคาดว่าจะถึงวันที่ {thaiDateFormat(order.orderDate)}
          </div>
          <ul className="timeline">
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-accent"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">ได้รับการสั่งซื้อ</div>
              <hr className="bg-accent"/>
            </li>
            <li>
              <hr className="bg-accent"/>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-accent"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">เตรียมจัดส่ง</div>
              <hr className="bg-accent"/>
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">กำลังจัดส่ง</div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">ได้รับสินค้าแล้ว</div>
            </li>
          </ul>
          <div>
            สินค้า{" "}
            {order.orderDetails &&
              order.orderDetails.reduce((acc, item) => acc + item.quantity, 0)}
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ชื่อสินค้า</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {order.orderDetails?.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 mask mask-squircle">
                            <img
                              src={`http://localhost:3001/images/${item.product.productImages[0].file}`}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.product.name}</div>
                          <div className="text-sm opacity-50">{item.size}</div>
                        </div>
                      </div>
                    </td>
                    <td>฿{item.price}</td>
                    <td>x {item.quantity}</td>
                    <td>฿{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
