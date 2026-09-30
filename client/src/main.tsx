import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AppProvider } from "./context/AppContext";

//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <BrowserRouter>
      <App />
       {/* <ToastContainer /> */ }
    </BrowserRouter>
  </AppProvider>
);