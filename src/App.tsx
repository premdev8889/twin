import { Outlet } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* FIXED SIDEBAR WRAPPER */}
      <div className="fixed left-0 top-0 bottom-0 z-40 w-[72px]">
        <Sidebar />
      </div>

      {/* CONTENT AREA (gives space for fixed sidebar) */}
      <div className="pl-[70px] pr-0"> 
        {/* STICKY HEADER */}
        <div className="sticky top-0 z-30">
          <Navbar title="Automation" theme={theme} onToggleTheme={toggle} />
        </div>

        {/* MAIN CONTENT */}
        <main
          className="
            mt-4 rounded-[28px] border border-slate-200/70 bg-white/80 p-6 
            shadow-[0_30px_80px_-40px_rgba(59,130,246,0.25)] backdrop-blur
            dark:border-slate-700/60 dark:bg-slate-900/60
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
