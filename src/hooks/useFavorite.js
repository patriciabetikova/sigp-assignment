import { useFavorites } from './useFavorites'

export const useFavorite = (id) => {
  const favorites = useFavorites()
  return favorites.includes(id)
}
