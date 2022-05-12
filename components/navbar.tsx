import Link from "next/link";
import { Nav } from "react-bootstrap";

const NavBar = () =>{
    return <Nav className="justify-content-center" activeKey="/home">
    <Nav.Item>
      <Nav.Link href="/">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/posts">Posts</Nav.Link>
    </Nav.Item>
  </Nav>
}

export default NavBar;