import { constants } from '@renderer/constants'
import shopService from '@renderer/services/shop/shop.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddShopItemMutate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [constants.queryKeys.ADD_SHOP_ITEM],
    mutationFn: shopService.addShopItem,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [constants.queryKeys.SHOP] })
    }
  })
}
