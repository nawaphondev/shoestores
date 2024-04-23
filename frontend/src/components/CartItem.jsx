/* eslint-disable react/prop-types */
import NumberSelector from "./NumberSelector";
import CartRemoveButton from "./CartRemoveButton";
import useCart from "../hooks/useCart";

export default function CartItem({ item, setSelected }) {
  const { setCart } = useCart();
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-x-4">
        <input
          type="checkbox"
          className="self-center checkbox checkbox-lg"
          onChange={(e) => {
            if (e.target.checked) {
              setSelected((prev) => [...prev, item]);
            } else {
              setSelected((prev) =>
                prev.filter(
                  (p) => p.product.id != item.product.id || p.size != item.size
                )
              );
            }
          }}
        />
        <img
          src={`http://localhost:3001/images/${item.product.productImages[0].file}`}
          className="object-cover size-40 aspect-square"
        />
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col w-full gap-y-2">
            <h2>{item.product.name}</h2>
            <h2>{item.size}</h2>
            <NumberSelector
              quantity={item.quantity}
              onChange={(quantity) =>
                setCart((prev) =>
                  prev.map((p) =>
                    p.product.id == item.product.id ? { ...p, quantity } : p
                  )
                )
              }
            />
            <div className="self-end mt-auto">
              <CartRemoveButton productId={item.product.id} size={item.size} />
            </div>
          </div>
          <div>฿{item.product.price}</div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
