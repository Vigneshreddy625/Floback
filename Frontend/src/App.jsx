
import { Toaster } from "sonner";
import {TooltipProvider} from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/pages/Index"
import Shop from "./components/pages/Shop";
import Contact from "./components/pages/Contact";
import Collections from "./components/pages/Collections"
import BookDemo from "./components/pages/BookDemo";
import ProductDetail from "./components/pages/ProductDetail";
import FabricDetail from "./components/pages/FabricDetail";
import FabricCollections from "./components/pages/FabricCollections";
import FabricCollectionDetail from "./components/pages/FabricCollectionDetail";
import SofaCollections from "./components/pages/SofaCollections";
import NotFound from "./components/pages/NotFound";
import Wishlist from "./components/pages/Wishlist"

const App = () => (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/sofa-collections" element={<SofaCollections />} />
          <Route path="/fabric-collections" element={<FabricCollections />} />
          <Route path="/fabric-collection/:collectionId" element={<FabricCollectionDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/fabric/:fabricId" element={<FabricDetail />} />
          <Route path = "/wishlist" element={<Wishlist/>}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
);

export default App;
