module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  env:{
    REACT_APP_BACKEND_URL:"http://localhost:4000",
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000//products/upload/6',
      },
    ]
  },
};
