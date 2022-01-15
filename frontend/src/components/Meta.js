import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' context={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to GuitarShop',
  description: 'We sell the best guitars for cheap',
  keywords: 'guitar store shop',
}

export default Meta
