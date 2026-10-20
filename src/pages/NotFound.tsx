import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Nothing on this shelf.</h1>
      <Link to="/">Back to the gallery</Link>
    </div>
  )
}
