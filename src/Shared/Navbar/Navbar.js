import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { HiUser } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Authcontext } from "../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(Authcontext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/products", { state: search });
  };
  return (
    <div className="">
      <div className="navbar bg-inherit">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-4 text-left"
            >
              <li>
                <Link className="px-1 py-2" to={"/"}>
                  Home
                </Link>
              </li>
              {user?.email && (
                <li>
                  <Link className="px-1 py-2" to={"/dashboard/myproducts"}>
                    Dashboard
                  </Link>
                </li>
              )}
              {/* {user?.email && (
                <>
                  <li>
                    <Link className="px-1 py-2" to={"/myreview"}>
                      My reviews
                    </Link>
                  </li>
                  <li>
                    <Link className="px-1 py-2" to={"/addservice"}>
                      Add service
                    </Link>
                  </li>
                </>
              )} */}
              <li>
                <Link className="px-1 py-2" to={"/products"}>
                  Products
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to={"/"}
            className=" normal-case text-2xl  text-white hidden lg:block leading-10 rounded-md active:scale-95 transition-all ml-4"
          >
              <img
                src="https://i.ibb.co/Xz8sZ0N/Red-and-Gray-Modern-Tech-Business-Logo.png"
                alt=""
                className="w-32 rounded-lg  mr-2"
              />
            {/* <div className="flex justify-between items-center">
              <p className="font-bold font text-black">Framework Peddler</p>
            </div> */}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-xl mx-5 " : "text-xl mx-5"
              }
            >
              Home
            </NavLink>

            {user?.email && (
              <>
                <NavLink
                  to={"/dashboard/myproducts"}
                  className={({ isActive }) =>
                    isActive ? "text-xl mx-5 " : "text-xl mx-5"
                  }
                >
                  <li>Dashboard</li>
                </NavLink>
              </>
            )}
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                isActive ? "text-xl mx-5 " : "text-xl mx-5"
              }
            >
              <li>Products</li>
            </NavLink>
          </ul>
        </div>

        <div className="navbar-center">
          <Link
            to={"/"}
            className=" rounded-md normal-case text-xl block lg:hidden le`ad`ing-10 bg-amber-300 px-2 hover:bg-amber-400 active:scale-95 transition-all"
          >
            <div className="flex justify-between items-center">
              <img
                src={"https://i.ibb.co/Xz8sZ0N/Red-and-Gray-Modern-Tech-Business-Logo.png"}
                alt=""
                className="w-12 h-12 rounded-full mr-2 hidden lg:block "
              />
              {/* <p className="font-bold text-black">Framework Peddler</p> */}
            </div>
          </Link>
        </div>

        <div className="navbar-end  flex items-center">
          {user && user?.email && (
            <label
              htmlFor="dashboard-drawer"
              tabIndex={2}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          )}

          {/* Search box begins */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex justify-center items-center gap-x-2 rounded-md mr-4"
          >
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="Search Here"
              className="input-sm px-5 py-2 bg-inherit rounded-md w-full max-w-xs border border-zinc-700"
            />
            <input
              type="button"
              value={"Search"}
              className="btn-sm btn-info rounded-md cursor-pointer active:scale-95 active:opacity-80 transition-all"
            />
          </form>
          {/* Search box ends */}

          {user?.email && user?.uid ? (
            <div className="bg-amber-300 rounded-md hidden lg:block  px-2 mx-3 shadow-md ">
              <h4 className="text-black">Welcome,</h4>
              <p className="font-bold text-black">{user?.displayName}</p>
            </div>
          ) : (
            <>
              <Link className="mx-2 hidden lg:block" to={"/login"}>
                Login
              </Link>
              <Link className="mx-2 hidden lg:block" to={"/register"}>
                Register
              </Link>
            </>
          )}

          <div className="dropdown dropdown-end ">
            <label
              tabIndex={0}
              className="avatar tooltip tooltip-bottom z-50 mr-10"
              data-tip={`${
                user?.displayName ? user.displayName : "Please, login"
              }`}
            >
              <div className="w-10 rounded-full ">
                {user && user.uid ? (
                  <>
                    <img
                      src={user.photoURL}
                      alt=""
                      className="tooltip tooltip-bottom"
                      data-tip=""
                    />
                  </>
                ) : (
                  // <HiUser
                  //   className="text-4xl tooltip tooltip-bottom"
                  //   data-tip="Login to see username"
                  // />
                  <img
                    src="https://i.ibb.co/sHJw3ZH/avatar-Null.webp"
                    alt=""
                    className="tooltip tooltip-bottom w-5 h-5"
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ${
                user ? "" : "hidden"
              }`}
            >
              {user && user.uid ? (
                <>
                  <li>
                    <Link to={"/"} className="justify-between">
                      Profile
                      <span className="badge animate-pulse">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() =>
                        logOut().then(() =>
                          toast.success("Logged out successfully!")
                        )
                      }
                      to={"/"}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="lg:hidden">
                    <Link to={"/login"}>Login</Link>
                  </li>
                  <li className="lg:hidden">
                    <Link to={"/register"}>Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
