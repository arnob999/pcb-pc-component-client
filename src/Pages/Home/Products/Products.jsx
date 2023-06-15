import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Authcontext } from "../../../contexts/AuthProvider";
import ProductCard from "../../../Components/ProductCard";
import BookingModal from "../../../Components/BookingModal";

export default function Products() {
  const products = useLoaderData();
  console.log(products);
  const [product, setProduct] = useState(null);
  const { user } = useContext(Authcontext);
  return (
    <div className="px-16">
      <h3 className="text-3xl text-center">
        Products available of{" "}
        <span className="underline decoration-blue-300">
          {products[0].category_name}
        </span>
        : {products.length}
        <div className="grid gap-10 my-10">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              setProduct={setProduct}
            />
          ))}
          {user && user?.email && product && (
            <BookingModal product={product} setProduct={setProduct} />
          )}
        </div>
      </h3>
    </div>
  );
}
