import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>A Scrapable Site</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/cats">Cats</Link> |{" "}
        <Link to="/people">People</Link>
      </nav>
      <Outlet />
    </div>
  );
}