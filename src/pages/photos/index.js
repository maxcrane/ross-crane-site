import React from 'react'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import {Link, graphql} from 'gatsby'
import Layout from '../../components/Layout'

const PhotosPage = ({data}) => {
    const { edges: images } = data.allMarkdownRemark

    console.log(images);

    return (
        <Layout>
            <section className="section">
                <div className="container">
                    <div className="content">
                        <h1 className="has-text-weight-bold is-size-2">These be the photos</h1>

                        {
                            images.map(imageNode => {
                                const path = imageNode.node.frontmatter.image;
                                return <img key={path} src={path} alt="whoops"/>;
                            })
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default PhotosPage


export const photosPageQuery = graphql`
    query PhotosPage {
        allMarkdownRemark(limit: 1000, filter: { fileAbsolutePath: {regex : "\\/photos/"} }) {
          edges {
              node {
                frontmatter {
                  tags
                  image
                }
              }
            }
        }
      }
`