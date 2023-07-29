import {BiCamera} from 'react-icons/bi'
import SearchContext from '../../SearchContext'

import './index.css'

const UserPosts = props => {
  const {posts, my} = props

  const postView = () => (
    <ul className="user-posts-container">
      {posts.map(each => (
        <li className="user-posts-list" key={each.id}>
          <img
            className="user-post-image"
            alt={`${my} post`}
            src={each.image}
          />
        </li>
      ))}
    </ul>
  )

  const noPosts = () => (
    <SearchContext.Consumer>
      {value => {
        const {isDark} = value

        const cam = isDark ? 'cam2' : 'cam'
        const noPostImage = isDark ? 'no-post-image2' : 'no-post-image'
        const noPost = isDark ? 'no-post2' : 'no-post'

        return (
          <div className="no-posts-container">
            <div className={cam}>
              <BiCamera className={noPostImage} />
            </div>
            <h1 className={noPost}>No Posts</h1>
          </div>
        )
      }}
    </SearchContext.Consumer>
  )

  const getPosts = () => {
    if (posts.length === 0) {
      return noPosts()
    }
    return postView()
  }

  return getPosts()
}
export default UserPosts
