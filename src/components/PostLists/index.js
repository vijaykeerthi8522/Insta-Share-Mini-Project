import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'

import './index.css'
import SearchContext from '../../SearchContext'

const PostLists = props => {
  const {posts, theme} = props
  return (
    <SearchContext.Consumer>
      {value => {
        const {likeIcon, unlikeIcon} = value
        const {
          postId,
          userId,
          username,
          likeStatus,
          profilePic,
          imageUrl,
          caption,
          likesCount,
          comments,
          createdAt,
        } = posts

        const likeButton = () => {
          likeIcon(postId)
        }

        const unlikeButton = () => {
          unlikeIcon(postId)
        }

        const postItemsList = theme ? 'post-items-lists3' : 'post-items-list1'
        const profileName = theme ? 'profile-name texts2' : 'profile-name texts'
        const likes = theme ? 'likes texts2' : 'likes texts'
        const captions = theme ? 'caption texts2' : 'caption texts'
        const userComment = theme ? 'user-comment texts2' : 'user-comment texts'
        const sub = theme ? 'user-comment texts2 sub' : 'user-comment texts sub'

        return (
          <li className={postItemsList}>
            <div className="post-profile-container">
              <div className="profile-circle">
                <img
                  className="post-profile"
                  alt="post author profile"
                  src={profilePic}
                />
              </div>
              <Link to={`/users/${userId}`} className="links">
                <p className={profileName}>{username}</p>
              </Link>
            </div>
            <img className="post-image" alt="post" src={imageUrl} />
            <div className="post-icons-container">
              {likeStatus ? (
                <button
                  className="button-icons"
                  type="button"
                  // eslint-disable-next-line react/no-unknown-property
                  testId="unLikeIcon"
                  onClick={unlikeButton}
                >
                  <FcLike className="post-icons" />
                </button>
              ) : (
                <button
                  className="button-icons"
                  type="button"
                  // eslint-disable-next-line react/no-unknown-property
                  testId="likeIcon"
                  onClick={likeButton}
                >
                  <BsHeart className="post-icons" />
                </button>
              )}
              <button className="button-icons" type="button">
                <FaRegComment className="post-icons" />
              </button>
              <button className="button-icons" type="button">
                <BiShareAlt className="post-icons" />
              </button>
            </div>
            <div className="comments-count-container">
              <p className={likes}>{likesCount} likes</p>
              <p className={captions}>{caption}</p>
              <ul className="comments-container">
                {comments.map(each => (
                  <li className="comments-list" key={each.userId}>
                    <p className={userComment}>
                      <span className={sub}>{each.username}</span>
                      {each.comment}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="created">{createdAt}</p>
            </div>
          </li>
        )
      }}
    </SearchContext.Consumer>
  )
}
export default PostLists
