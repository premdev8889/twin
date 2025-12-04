import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow p-4">
        <nav className="flex gap-4">
          <NavLink to="/" className="hover:underline">Home</NavLink>
          <NavLink to="/about" className="hover:underline">About</NavLink>
        </nav>
      </header>
      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
