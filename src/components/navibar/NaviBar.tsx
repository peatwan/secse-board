import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button
} from '@nextui-org/react'
import { useLocation } from 'react-router-dom'
import { AcmeLogo } from './AcmeLogo.jsx'
import { Link } from 'react-router-dom'
export const NaviBar = () => {
  const location = useLocation()
  return (
    <Navbar
      classNames={{
        item: ['data-[active=true]:text-primary']
      }}
    >
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">SECSE</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-10 sm:flex" justify="start">
        <NavbarItem isActive={location.pathname.startsWith('/new')}>
          <Link to="/new">New</Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/monitor'}>
          <Link to="/monitor">Monitor</Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/edit'}>
          <Link to="/edit">Edit</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
