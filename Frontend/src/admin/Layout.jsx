import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import OrderDetailCard from "./Orders/OrderDetailCard";
import OrderDetailModal from "./Orders/OrderDetailModal";
import useIsMobile from "../components/utils/useInMobile";
import FilterBar from "./Filter";
import { useLocation } from "react-router-dom";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen font-sans bg-black relative overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      </div>

      <MobileSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 rounded-md lg:my-4 lg:mr-4">
        <div className="sticky top-0 z-20">
          <MobileHeader onMenuClick={() => setIsMobileOpen(true)} />
          <div className="hidden lg:block">
            <Header />
          </div>
        </div>

        <div className="flex-1 flex overflow-y-auto">
          <div className="flex-1 overflow-y-auto">
            <Outlet context={{ selectedOrder, setSelectedOrder }} />
          </div>

          {!isMobile && selectedOrder && (
            <div className="hidden xl:block p-4 h-full w-80 flex-shrink-0">
              <OrderDetailCard
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
              />
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default MainLayout;
