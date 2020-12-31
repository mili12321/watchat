import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { MovieDetails } from './pages/MovieDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { Room } from './pages/Room.jsx'
import { Movie } from './pages/Movie.jsx'
import { CategoryPage } from './pages/CategoryPage.jsx'
import { EditorsMovies } from './pages/EditorsMovies.jsx'

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/movies',
    component: Movie,
  },
  {
    path: '/movies/:category',
    component: Movie,
  },
  {
    path: '/genre',
    component: CategoryPage,
  },
  {
    path: '/Movie/:id',
    component: MovieDetails,
  },
  {
    path: '/user',
    component: UserDetails,
  },
  {
    path: '/room/:id',
    component: Room,
  },
  {
    path: '/editor-movies/:category',
    component: EditorsMovies,
  },
]
