import React from 'react'
import { withPage } from 'hocs/withPage'
import MovieListItem from 'components/MovieListItem'
import List from '@material-ui/core/List'
import { movies$ } from 'data/rx'
import { useData } from 'hooks/useData'
import { useFavorites } from 'hooks/useFavorites'
import { getDetailRequest } from 'data/api'

const FavoritesPage = () => {
  const data = movies$.value.favorites

  const movies = useData(() =>
    Promise.all(data.map((x) => getDetailRequest(x)))
  )
  const favorites = useFavorites()

  return (
    <div>
      Favorites
      <List style={{ display: 'flex', flexDirection: 'column' }}>
        {movies &&
          movies
            .filter((x) => favorites.includes(x.imdbID))
            .map((movie) => (
              <MovieListItem removeEnabled {...movie} key={movie.imdbID} />
            ))}
      </List>
    </div>
  )
}

export default withPage(FavoritesPage)
