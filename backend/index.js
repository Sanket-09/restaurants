import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import RestaurantsDAO from './dao/restaurantsDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.port || 8000

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxpoolSize: 50,
  wtimeoutMS: 2500,
})

  .catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })

  .then(async (client) => {
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client) //initial referecne to the restaurant collection in the database
    app.listen(port, () => {
      //app.listen starts the web server
      console.log(`listening on port ${port}`)
    })
  })
