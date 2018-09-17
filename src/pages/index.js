import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Img from "gatsby-image"
import {graphql} from "gatsby"

export default class IndexPage extends React.Component {
   constructor(props) {
      super(props);

      console.log(props.data.backgroundImage);
   }

   render() {
      return (
         <Layout style={{height: '100%'}}>
            <Img
               className={"full-height"}
               outerWrapperClassName={"full-height"}
               alt={`cityscape`}
               sizes={this.props.data.backgroundImage.childImageSharp.sizes}
            />
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

export const query = graphql`
  query {
    backgroundImage: file(relativePath: { regex: "/website-background.jpg/" }) {
      childImageSharp {
        sizes(maxWidth: 6000) {
         # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
            ...GatsbyImageSharpSizes
         }
      }
    }
  }
`


