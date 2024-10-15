import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from '@nextui-org/react'
import { useLocation } from 'react-router-dom'
import { AcmeLogo } from './AcmeLogo.jsx'

export const NaviBar = () => {
  const location = useLocation()
  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">SECSE</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-10 sm:flex" justify="start">
        <NavbarItem isActive={location.pathname === '/new'}>
          <Link
            color={
              location.pathname.startsWith('/new') ? 'primary' : 'foreground'
            }
            href="/new"
          >
            New
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/monitor'}>
          <Link
            color={location.pathname === '/monitor' ? 'primary' : 'foreground'}
            href="/monitor"
          >
            Monitor
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/edit'}>
          <Link
            color={location.pathname === '/edit' ? 'primary' : 'foreground'}
            href="/edit"
          >
            Edit
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
