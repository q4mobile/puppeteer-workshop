import { Link, Outlet } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import { index } from "../../../db_api.js";

export default function cats() {
  let cats = index('cats');
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {cats.map((cat) => (
          <NavLink id="cat_list"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/cats/${cat.id}`}
            key={cat.id}
          >
            <span className="cat_name">{cat.name}</span>
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
