import React from 'react'
import {kebabCase} from 'lodash'
import {graphql} from 'gatsby'
import Layout from '../../components/Layout'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

const styles = {
    card: {
        maxWidth: 300,
    },
    media: {
        height: 300,
    },
};

const PhotosPage = ({data}) => {
    const {edges: images} = data.allMarkdownRemark

    console.log(data);

    return (
        <Layout>
            <section className="section">
                <div className="container">
                    <div className="content">
                        <Grid container justify="center" spacing={40}>
                            {
                                images.map(imageNode => {
                                    const path = imageNode.node.frontmatter.image;
                                    return (
                                        <Grid item key={`grid-item-${path}`} style={{width: "340px"}}>
                                            <Card style={styles.card} key={path}>
                                                <CardMedia
                                                    onClick={() => console.log(path)}
                                                    style={styles.media}
                                                    image={path}
                                                    title="Image title"/>
                                            </Card>
                                        </Grid>

                                    );
                                })
                            }
                        </Grid>


                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default PhotosPage;


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