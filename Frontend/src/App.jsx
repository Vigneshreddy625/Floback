import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./components/pages/Index";
import Shop from "./components/pages/Shop";
import Contact from "./components/pages/Contact";
import Collections from "./components/pages/Collections";
import BookDemo from "./components/pages/BookDemo";
import ProductDetail from "./components/pages/ProductDetail";
import FabricDetail from "./components/pages/FabricDetail";
import FabricCollections from "./components/pages/FabricCollections";
import FabricCollectionDetail from "./components/pages/FabricCollectionDetail";
import SofaCollections from "./components/pages/SofaCollections";
import NotFound from "./components/pages/NotFound";
import Wishlist from "./components/pages/Wishlist";
import AddItem from "./admin/Modals/AddProduct";
import AddFabric from "./admin/Modals/AddFabric";
import AddCollection from "./admin/Modals/AddCollection";
import Admin from "./admin/Layout";
import AdminProductsList from "./admin/Products";
import OrdersPage from "./admin/Orders";
import AdminFabricsList from "./admin/Fabrics";
import DashboardPage from "./admin/Dashboard";
import AdminCollectionsList from "./admin/Collectons";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ProtectedRoute from "./components/Items/ProtectedRoute";
import Account from "./components/Account/Account";
import Orders from "./components/Account/Orders";
import Profile from "./components/Profile/Profile";
import Addresses from "./components/Profile/Addresses";
import Delete from "./components/Profile/Delete";
import { Suspense } from "react";
import LoadingScreen from "./components/Items/LoadingScreen";
import Cart from "./components/pages/Cart/Cart";
import MobileAccount from "./components/MobileAccount/Account";
import MobileDeleteAccount from "./components/MobileAccount/Delete";
import MobileAddresses from "./components/MobileAccount/Addresses";
import Details from "./components/MobileAccount/Details";
import MobileOrders from "./components/MobileAccount/Orders";
import MobileSignup from "./components/Authentication/MobileSignup";
import MobileLogin from "./components/Authentication/MobileLogin";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Toaster position="top-right" richColors offset={75} />
      <BrowserRouter>
        <Routes>
          {!isMobile ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<MobileLogin />} />
              <Route path="/signup" element={<MobileSignup />} />
            </>
          )}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin/add-item" element={<AddItem />} />
            <Route path="/admin/add-fabric" element={<AddFabric />} />
            <Route path="/admin/add-collection" element={<AddCollection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/sofa-collections" element={<SofaCollections />} />
            <Route path="/fabric-collections" element={<FabricCollections />} />
            <Route
              path="/fabric-collection/:collectionId"
              element={<FabricCollectionDetail />}
            />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/fabric/:fabricId" element={<FabricDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            {!isMobile && (
              <Route path="account" element={<Account />}>
                <Route path="orders" element={<Orders />} />
                <Route path="profile" element={<Profile />} />
                <Route path="savedcards" element={<div>Saved Cards</div>} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="delete" element={<Delete />} />
              </Route>
            )}
            {isMobile && (
              <>
                <Route path="account" element={<MobileAccount />} />
                <Route path="orders" element={<MobileOrders />} />
                <Route path="account/details" element={<Details />} />
                <Route path="account/addresses" element={<MobileAddresses />} />
                <Route
                  path="account/delete"
                  element={<MobileDeleteAccount />}
                />
              </>
            )}
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="products" element={<AdminProductsList />} />
              <Route path="collections" element={<AdminCollectionsList />} />
              <Route path="fabrics" element={<AdminFabricsList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
