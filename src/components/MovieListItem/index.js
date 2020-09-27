import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { toggleFavorite } from 'data/rx'
import { StyledLink } from 'components/Link'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'

const MovieListItem = (p) => {
  return (
    <StyledLink to={`/detail/${p.imdbID}`} key={p.imdbID}>
      <Paper
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '15px',
          flexDirection: 'row',
        }}
      >
        <img
          src={
            p.Poster === 'N/A'
              ? 'https://via.placeholder.com/60x150?text=Image-Not-Available'
              : p.Poster
          }
          alt="movie poster"
          style={{ height: '150px', width: '100px' }}
        />
        <div style={{ marginLeft: '20px' }}>{p.Title}</div>
        <div style={{ position: 'absolute', right: '0px' }}>
          {p.removeEnabled && (
            <Tooltip title="Remove from favorites" aria-label="add">
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  toggleFavorite(p.imdbID)
                }}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Paper>
    </StyledLink>
  )
}

export default MovieListItem
