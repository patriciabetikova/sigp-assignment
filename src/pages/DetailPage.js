import React from 'react'
import { withPage } from 'hocs/withPage'
import { useParams } from 'react-router-dom'
import { getDetailRequest } from 'data/api'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { toggleFavorite } from 'data/rx'
import { useFavorite } from 'hooks/useFavorite'
import { useData } from 'hooks/useData'
import StyledRow from 'components/StyledRow'

const DetailPage = () => {
  const { id } = useParams()
  const data = useData(() => getDetailRequest(id))

  const isFavorite = useFavorite(id)

  if (!data) return <>No data</>
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', right: '0px' }}>
        {isFavorite ? (
          <Tooltip title="Remove from favorites" aria-label="add">
            <IconButton
              color="primary"
              onClick={() => toggleFavorite(data.imdbID)}
            >
              <StarIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add to favorites" aria-label="add">
            <IconButton
              color="primary"
              onClick={() => toggleFavorite(data.imdbID)}
            >
              <StarBorderIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <h2>{data.Title}</h2>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img
            src={
              data.Poster === 'N/A'
                ? 'https://via.placeholder.com/200x300?text=Not available'
                : data.Poster
            }
            alt="img"
            style={{ width: '200px', height: '300px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {Object.keys(data)
            .filter(
              (x) =>
                !Array.isArray(data[x]) &&
                x !== 'Poster' &&
                x !== 'Response' &&
                x !== 'imdbID'
            )
            .map((prop) => (
              <StyledRow key={prop.imdbID} val={data[prop]} prop={prop} />
            ))}
        </div>
      </div>
    </div>
  )
}
export default withPage(DetailPage)
