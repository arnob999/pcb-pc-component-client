import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
// import AuthProvider from "./contexts/AuthProvider";
import { router } from "./Routes/Routes/routes";

function App() {
  return (
    <div className="App">
      {/* <AuthProvider> */}
      <RouterProvider router={router} />

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
            backdropFilter: "",
          },
        }}
      />
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
