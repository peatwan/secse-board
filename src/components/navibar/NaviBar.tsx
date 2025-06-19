import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { useLocation } from 'react-router-dom'
import { AcmeLogo } from './AcmeLogo.jsx'
import { Link } from 'react-router-dom'
import { Link as HLink } from '@heroui/link'
import { GithubIcon } from 'assets/icons/GithubIcon.js'
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
        {/* todo: edit page */}
        {/* <NavbarItem isActive={location.pathname === '/edit'}>
          <Link to="/edit">Edit</Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 sm:flex">
          <HLink
            isExternal
            href="https://github.com/peatwan/secse-board"
            title="GitHub"
          >
            <GithubIcon className="text-default-500" />
          </HLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
