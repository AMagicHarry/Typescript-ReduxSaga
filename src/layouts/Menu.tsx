import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
// import { Collapse } from 'react-bootstrap';

// helpers
import { findAllParent, findMenuItem } from '../helpers/menu';

// constants
import { MenuItemTypes } from '../constants/menu'
import { SimpleCollapse } from '../components/FrostUI';

interface SubMenus {
  item: MenuItemTypes;
  linkClassName?: string;
  subMenuClassNames?: string;
  activeMenuItems?: Array<string>;
  toggleMenu?: (item: any, status: boolean) => void;
  className?: string;
}

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu, }: SubMenus) => {

  const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key));

  useEffect(() => {
    setOpen(activeMenuItems!.includes(item.key));
  }, [activeMenuItems, item]);

  const toggleMenuItem = () => {
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return (
    <li className='menu-item'>
      <Link
        to='#'
        className={`${linkClassName} ${(activeMenuItems!.includes(item.key) && open) ? 'open' : ''}`}
        aria-expanded={open}
        data-menu-key={item.key}
        onClick={toggleMenuItem}
      >
        {item.icon && (
          <span className='menu-icon'>
            <i className={item.icon} />
          </span>
        )}
        <span className='menu-text'> {item.label} </span>
        <span className='menu-arrow' />
      </Link>
      <SimpleCollapse open={open} as="ul" classNames={subMenuClassNames}>
        {(item.children || []).map((child, idx) => {
          return (
            <React.Fragment key={idx}>
              {child.children ? (
                <MenuItemWithChildren
                  item={child}
                  linkClassName={activeMenuItems!.includes(child.key) ? " active" : ""}
                  activeMenuItems={activeMenuItems}
                  subMenuClassNames=''
                  toggleMenu={toggleMenu}
                />
              ) : (
                <MenuItem
                  item={child}
                  className='menu-item'
                  linkClassName={`menu-link ${(activeMenuItems!.includes(child.key)) ? " active" : ""}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </SimpleCollapse>
    </li>
  );
};

const MenuItem = ({ item, linkClassName }: SubMenus) => {
  return (
    <li className={'menu-item'}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};

const MenuItemLink = ({ item, className }: SubMenus) => {
  return (
    <Link
      to={item.url!}
      target={item.target}
      className={`side-nav-link-ref ${className}`}
      data-menu-key={item.key}
    >
      {item.icon && (
        <span className='menu-icon'>
          <i className={item.icon} />
        </span>
      )}
      <span className='menu-text'>{item.label}</span>
    </Link>
  )
}

/**
 * Renders the application menu
 */
interface AppMenuProps {
  menuItems: MenuItemTypes[];
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
  const location = useLocation();
  const menuRef = useRef(null);



  return (
    <>
      <ul
        className='menu'
        ref={menuRef}
        id='main-side-menu'
      >
        {(menuItems || []).map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {item.isTitle ? (<li className='menu-title'>
                {item.label}
              </li>) : (<>
                {item.children ? (
                  <MenuItemWithChildren
                    item={item}
                    subMenuClassNames='sub-menu'
                    linkClassName={`menu-link`}
                  />
                ) : (
                  <MenuItem
                    item={item}
                    linkClassName={`menu-link ${location.pathname === item.url ? 'active' : ''}`}
                  />
                )}
              </>)}
            </React.Fragment>
          )
        })}
      </ul>
    </>
  )
}

export default AppMenu
