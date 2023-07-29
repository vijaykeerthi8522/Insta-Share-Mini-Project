import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      alt="page not found"
      src="https://res.cloudinary.com/dxjowybhg/image/upload/v1664014232/not-found_rb0oea.png"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found.
      <br />
      Please go back to the home page.
    </p>
    <Link to="/" className="links">
      <button className="not-found-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound
