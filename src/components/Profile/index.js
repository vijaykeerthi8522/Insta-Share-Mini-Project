import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SearchContext from '../../SearchContext'
import Header from '../Header'
import ProfileCard from '../ProfileCard'

import './index.css'

const apiStatusUpdate = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {myProfile: [], apiStatus: apiStatusUpdate.initial}

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({apiStatus: apiStatusUpdate.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateProfile = {
        id: data.profile.id,
        userId: data.profile.user_id,
        username: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        postsCount: data.profile.posts_count,
        userBio: data.profile.user_bio,
        posts: data.profile.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        stories: data.profile.stories.map(eachStory => ({
          id: eachStory.id,
          image: eachStory.image,
        })),
      }
      this.setState({
        myProfile: updateProfile,
        apiStatus: apiStatusUpdate.success,
      })
      // console.log(updateProfile)
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

  onRetry = () => {
    this.setState({apiStatus: apiStatusUpdate.inProgress}, this.getMyProfile)
  }

  renderMyProfileView = () => {
    const {myProfile} = this.state
    return (
      <ul className="profile-container">
        <ProfileCard profile={myProfile} my="my" />
      </ul>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusUpdate.success:
        return this.renderMyProfileView()
      case apiStatusUpdate.failure:
        return this.renderFailureView()
      case apiStatusUpdate.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {isDark} = value
          const appContainer = isDark
            ? 'app-container app-container2'
            : 'app-container'
          return (
            <>
              <Header />
              <div className={appContainer}>{this.renderApiStatus()}</div>
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default Profile
