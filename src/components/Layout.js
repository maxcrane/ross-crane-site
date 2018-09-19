import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import './all.sass'

export default ({children, pathname}) => {
   const overflow = pathname === '/' ? 'hidden' : 'scroll';

   return (
      <div style={{height: '100%', overflow}}>
         <Helmet title="Ross Crane"/>
         <Navbar/>
         <div style={{height: '100%'}}>{children}</div>
      </div>
   )
}

