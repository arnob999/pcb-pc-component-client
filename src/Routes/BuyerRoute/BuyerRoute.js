import { isAdmin } from "@firebase/util";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Components/Loader";
import { Authcontext } from "../../contexts/AuthProvider";
import useBuyer from "../../hooks/userBuyer";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(Authcontext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  const location = useLocation();
  if (loading || isBuyerLoading) {
    return <Loader />;
  }
  if (user && isBuyer) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;
