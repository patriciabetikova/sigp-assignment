import React from 'react'

export const useData = (request) => {
  const [data, setData] = React.useState(undefined)
  React.useEffect(() => {
    request()
      .then((response) => {
        setData(
          Array.isArray(response) ? response.map((x) => x.data) : response.data
        )
      })
      .catch((res) => console.log(res, 'res'))
  }, [])

  return data
}
