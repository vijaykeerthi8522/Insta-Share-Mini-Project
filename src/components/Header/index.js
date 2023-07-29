import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {FaSearch, FaMoon} from 'react-icons/fa'
import {RiSunFill} from 'react-icons/ri'
import {AiOutlineMenu, AiFillCloseCircle} from 'react-icons/ai'

import './index.css'
import SearchContext from '../../SearchContext'

class Header extends Component {
  state = {showHamburger: false, isSearch: false, homeClick: false}

  clickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  menuList = () => {
    this.setState(prev => ({
      showHamburger: !prev.showHamburger,
      isSearch: false,
    }))
  }

  showSearchBar = () => {
    this.setState(prev => ({
      isSearch: !prev.isSearch,
      showHamburger: !prev.showHamburger,
    }))
  }

  onHomeClick = () => {
    this.setState(prev => ({homeClick: !prev.homeClick}))
  }

  render() {
    const {showHamburger, isSearch, homeClick} = this.state
    const home = homeClick ? 'search' : 'search text2'
    // console.log(homeClick)
    return (
      <SearchContext.Consumer>
        {value => {
          const {
            changeSearchInput,
            enterSearchButton,
            clickSearchButton,
            isDark,
            changeTheme,
          } = value

          const onChangeTheme = () => {
            changeTheme()
          }

          const searchResult = event => {
            changeSearchInput(event.target.value)
          }

          const enterSearch = event => {
            if (event.key === 'Enter') {
              enterSearchButton()
            }
          }

          const clickSearchResult = () => {
            clickSearchButton()
          }

          const navHeader = isDark ? 'nav-header nav-head' : 'nav-header'
          const navHeading = isDark ? 'web-heading web-heading2' : 'web-heading'
          const navSearch = isDark ? 'nav-search nav-search2' : 'nav-search'
          const menuIcon = isDark ? 'menu-icon theme' : 'menu-icon'
          const closeIcon = isDark ? 'close-icon theme' : 'close-icon'
          // console.log(isDark)
          return (
            <nav className={navHeader}>
              <div className="nav-lg-container">
                <div className="header-logo">
                  <Link to="/" className="links">
                    <img
                      className="website-logo"
                      alt="website logo"
                      src="https://res.cloudinary.com/dxjowybhg/image/upload/v1663949395/website-logo_gsc5ig.png"
                    />
                  </Link>
                  <h1 className={navHeading}>Insta Share</h1>
                </div>
                <ul className="nav-links-container">
                  <li className="nav-link">
                    <div className={navSearch}>
                      <input
                        className="search-input"
                        type="search"
                        placeholder="Search Caption"
                        onChange={searchResult}
                        onKeyDown={enterSearch}
                      />
                      <button
                        className="search-button"
                        // eslint-disable-next-line react/no-unknown-property
                        testId="searchIcon"
                        type="button"
                        onClick={clickSearchResult}
                      >
                        <FaSearch className="search-icon" />
                      </button>
                    </div>
                  </li>
                  <Link to="/" className="links">
                    <li className="nav-link">
                      <button
                        className={home}
                        type="button"
                        onClick={this.onHomeClick}
                      >
                        Home
                      </button>
                    </li>
                  </Link>
                  <Link to="/my-profile" className="links">
                    <li className="nav-link">
                      <button className="search text2" type="button">
                        Profile
                      </button>
                    </li>
                  </Link>
                  <li className="nav-link">
                    <button
                      className="theme-button"
                      type="button"
                      onClick={onChangeTheme}
                    >
                      {isDark ? (
                        <RiSunFill className="theme-icon theme" />
                      ) : (
                        <FaMoon className="theme-icon" />
                      )}
                    </button>
                  </li>
                  <li className="nav-link">
                    <button
                      className="logout-button"
                      type="button"
                      onClick={this.clickLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <div className="nav-sm-container">
                <div className="menu-header">
                  <div className="header-logo">
                    <Link to="/" className="links">
                      <img
                        className="website-logo"
                        alt="website logo"
                        src="https://res.cloudinary.com/dxjowybhg/image/upload/v1663949395/website-logo_gsc5ig.png"
                      />
                    </Link>
                    <h1 className={navHeading}>Insta Share</h1>
                  </div>
                  <ul className="nav-links-container nav2">
                    <li className="nav-link">
                      <button
                        className="theme-button"
                        type="button"
                        onClick={onChangeTheme}
                      >
                        {isDark ? (
                          <RiSunFill className="theme-icon theme" />
                        ) : (
                          <FaMoon className="theme-icon" />
                        )}
                      </button>
                    </li>
                    <li className="nav-link">
                      <button
                        className="theme-button"
                        type="button"
                        onClick={this.menuList}
                      >
                        <AiOutlineMenu className={menuIcon} />
                      </button>
                    </li>
                  </ul>
                </div>
                {showHamburger && (
                  <ul className="nav-links-container1">
                    <Link to="/" className="links">
                      <li className="nav-link">
                        <button
                          className={home}
                          type="button"
                          onClick={this.onHomeClick}
                        >
                          Home
                        </button>
                      </li>
                    </Link>

                    <li className="nav-link">
                      <button
                        className="search text2"
                        type="button"
                        onClick={this.showSearchBar}
                      >
                        Search
                      </button>
                    </li>
                    <Link to="/my-profile" className="links">
                      <li className="nav-link">
                        <button className="search text2" type="button">
                          Profile
                        </button>
                      </li>
                    </Link>
                    <li className="nav-link">
                      <button
                        className="logout-button"
                        type="button"
                        onClick={this.clickLogout}
                      >
                        Logout
                      </button>
                    </li>
                    <li className="nav-link close">
                      <button
                        className="search"
                        type="button"
                        onClick={this.menuList}
                      >
                        <AiFillCloseCircle className={closeIcon} />
                      </button>
                    </li>
                  </ul>
                )}
                {isSearch && (
                  <ul className="nav-links-container">
                    <li className={navSearch}>
                      <input
                        className="search-input"
                        type="search"
                        placeholder="Search Caption"
                        onChange={searchResult}
                        onKeyDown={enterSearch}
                      />
                      <button
                        className="search-button"
                        // eslint-disable-next-line react/no-unknown-property
                        testId="searchIcon"
                        type="button"
                        onClick={clickSearchResult}
                      >
                        <FaSearch className="search-icon" />
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default withRouter(Header)
