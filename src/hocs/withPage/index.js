import React from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../../theme'
import { StyledLink } from 'components/Link'
import Fab from '@material-ui/core/Fab'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { fromEvent } from 'rxjs'
import Button from '@material-ui/core/Button'

export const withPage = (Component) => (props) => {
  const [showScrollBtn, setShowScrollBtn] = React.useState(false)

  React.useEffect(() => {
    const sub = fromEvent(document.body, 'scroll').subscribe((e) => {
      setShowScrollBtn(e.target.scrollTop > 80)
    })

    return () => sub.unsubscribe()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper
          elevation={3}
          style={{ padding: '20px', backgroundColor: '#e3f2fd' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyledLink to="/">
              <Button color="primary" variant="contained">
                Home
              </Button>
            </StyledLink>
            <StyledLink to="/favorites">
              <Button color="primary" variant="contained">
                Favorites
              </Button>
            </StyledLink>
          </div>
          <Component {...props} />
        </Paper>
        {showScrollBtn && (
          <Fab
            color="primary"
            aria-label="scrollToTop"
            style={{ position: 'absolute', bottom: '20px', right: '20px' }}
            onClick={() => {
              document.body.scrollTo(0, 0, 'smooth') // For Safari
              document.documentElement.scrollTo(0, 0, 'smooth') // For Chrome, Firefox, IE and Opera
            }}
          >
            <ArrowUpwardIcon />
          </Fab>
        )}
      </Container>
    </ThemeProvider>
  )
}
