import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'

import './App.css'
import NotFound from './components/NotFound'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import SearchContext from './SearchContext'
import UserProfile from './components/UserProfile'

class App extends Component {
  state = {isDark: false, searchInput: '', searchPostView: false}

  onChangeTheme = () => {
    this.setState(prev => ({isDark: !prev.isDark}))
  }

  clickButton = () => {
    this.setState(prev => ({searchPostView: !prev.searchPostView}))
  }

  onEnterSearch = () => {
    this.setState(prev => ({searchPostView: !prev.searchPostView}))
  }

  changeSearch = result => {
    this.setState({searchInput: result})
  }

  render() {
    const {isDark, searchInput, searchPostView} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          clickSearchButton: this.clickButton,
          changeSearchInput: this.changeSearch,
          enterSearchButton: this.onEnterSearch,
          searchPostView,
          isDark,
          changeTheme: this.onChangeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={Profile} />
          <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}
export default App
