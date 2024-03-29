import express from 'express'
import RestaurantsCtrl from './restaurants.controller.js'
import ReviewsCtrl from './reviews.controller.js'

const router = express.Router() //get access to the express router
router.route('/').get(RestaurantsCtrl.apiGetRestaurants) //route comes from second import
router.route('/id/:id').get(RestaurantsCtrl.apiGetRestaurantById)
router.route('/cuisines').get(RestaurantsCtrl.apiGetRestaurantCuisines)

//adding routes for deleting,updating and posting reviews

router
  .route('/review')
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router
