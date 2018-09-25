import React, {Component} from 'react'
import {graphql} from 'gatsby'
import Layout from '../../components/Layout'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import _ from "lodash";
import Button from "@material-ui/core/Button/Button"
import Img from "gatsby-image";

const styles = {
    card: {
        maxWidth: 300,
    },
    media: {
        height: 300,
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
};

class PhotosPage extends Component {
    constructor(props) {
        super(props);
        const {edges: images} = this.props.data.allMarkdownRemark

        this.allImageFrontmatters = images.map((imageNode) => _.get(imageNode, ['node', 'frontmatter']))

        this.tagToPhotos = images.reduce((acc, curr) => {
            curr.node.frontmatter.tags.forEach((tag) => {
                let photos = _.get(curr, tag, []);
                photos.push(curr);
                acc[tag] = photos;
            });

            return acc;
        }, {});

        const allTag = 'all';
        const tags = _.keys(this.tagToPhotos);
        tags.unshift(allTag);
        this.tagToPhotos[allTag] = this.allImageFrontmatters;

        this.state = {
            currentTag: allTag,
            allTag: allTag,
            tags,
            filteredImages: images,
           images
        };
    }

    tagClicked(tag) {
        this.setState({
            currentTag: tag, filteredImages: _.get(this.tagToPhotos, [tag])
        });
    }

    render() {
        return (
            <Layout>
                <section className="section">
                    <div className="container">


                        <div className="content" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            {
                                this.state.tags.map((tag) =>
                                    <div key={`${tag}-container`}
                                         style={this.state.currentTag === tag ? {textDecoration: "underline"} : {}}>
                                        <Button key={tag}
                                                onClick={this.tagClicked.bind(this, tag)}>
                                            {tag}
                                        </Button>
                                    </div>
                                )
                            }

                        </div>

                        <div className="content">
                            <Grid container justify="center" spacing={24}>
                                {
                                    this.state.filteredImages.map(imageNode => {
                                        const path = imageNode.node.frontmatter.image;
                                        return (
                                            <Grid item key={`grid-item-${path}`} style={{width: "340px"}}>
                                                <Card style={styles.card} key={path}>
                                                   <Img
                                                      alt={`path`}
                                                      fluid={imageNode.node.fields.image.childImageSharp.fluid}
                                                   />
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
                   fields {
                        image {
                         childImageSharp {
                           fluid(maxWidth: 2000, quality: 100) {
                              ...GatsbyImageSharpFluid
                           }
                         }
                       }
                   }
                
              }
           }
        }
      }
`