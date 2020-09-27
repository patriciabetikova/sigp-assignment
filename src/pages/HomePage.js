import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import { withPage } from 'hocs/withPage'
import MovieListItem from 'components/MovieListItem'
import { StyledLink } from 'components/Link'
import { getResultsRequest } from 'data/api'
import { fromEvent } from 'rxjs'
import * as R from 'ramda'

const HomePage = () => {
  const [d, setD] = React.useState({
    title: '',
    page: undefined,
    data: [],
    error: undefined,
    searchCount: 0,
    searchFinished: false,
  })

  React.useEffect(() => {
    if (!d.page) return
    if (d.searchFinished) return
    getResultsRequest(d.title, d.page).then((res) => {
      if (res.data.Response === 'False' && d.page === 1) {
        setD((prev) => ({
          ...prev,
          error: res.data.Error,
          searchFinished: false,
        }))
      }
      if (res.data.Response === 'False') {
        setD((prev) => ({
          ...prev,
          searchFinished: true,
        }))
      }
      setD((x) => ({
        ...x,
        data: x.data.concat(R.pathOr([], ['data', 'Search'], res)),
      }))
    })
  }, [d.page, d.searchCount]) // eslint-disable-line

  const handleSearch = () =>
    setD((prev) => ({
      ...prev,
      page: 1,
      data: [],
      error: undefined,
      searchCount: prev.searchCount + 1,
      searchFinished: false,
    }))

  React.useEffect(() => {
    const sub = fromEvent(document.body, 'scroll').subscribe((e) => {
      if (
        e.target.scrollHeight - e.target.scrollTop ===
        e.target.clientHeight
      ) {
        setD((prev) => ({ ...prev, page: prev.page + 1 }))
      }
    })

    return () => sub.unsubscribe()
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <form
        style={{
          display: 'flex',
          marginBottom: '50px',
          justifyContent: 'center',
        }}
        onSubmit={(e) => {
          handleSearch()
          e.preventDefault()
        }}
      >
        <TextField
          id="outlined-basic"
          placeholder="movie title"
          variant="outlined"
          value={d.title}
          onChange={(e) => setD({ ...d, title: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Submit
        </Button>
      </form>
      {d.error && <h2>{d.error}</h2>}

      {d.data.length > 0 ? (
        <>
          <div>Results for "{d.title}"</div>
          <div>
            <List style={{ display: 'flex', flexDirection: 'column' }}>
              {d.data.map((movie) => (
                <MovieListItem {...movie} key={movie.imdbID} />
              ))}
            </List>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>Search for a movie or visit </p>
          <StyledLink to="/favorites">Favorites</StyledLink>
        </div>
      )}
      {d.searchFinished && <h2>End of results</h2>}
    </div>
  )
}

export default withPage(HomePage)
