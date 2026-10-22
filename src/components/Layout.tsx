import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();
  const current = (on: boolean) =>
    on ? { className: "active", "aria-current": "page" as const } : {};
  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="site-title">
          <span className="badge">JG&amp;T</span>
          <span>Joel's Garage &amp; Tinkerings</span>
        </Link>
        <nav className="site-nav">
          <Link to="/" {...current(pathname === "/")}>
            01 Catalog
          </Link>
          <Link to="/work-orders" {...current(pathname === "/work-orders")}>
            02 Commissions
          </Link>
          <Link to="/present" className="button">
            ▶ Present
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Joel</span>
        <span>Every piece ships with its numbered stock tag.</span>
      </footer>
    </div>
  );
}
