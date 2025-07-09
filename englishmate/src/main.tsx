import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./routes/index.tsx";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
