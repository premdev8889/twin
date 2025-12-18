import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/layout/Navbar";
import Sidebar, { MobileMenu, mobileItems, subscriptionTwins } from "./components/layout/Sidebar";

export default function App() {
  const { theme, toggle } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();

  // Close sidebar drawer on route change (mobile)
  useEffect(() => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  }, [pathname]);

  // Body scroll lock for sidebar drawer
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isSidebarOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 overflow-x-hidden">
      {/* Desktop fixed sidebar */}
      <div className="fixed left-0 top-0 bottom-0 z-40 w-[72px] hidden sm:block">
        <Sidebar isLoggedIn={isLoggedIn}/>
      </div>

      {/* Content */}
      <div className="pl-0 sm:pl-[72px]">
        {/* Sticky header */}
        <div className="fixed top-0 z-30 w-full sm:w-[95%]">
          <Navbar
            title="Automation"
            theme={theme}
            onToggleTheme={toggle}
            onOpenSidebar={() => setIsSidebarOpen(true)} 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        </div>

        {/* Main */}
        <main className="px-3 sm:px-6 py-4 mt-8">
          <div className="mx-auto w-full ">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <MobileMenu
          onClose={() => setIsSidebarOpen(false)}
          items={mobileItems}
          twins={subscriptionTwins}
          pathname={pathname}
        />
      )}
    </div>
  );
}
