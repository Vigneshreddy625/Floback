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
// import AdminCollectionsList from "./admin/Collectons";
import AdminFabricsList from "./admin/Fabrics";
import DashboardPage from "./admin/Dashboard";
import GenericPage from "../../../Revispy/Frontend/src/admin/Generics";
import AdminCollectionsList from "./admin/Collectons";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ProtectedRoute from "./components/Items/ProtectedRoute"
import { Suspense } from "react";
import LoadingScreen from "./components/Items/LoadingScreen";
// import Cart from "./components/pages/Cart/Cart"

const App = () => (
  <Suspense fallback={<LoadingScreen />}>
        <Toaster position="top-right" richColors offset={75} />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/fabric/:fabricId" element={<FabricDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* <Route path="/cart" element={<Cart/>}/> */}
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
          <Route path="customers" element={<GenericPage />} />
          <Route path="reports" element={<GenericPage />} />
          <Route path="statistic" element={<GenericPage />} />
          <Route path="notification" element={<GenericPage />} />
          <Route path="help" element={<GenericPage />} />
          <Route path="settings" element={<GenericPage />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Suspense>
);

export default App;
