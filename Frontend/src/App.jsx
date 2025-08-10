import { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import LoadingScreen from "./components/Items/LoadingScreen";

const Index = lazy(() => import("./components/pages/Index"));
const Shop = lazy(() => import("./components/pages/Shop"));
const Contact = lazy(() => import("./components/pages/Contact"));
const Collections = lazy(() => import("./components/pages/Collections"));
const BookDemo = lazy(() => import("./components/pages/BookDemo"));
const ProductDetail = lazy(() => import("./components/pages/ProductDetail"));
const FabricDetail = lazy(() => import("./components/pages/FabricDetail"));
const FabricCollections = lazy(() => import("./components/pages/FabricCollections"));
const FabricCollectionDetail = lazy(() => import("./components/pages/FabricCollectionDetail"));
const SofaCollections = lazy(() => import("./components/pages/SofaCollections"));
const Wishlist = lazy(() => import("./components/pages/Wishlist"));
const Cart = lazy(() => import("./components/pages/Cart/Cart"));
const NotFound = lazy(() => import("./components/pages/NotFound"));

const Account = lazy(() => import("./components/Account/Account"));
const Orders = lazy(() => import("./components/Account/Orders"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Addresses = lazy(() => import("./components/Profile/Addresses"));
const Delete = lazy(() => import("./components/Profile/Delete"));

const MobileAccount = lazy(() => import("./components/MobileAccount/Account"));
const MobileOrders = lazy(() => import("./components/MobileAccount/Orders"));
const MobileAddresses = lazy(() => import("./components/MobileAccount/Addresses"));
const MobileDeleteAccount = lazy(() => import("./components/MobileAccount/Delete"));
const Details = lazy(() => import("./components/MobileAccount/Details"));

const Login = lazy(() => import("./components/Authentication/Login"));
const Signup = lazy(() => import("./components/Authentication/Signup"));
const MobileLogin = lazy(() => import("./components/Authentication/MobileLogin"));
const MobileSignup = lazy(() => import("./components/Authentication/MobileSignup"));
const AdminLogin = lazy(() => import("./admin/Authentication/AdminLogin"));
const MobileAdminLogin = lazy(() => import("./admin/Authentication/MobileAdminLogin"));

const Admin = lazy(() => import("./admin/Layout"));
const DashboardPage = lazy(() => import("./admin/Dashboard"));
const OrdersPage = lazy(() => import("./admin/Orders"));
const AdminProductsList = lazy(() => import("./admin/Products"));
const AdminCollectionsList = lazy(() => import("./admin/Collectons"));
const AdminFabricsList = lazy(() => import("./admin/Fabrics"));

import ProtectedRoute from "./components/Items/ProtectedRoute";
import AdminProtectedRoute from "./admin/Authentication/ProtectedRoute";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import ResetPassword from "./components/Authentication/ResetPassword";
import Bookings from "./admin/Bookings";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userAuthRoutes = isMobile ? (
    <>
      <Route path="/login" element={<MobileLogin />} />
      <Route path="/signup" element={<MobileSignup />} />
      <Route path="/adminlogin123" element={<MobileAdminLogin />} />
      <Route path="/verify-email" element={<VerifyEmail/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/> 
    </>
  ) : (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/adminlogin123" element={<AdminLogin />} />
      <Route path="/verify-email" element={<VerifyEmail/>}/> 
      <Route path="/reset-password" element={<ResetPassword/>}/> 
    </>
  );

  const userProtectedRoutes = (
    <Route element={<ProtectedRoute />}>
      <Route path="/home" element={<Index />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/book-demo" element={<BookDemo />} />
      <Route path="/sofa-collections" element={<SofaCollections />} />
      <Route path="/fabric-collections" element={<FabricCollections />} />
      <Route path="/fabric-collection/:collectionId" element={<FabricCollectionDetail />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/fabric/:fabricId" element={<FabricDetail />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />

      {!isMobile ? (
        <Route path="account" element={<Account />}>
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="savedcards" element={<div>Saved Cards</div>} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="delete" element={<Delete />} />
        </Route>
      ) : (
        <>
          <Route path="account" element={<MobileAccount />} />
          <Route path="orders" element={<MobileOrders />} />
          <Route path="account/details" element={<Details />} />
          <Route path="account/addresses" element={<MobileAddresses />} />
          <Route path="account/delete" element={<MobileDeleteAccount />} />
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </Route>
  );

  const adminRoutes = (
    <Route element={<AdminProtectedRoute requiredRole="admin" />}>
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="products" element={<AdminProductsList />} />
        <Route path="collections" element={<AdminCollectionsList />} />
        <Route path="fabrics" element={<AdminFabricsList />} />
        <Route path="bookings" element={<Bookings/>}/>
      </Route>
    </Route>
  );

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Toaster position="top-right" richColors offset={75} />
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {userAuthRoutes}
            {userProtectedRoutes}
            {adminRoutes}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </Suspense>
  );
}

export default App;