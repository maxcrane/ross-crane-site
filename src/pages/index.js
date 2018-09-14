import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import background from '../../static/img/website-background.jpg';

export default class IndexPage extends React.Component {


   render() {
      return (
         <Layout style={{height: '100%'}}>
            <div className={'background'} style={{backgroundImage: `url(${background})`}}/>
         </Layout>
      )
   }
}

IndexPage.propTypes = {
   data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
         edges: PropTypes.array,
      }),
   }),
}



