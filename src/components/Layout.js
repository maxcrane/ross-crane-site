import React from 'react'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div style={{height: '100%'}}>
    <Helmet  title="Ross Crane" />
    <Navbar />
    <div style={{height: '100%'}}>{children}</div>
  </div>
)

export default TemplateWrapper
