import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../../../../contexts/AuthProvider";
import ConfirmationModal from "../../../../Components/ConfirmationModal";

const MyProducts = () => {
  const { user } = useContext(Authcontext);
  const [advertisingProduct, setAdvertisingProduct] = useState("");
  const [deletingProduct, setDeletingProduct] = useState(null);
  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_URL}/products?email=${user?.email}`;
  const {
    data: products = [],
    refetch,
    isInitialLoading,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/products?product=${advertisingProduct}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("Prodcut set for advertisement");
        }
        setAdvertisingProduct("");
        refetch();
      });
  }, [deletingProduct, advertisingProduct, refetch]);
  const handleDelete = (product) => {
    console.log(product);
    // console.log(seller);
    fetch(`${process.env.REACT_APP_URL}/seller/product/${product?._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        if (data.deletedCount > 0) {
          toast.success(`${product?.product_name} deleted successfully`);
          refetch();
        }
      });
    console.log();
  };
  const closeModal = () => {
    setDeletingProduct(null);
  };

  return (
    <div>
      {isInitialLoading ? (
        <div class="h-screen flex justify-center items-center">
          <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mt-6">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, idx) => (
                  <tr key={product._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                          <img src={product.picture} alt="" />
                        </div>
                      </div>
                    </td>
                    <td>{product.product_name}</td>
                    <td>৳ {product.resale_price}</td>
                    <td>
                      {
                        <>
                          {product.isPaid ? (
                            <button className="badge btn-warning rounded-md mr-3 ">
                              Sold
                            </button>
                          ) : (
                            <button className="badge badge-info rounded-md  ">
                              Active
                            </button>
                          )}
                        </>
                      }
                    </td>
                    <td>
                      <div>
                        <label
                          htmlFor="confirmation-modal"
                          className="btn btn-xs btn-error mr-3 rounded-md"
                          onClick={() => setDeletingProduct(product)}
                        >
                          Delete
                        </label>

                        {product.isAdvertised ? (
                          <button className="btn btn-disabled btn-xs text-white bg-gray-600">
                            Boosted
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setAdvertisingProduct(product._id);
                            }}
                            className="btn btn-xs btn-success rounded-md "
                          >
                            Boost
                          </button>
                        )}
                        <button
                          onClick={() => {
                            navigate(`edit/${product?._id}`, {
                              state: product,
                            });
                          }}
                          className="btn-xs btn-primary ml-3 rounded-md active:scale-95 active:opacity-80 transition-all"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {deletingProduct && (
        <ConfirmationModal
          title={`Are you sure you want to delete ${deletingProduct.name}?`}
          message={`Action cannot be undone`}
          successAction={handleDelete}
          closeModal={closeModal}
          modalData={deletingProduct}
          successButtonName="Delete"
        />
      )}
    </div>
  );
};

export default MyProducts;
