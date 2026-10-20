import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="site-title">
          Joel's Garage <span className="amp">&amp;</span> Tinkerings
        </Link>
        <nav>
          <Link to="/present" className="button">
            ▶ Present
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">© {new Date().getFullYear()} Joel</footer>
    </div>
  )
}
