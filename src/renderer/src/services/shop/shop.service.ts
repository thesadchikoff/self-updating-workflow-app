import axios from 'axios'
import { toaster } from 'evergreen-ui'
import { createAxiosClient } from '../../api/http.interceptor'
import config from '../../shared/config'
import userService from '../user/user.service'

class ShopService {
  async getShopItems() {
    try {
      const { data } = await axios.get(`${config.baseURL}shop`, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`
        }
      })
      return data
    } catch (error) {
      return error
    }
  }
  async buyShopItem(product: ShopItem) {
    try {
      const { data } = await axios.get(`${config.baseURL}buy/${product.id}`, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`
        }
      })
      toaster.success('Покупка совершена успешно')
      return data
    } catch (error) {
      // @ts-ignore
      toaster.danger(error.response.data)
      return error
    }
  }

  async deleteShopItem(item: ShopItem) {
    const client = createAxiosClient()
    const { data } = await client.get(`delete-item/${item.id}`)
    return data
  }

  async addShopItem(shopItem: ShopItemAdd) {
    const client = createAxiosClient()
    const { data } = await client.post(`create-item`, shopItem)
    return data
  }

  async useProductItem(item: MyShopItem) {
    try {
      const { data } = await axios.delete(`${config.baseURL}use-my-item/${item.uniq_id}`, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`
        }
      })
      toaster.success(`Вы использовали привелегию "${item.title}"`)
      return data
    } catch (error) {
      return error
    }
  }

  async getMyItems() {
    // const { data } = await axios.get(`${config.baseURL}my-items`, {
    //   headers: {
    //     Authorization: `Bearer ${userService.getUserToken()}`,
    //   },
    // });
    const client = createAxiosClient()
    const { data } = await client.get('my-items', {
      // @ts-ignore
      authorization: true
    })
    return data
  }
}

export default new ShopService()
