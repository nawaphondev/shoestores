import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem";

export default function CartPage() {
  const { cart } = useCart();
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    selected.length > 0 && setError(false)
  }, [selected])
  

  const total = selected.reduce((a, b) => a + b.quantity * b.product.price, 0);

  return (
    <div className="flex items-center justify-center flex-1 w-8/12 mx-auto">
      <div className="flex flex-1 gap-x-6">
        <div className="flex flex-col items-start w-full gap-y-2">
          {cart.length > 0 ? (
            cart.map((item, i) => (
              <CartItem item={item} key={i} setSelected={setSelected} />
            ))
          ) : (
            <div className="self-center text-center">ไม่พบสินค้าในตะกร้า</div>
          )}
        </div>

        <div className="flex flex-col w-4/6">
          <h2 className="self-center text-4xl font-semibold">{total}</h2>
          <div className="divider"></div>
          <button
            className="btn btn-primary rounded-3xl"
            onClick={() => {
              if (selected.length === 0) {
                return setError(true)
              }
              navigate("/checkout", {
                state: {
                  items: selected,
                },
              });
            }}
          >
            ชำระเงิน
          </button>
          {error && <span className="text-xl text-center text-red-600 label-text-alt">กรุณาเลือกสินค้าที่ต้องการชำระเงิน</span>}
        </div>
      </div>
    </div>
  );
}
