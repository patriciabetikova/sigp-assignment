import React from 'react'

const StyledRow = ({ val, prop }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '15px',
      }}
    >
      <h4 style={{ flex: 1 }}>{prop}</h4>
      <p style={{ flex: 3 }}>{val}</p>
    </div>
  )
}

export default StyledRow
