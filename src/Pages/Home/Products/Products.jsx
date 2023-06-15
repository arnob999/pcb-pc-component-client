import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Authcontext } from "../../../contexts/AuthProvider";
import ProductCard from "../../../Components/ProductCard";
import BookingModal from "../../../Components/BookingModal";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  // const allProducts = useLoaderData();
  // console.log(products);
  const [product, setProduct] = useState(null);
  const { user } = useContext(Authcontext);
  const { state } = useLocation();
  console.log(state);
  const {
    data: queryProducts = [],
    refetch,
    isLoading,
    isFetching,
    isInitialLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["queryProducts"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_URL}/products?search=${state ?? ""}`).then(
        (res) => res.json()
      ),
  });
  useEffect(() => {
    refetch();
  }, [state]);
  console.log(queryProducts);
  return (
    <div className="px-16">
      {isInitialLoading ? (
        <div class="h-screen w-screen z-50 flex justify-center items-center">
          <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <>
          <h3 className="text-3xl text-center">
            Products available : {queryProducts?.length}{" "}
          </h3>

          <div className="grid gap-10 my-10">
            {queryProducts?.map((product) => (
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
        </>
      )}
    </div>
  );
}
