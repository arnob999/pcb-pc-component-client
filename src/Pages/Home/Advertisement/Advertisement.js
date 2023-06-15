import React, { useEffect, useState } from "react";
import ProductsCard from "../../../Components/ProductsCard";

const Advertisement = () => {
  const [isHovered, setIsHovered] = useState(false);

  const [advertisedProducts, setAdvertisedProducts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/products`)
      .then((res) => res.json())
      .then((products) => {
        setAdvertisedProducts(
          products.filter((product) => product?.isAdvertised === true)
        );
      });
  }, []);
  console.log(advertisedProducts);
  if (advertisedProducts) {
    return (
      <>
        {/* <h3>{advertisedProducts.length}</h3> */}
        <h2 className="text-6xl text-black font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-tl from-stone-500 to-gray-300/50 pt-16 ">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 mx-24">
          {advertisedProducts.map((advertisedProduct) => (
            <div className="m-2">
              <ProductsCard
                key={advertisedProduct?._id}
                advertisedProduct={advertisedProduct}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Advertisement;
