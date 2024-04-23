import useSearch from "../hooks/useSearch";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const { filter, loading } = useSearch();

  return (
    <div className="flex items-center justify-center flex-grow w-8/12 mx-auto">
      <div className="flex flex-col py-1 mt-8 gap-x-4 gap-y-12">
        <div className="grid grid-cols-3 gap-8">
          {loading ? (
            <div>กำลังโหลด...</div>
          ) : filter?.length > 0 ? (
            filter.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <div>ไม่พบสินค้า</div>
          )}
        </div>
      </div>
    </div>
  );
}
