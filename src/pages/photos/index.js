import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const PhotosPage = () => (
    <Layout>
        <section className="section">
            <div className="container">
                <div className="content">
                    <h1 className="has-text-weight-bold is-size-2">These be the photos</h1>
                </div>
            </div>
        </section>
    </Layout>
)

export default PhotosPage
