import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Part not found.</h1>
      <Link to="/">Back to the catalog</Link>
    </div>
  );
}
