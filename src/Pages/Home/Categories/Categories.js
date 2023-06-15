import { useIsFetching, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import WobbleLoader from "../../../Components/WobbleLoader/WobbleLoader";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [loading, setLoading] = useState(false);
  const isFetching = useIsFetching();

  const { data: categories = [], isInitialLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.REACT_APP_URL}/categories`);
      return res.data;
    },
  });

  return (
    <div className="my-8 mb-8">
      <h2 className="text-6xl py-16 text-center font-bold tracking-wider text-zinc-500">
        Browse {categories.length} categories of products
      </h2>

      {isInitialLoading ? (
        <WobbleLoader />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-4">
          {categories?.map((category) => (
            <CategoryCard
              // handleMouseHover={handleMouseHover}
              category={category}
              key={category._id}
              // ismouseHover={ismouseHover}
              // setIsmouseHover={setIsmouseHover}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
