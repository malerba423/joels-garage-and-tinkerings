import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom'

export default function Layout() {
  const [params] = useSearchParams()
  const { pathname } = useLocation()
  const availableView = pathname === '/' && params.get('status') === 'available'
  const current = (on: boolean) => (on ? { className: 'active', 'aria-current': 'page' as const } : {})
  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="site-title">
          <span className="badge">JG&amp;T</span>
          <span>Joel's Garage &amp; Tinkerings</span>
        </Link>
        <nav className="site-nav">
          <Link to="/" {...current(pathname === '/' && !availableView)}>
            01 Index
          </Link>
          <Link to="/?status=available" {...current(availableView)}>
            02 Available
          </Link>
          <Link to="/work-orders" {...current(pathname === '/work-orders')}>
            03 Work orders
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
        <span>Every piece ships with a numbered parts tag.</span>
      </footer>
    </div>
  )
}
