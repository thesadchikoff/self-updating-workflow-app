type ShopItem = {
  id: number
  title: string
  description: string
  price: number
}

type MyShopItem = {
  uniq_id: number
} & ShopItem

interface ShopItemAdd {
  title: string
  description: string
  price: number
}

interface createShopItemField {
  title: string
  description: string
  price: number
}
