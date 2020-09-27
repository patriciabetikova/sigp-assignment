import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          height: '100%',
          overflow: 'hidden',
        },

        body: {
          height: '100%',
          overflow: 'auto',
          backgroundColor: '#bbdefb',
          padding: '10px',
        },

        h4: {
          margin: '0',
        },
      },
    },
  },
})
