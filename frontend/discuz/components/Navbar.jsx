import { Link,Outlet } from "react-router-dom";
const Navbar = () => {
  return <>
  <div className="background_nav">
  <nav className="body_nav">
    <div className="logo-block">
    <img src="../src/assests/logo.png" alt="logo" id = "logo" />
    <h1 id="heading-logo">Discuz</h1>
    </div>
  <ul className="d-flex align-items-center gap-5 navbar">
        <li> <Link className="nav-links" to={""}>Home</Link></li>
        <li> <Link className="nav-links" to={"chat"}>Chat</Link></li>
        <li> <Link className="nav-links" to={"discussion"}>Discussion</Link></li>
        <li><Link className="nav-links" to={"profile"}>Profile</Link></li>
      </ul>
  </nav>
  </div>
  <Outlet/>

  
  </>;
};

export default Navbar;
