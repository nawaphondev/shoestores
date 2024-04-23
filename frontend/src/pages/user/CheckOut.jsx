import { useLocation } from "react-router-dom";
import CheckOutForm from "../../components/forms/CheckOutForm";

export default function CheckOutPage() {
  const {
    state: { items },
  } = useLocation();

  return (
    <div className="flex items-center justify-center flex-1 w-8/12 mx-auto">
      <div className="flex gap-x-6">
        <div>
          <CheckOutForm items={items} />
        </div>
        <div className="flex flex-col gap-y-4">
          <h1>สรุปคำสั่งซื้อ</h1>
          {items.map((item, i) => (
            <div key={i} className="flex gap-x-2">
              <img
                src={`http://localhost:3001/images/${item.product.productImages[0].file}`}
                className="object-cover size-40 aspect-square"
              />
              <div className="flex flex-col gap-y-2">
                <div className="text-xl font-bold">{item.product.name}</div>
                <div className="text-lg font-light">{item.size}</div>
                <div className="text-lg font-light">
                  {item.product.price} x {item.quantity}
                </div>
                <span className="mt-auto">
                  {item.product.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
          <div className="divider"></div>
          <div className="flex justify-between">
            <span>ค่าธรรมเนียมการจัดส่งและดำเนินการโดยประมาณ</span>{" "}
            <span>ฟรี</span>
          </div>
          <div className="divider"></div>

          <div className="flex justify-between">
            <span>ยอดรวม</span>{" "}
            <span>
              {items.reduce((a, b) => a + b.quantity * b.product.price, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
