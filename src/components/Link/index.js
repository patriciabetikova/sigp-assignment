import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

export const StyledLink = ({ children, ...props }) => (
  <Link component={RouterLink} to={props.to} {...props}>
    {children}
  </Link>
)
