/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="h-full shadow-xl card card-compact w-72 bg-base-100">
      <figure>
        <img
          src={`http://localhost:3001/images/${product.productImages[0].file}`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <div className="items-center justify-between mt-auto card-actions">
          <div className="">฿{product.price}</div>
          
          <Link to={`/product/${product.id}`} className="btn btn-primary">เลือกดูสินค้า</Link>
        </div>
      </div>
    </div>
  );
}
