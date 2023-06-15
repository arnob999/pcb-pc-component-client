import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductsCard({ advertisedProduct }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      key={advertisedProduct?._id}
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
      onClick={() => navigate("/products")}
      className="group relative block cursor-pointer overflow-hidden bg-black  h-96 mx-auto"
    >
      <img
        alt="product_image"
        src={advertisedProduct?.picture}
        class={`absolute inset-0 h-full w-full object-cover opacity-90  group-hover:opacity-75 ${
          isHovered && "scale-110 "
        } transition-all duration-700`}
      />

      <div className="relative p-8">
        <p className="text-2xl font-bold text-white">
          {advertisedProduct?.product_name}
        </p>

        <div className="mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"></div>
        </div>
      </div>
    </div>
  );
}
