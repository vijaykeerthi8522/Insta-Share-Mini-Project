import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  clickSearchButton: () => {},
  searchPostView: false,
  changeSearchInput: () => {},
  enterSearchButton: () => {},
  likeIcon: () => {},
  unlikeIcon: () => {},
  isDark: false,
  changeTheme: () => {},
})
export default SearchContext
