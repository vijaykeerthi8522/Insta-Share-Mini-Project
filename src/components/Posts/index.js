import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import SearchContext from '../../SearchContext'
import PostLists from '../PostLists'

const apiStatusUpdate = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Posts extends Component {
  state = {postLists: [], apiStatus: apiStatusUpdate.initial}

  componentDidMount() {
    this.getPostList()
  }

  getPostList = async () => {
    this.setState({apiStatus: apiStatusUpdate.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatePosts = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        username: each.user_name,
        profilePic: each.profile_pic,
        likeStatus: false,
        imageUrl: each.post_details.image_url,
        caption: each.post_details.caption,
        likesCount: each.likes_count,
        comments: each.comments.map(eachComment => ({
          username: eachComment.user_name,
          userId: eachComment.user_id,
          comment: eachComment.comment,
        })),
        createdAt: each.created_at,
      }))
      // console.log(updatePosts)
      this.setState({
        postLists: updatePosts,
        apiStatus: apiStatusUpdate.success,
      })
    } else {
      this.setState({apiStatus: apiStatusUpdate.failure})
    }
  }

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <SearchContext.Consumer>
      {value => {
        const {isDark} = value
        const failure = isDark ? 'failure-desc failure-desc2' : 'failure-desc'
        return (
          <div className="failure-view">
            <img
              className="failure-image"
              alt="failure view"
              src="https://res.cloudinary.com/dxjowybhg/image/upload/v1663949381/failure-view_id1apf.png"
            />
            <p className={failure}>Something went wrong. Please try again</p>
            <button
              className="failure-button"
              type="button"
              onClick={this.onRetry}
            >
              Try again
            </button>
          </div>
        )
      }}
    </SearchContext.Consumer>
  )

  onLikeButton = async postId => {
    const token = Cookies.get('jwt_token')
    const post = {like_status: true}
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    }
    await fetch(url, options)
    this.setState(prev => ({
      postLists: prev.postLists.map(each => {
        if (each.postId === postId) {
          return {
            ...each,
            likesCount: each.likesCount + 1,
            likeStatus: !each.likeStatus,
          }
        }
        return each
      }),
    }))
  }

  onUnlikeButton = async postId => {
    const token = Cookies.get('jwt_token')
    const post = {like_status: false}
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    }
    await fetch(url, options)
    this.setState(prev => ({
      postLists: prev.postLists.map(each => {
        if (each.postId === postId) {
          return {
            ...each,
            likesCount: each.likesCount - 1,
            likeStatus: !each.likeStatus,
          }
        }
        return each
      }),
    }))
  }

  onRetry = () => {
    this.setState({apiStatus: apiStatusUpdate.inProgress}, this.getPostList)
  }

  renderPostLists = () => {
    const {postLists} = this.state
    const {theme} = this.props
    return (
      <SearchContext.Provider
        value={{
          likeIcon: this.onLikeButton,
          unlikeIcon: this.onUnlikeButton,
        }}
      >
        <div className="posts-list-container">
          <ul className="post-lists">
            {postLists.map(each => (
              <PostLists key={each.postId} posts={each} theme={theme} />
            ))}
          </ul>
        </div>
      </SearchContext.Provider>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusUpdate.success:
        return this.renderPostLists()
      case apiStatusUpdate.failure:
        return this.renderFailureView()
      case apiStatusUpdate.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderApiStatus()
  }
}
export default Posts
