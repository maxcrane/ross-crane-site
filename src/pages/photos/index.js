import React, {Component} from 'react'
import {graphql} from 'gatsby'
import Layout from '../../components/Layout'
import Grid from '@material-ui/core/Grid'
import _ from "lodash";
import Button from "@material-ui/core/Button/Button"
import Img from "gatsby-image";
import Modal from '@material-ui/core/Modal';


class PhotosPage extends Component {
   constructor(props) {
      super(props);
      const {edges: images} = this.props.data.allMarkdownRemark

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
      this.tagToPhotos[allTag] = images;

      this.state = {
         currentTag: allTag,
         allTag: allTag,
         tags,
         filteredImages: images,
         images,
         photoModalOpen: false,
         photoModalIndex: 0
      };
   }

   tagClicked(tag) {
      this.setState({
         currentTag: tag, filteredImages: _.get(this.tagToPhotos, [tag])
      });
   }

   photoClicked(index) {
      this.setState({photoModalOpen: true, photoModalIndex: index});
   }

   handleClose() {
      this.setState({photoModalOpen: false});
   }

   render() {
      const modalImageNode = this.state.filteredImages[this.state.photoModalIndex];
      const fluidImage = modalImageNode
            ? modalImageNode.node.fields.image.childImageSharp.fluid
            : undefined;

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
                           this.state.filteredImages.map((imageNode, index) => {
                              const path = imageNode.node.frontmatter.image;
                              return (
                                 <div
                                    key={`${path}-container`}
                                    className={'zoom-in'}
                                    onClick={this.photoClicked.bind(this, index)}>
                                    <Img
                                       key={path}
                                       style={{margin: "5px"}}
                                       alt={`path`}
                                       fixed={imageNode.node.fields.image.childImageSharp.fixed}
                                    />
                                 </div>
                              );
                           })
                        }
                     </Grid>
                  </div>


                  <Modal
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description"
                     open={this.state.photoModalOpen}
                     onClose={this.handleClose.bind(this)}
                     className={"photo-modal"}
                  >
                     <div className={"photo-modal-content"}>
                        <Img
                           alt={`path`}
                           fluid={fluidImage}
                        />
                     </div>
                  </Modal>

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
                           fixed(width: 300, height: 300, quality: 100) {
                              ...GatsbyImageSharpFixed
                           }
                           fluid(maxWidth: 800, quality: 100) {
                           # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
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