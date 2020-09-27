import { BehaviorSubject } from 'rxjs'
import { retrieve, store } from 'common/storage'

export const movies$ = new BehaviorSubject({
  favorites: retrieve('favorites') || [],
})

export const toggleFavorite = (id) => {
  const oldFavs = movies$.value.favorites
  const newFavs = oldFavs.includes(id)
    ? oldFavs.filter((x) => x !== id)
    : oldFavs.concat(id)
  store('favorites')(newFavs)
  movies$.next({ ...movies$.value, favorites: newFavs })
}
