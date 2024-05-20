import { Outlet } from 'react-router-dom';


export default function Root() {
  return (
    <h1>
      <div>I am Root</div>
      <Outlet />
    </h1>
  );
}