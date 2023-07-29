import SearchContext from '../../SearchContext'
import Header from '../Header'
import SearchPosts from '../SearchPosts'
import Posts from '../Posts'
import Stories from '../Stories'

import './index.css'

const Home = () => (
  <SearchContext.Consumer>
    {value => {
      const {isDark, searchInput, searchPostView} = value
      const appContainer = isDark
        ? 'app-container app-container2'
        : 'app-container'

      return (
        <>
          <Header />
          <div className={appContainer}>
            {searchPostView ? (
              <SearchPosts search={searchInput} theme={isDark} />
            ) : (
              <>
                <Stories />
                <Posts theme={isDark} />
              </>
            )}
          </div>
        </>
      )
    }}
  </SearchContext.Consumer>
)
export default Home
