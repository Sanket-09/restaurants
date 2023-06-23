import express from 'express'
import RestaurantsCtrl from './restaurants.controller.js'

const router = express.Router() //get access to the express router
router.route('/').get(RestaurantsCtrl.apiGetRestaurants) //route comes from second import

export default router
