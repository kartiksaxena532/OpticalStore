/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
    images: {
      domains: ['cdn.sanity.io']
    }
    
  }
  

  const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()
module.exports = nextConfig