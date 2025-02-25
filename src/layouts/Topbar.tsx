import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store";
import { useViewPort } from "../hooks";
import { changeLayoutTheme, changeSideBarType } from "../redux/actions";
import { LayoutTheme, SideBarType } from "../constants/layout";



import { TopBarSearch, MaximizeScreen, NotificationDropdown, ProfileDropDown, } from "../components";

export interface NotificationItem {
  id: number;
  text: string;
  subText: string;
  icon?: string;
  avatar?: string;
  bgColor?: string;
  createdAt: Date;
}

export type ProfileMenuItem = {
  label: string;
  icon: string;
  redirectTo: string;
}

/**
 * notification items
 */
const notifications: NotificationItem[] = []

/**
 * profile menu items
 */
const profileMenus: ProfileMenuItem[] = [
];

/**
 * for subtraction minutes
 */
function subtractHours(date: Date, minutes: number) {
  date.setMinutes(date.getMinutes() - minutes);
  return date;
}

const Topbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { width } = useViewPort();

  const {
    layoutTheme,
    sideBarType,
  } = useSelector((state: RootState) => ({
    layoutTheme: state.Layout.layoutTheme,
    sideBarType: state.Layout.sideBarType,
  }));

  /**
  * Toggle the leftmenu when having mobile screen
  */
  const handleLeftMenuCallBack = () => {
    if (width < 1140) {
      if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_MOBILE) {
        showLeftSideBarBackdrop();
        document.getElementsByTagName('html')[0].classList.add('sidenav-enable');
      } else {
        dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_MOBILE));
      }
    } else if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_SMALL) {
      dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT));
    } else if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_MOBILE) {
      showLeftSideBarBackdrop();
      document.getElementsByTagName('html')[0].classList.add('sidenav-enable');
      toggleBodyStyle(true)
    } else if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_HIDDEN) {
      dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT));
      document.getElementsByTagName('html')[0].classList.add('sidenav-enable');
    }
    else {
      dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_SMALL))
    }
  }

  /**
   * toggling style to the body tag
   */
  function toggleBodyStyle(set: boolean) {
    if (set == false) {
      document.body.removeAttribute('style')
    }
    else {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '16px'
    }
  }

  /**
   * creates backdrop for leftsidebar
   */
  function showLeftSideBarBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.id = 'backdrop';
    backdrop.className = 'transition-all fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80';
    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', function () {
      document.getElementsByTagName('html')[0].classList.remove('sidenav-enable');
      toggleBodyStyle(false)
      dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_MOBILE));
      hideLeftSideBarBackdrop();
    });
  }

  function hideLeftSideBarBackdrop() {
    const backdrop = document.getElementById('backdrop');
    document.getElementsByTagName('html')[0].classList.remove('sidenav-enable');
    if (backdrop) {
      document.body.removeChild(backdrop);
      document.body.style.removeProperty('overflow');
    }
  }

  /**
  * Toggle Dark Mode
  */
  const toggleDarkMode = () => {
    if (layoutTheme === 'dark') {
      dispatch(changeLayoutTheme(LayoutTheme.THEME_LIGHT));
    } else {
      dispatch(changeLayoutTheme(LayoutTheme.THEME_DARK));
    }
  }

  return (
    <>
      <header className="app-header flex items-center px-4 gap-3">
        <button
          id="button-toggle-menu"
          className="nav-link p-2"
          onClick={handleLeftMenuCallBack}
        >
          <span className="sr-only">Menu Toggle Button</span>
          <span className="flex items-center justify-center h-6 w-6">
            <i className="mgc_menu_line text-xl"></i>
          </span>
        </button>

        <Link to="/" className="logo-box">

          {/* <div className="logo-light">
            <img src={logoLight} className="logo-lg h-6" alt="Light logo" />
            <img src={logoSm} className="logo-sm" alt="Small logo" />
          </div>


          <div className="logo-dark">
            <img src={logoDark} className="logo-lg h-6" alt="Dark logo" />
            <img src={logoSm} className="logo-sm" alt="Small logo" />
          </div> */}
        </Link>


        <TopBarSearch />

        <MaximizeScreen />

        <NotificationDropdown notifications={notifications} />

        <div className="flex">
          <button
            id="light-dark-mode"
            type="button"
            className="nav-link p-2"
            onClick={toggleDarkMode}
          >
            <span className="sr-only">Light/Dark Mode</span>
            <span className="flex items-center justify-center h-6 w-6">
              <i className="mgc_moon_line text-2xl"></i>
            </span>
          </button>
        </div>

        <ProfileDropDown
          menuItems={profileMenus}
        />

      </header>
    </>
  )
}

export default Topbar