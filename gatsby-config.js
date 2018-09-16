module.exports = {
   siteMetadata: {
      title: 'Ross Crane',
   },
   plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sass',
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            path: `${__dirname}/src/pages`,
            name: 'pages',
         },
      },
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            path: `${__dirname}/src/photos`,
            name: 'photos',
         },
      },
      // {
      //    resolve: 'gatsby-source-filesystem',
      //    options: {
      //       path: `${__dirname}/src/img`,
      //       name: 'images',
      //    },
      // },
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            path: `${__dirname}/static/img`,
            name: 'images',
         },
      },
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
         resolve: 'gatsby-transformer-remark',
         options: {
            plugins: [],
         },
      },
      {
         resolve: 'gatsby-plugin-netlify-cms',
         options: {
            modulePath: `${__dirname}/src/cms/cms.js`,
         },
      },
      'gatsby-plugin-netlify', // make sure to keep it last in the array
   ],
}
