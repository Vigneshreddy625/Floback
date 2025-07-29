import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/Store/Store.js";
import { AuthProvider } from "./authContext/useAuth.jsx";
// import { ThemeProvider } from "./components/Darkmode/Theme-provider.jsx";
// import { registerSW } from "virtual:pwa-register";
import { WishlistProvider } from "./wishlistContext/useWishlist.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </AuthProvider>
      </Provider>
  </StrictMode>
);
