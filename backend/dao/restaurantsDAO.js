let restaurants // reference to the database

export default class RestaurantsDAO {
  static async injectDB(conn) {
    //this is how you connect to the database
    if (restaurants) {
      //if there already is a reference then just return it
      return
    }
    try {
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection('restaurants') //else wait for connection
    } catch (e) {
      console.error(
        `unable to establish a connection handle in restaurantsDAO: ${e}`
      )
    }
  }

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ('name' in filters) {
        query = { $text: { $search: filters['name'] } }
      } else if ('cuisine' in filters) {
        query = { cuisine: { $eq: filters['cuisine'] } }
      } else if ('zipcode' in filters) {
        query = { 'address.zipcode': { $eq: filters['zipcode'] } }
      }
    }

    let cursor

    try {
      cursor = await restaurants.find(query)
    } catch (e) {
      console.error(`unable to issue find command, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page)

    try {
      const restaurantsList = await displayCursor.toArray()
      const totalNumRestaurants = await restaurants.countDocuments(query)
      return { restaurantsList, totalNumRestaurants }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem couint documents, ${e}`
      )
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }
  }
}
