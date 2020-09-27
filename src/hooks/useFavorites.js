import React from 'react'
import { movies$ } from 'data/rx'

export const useFavorites = () => {
  const [favorites, setFavorites] = React.useState(movies$.value.favorites)
  React.useEffect(() => {
    const sub = movies$.subscribe((val) => setFavorites(val.favorites))
    return () => sub.unsubscribe()
  }, [])

  return favorites
}
