import 'dotenv/config'

export default {
  expo: {
    name: 'app-grafica',
    slug: 'app-grafica',
    version: '1.0.0',
    extra: {
      API_URL: process.env.API_URL
    }
  }
}