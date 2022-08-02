import { Outlet, NavLink } from 'react-router-dom';
import { index } from '../../../db_api';

export default function cats() {
  const catsData = index('cats');
  return (
    <div style={{ display: 'flex' }}>
      <nav
        className="cat_list"
        style={{
          borderRight: 'solid 1px',
          padding: '1rem'
        }}>
        {catsData.map((cat) => (
          <NavLink
            className="cat_list-item"
            style={({ isActive }) => {
              return {
                display: 'block',
                margin: '1rem 0',
                color: isActive ? 'red' : ''
              };
            }}
            to={`/cats/${cat.id}`}
            key={cat.id}>
            <span className="cat_name">{cat.name}</span>
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
