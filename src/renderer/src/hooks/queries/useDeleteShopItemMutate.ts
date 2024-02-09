import { constants } from '@renderer/constants'
import shopService from '@renderer/services/shop/shop.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toaster } from 'evergreen-ui'

export const useDeleteShopItemMutate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [constants.queryKeys.REMOVE_SHOP_ITEM],
    mutationFn: shopService.deleteShopItem,
    onSuccess() {
      toaster.success('Товар успешно удален')
      queryClient.invalidateQueries({ queryKey: [constants.queryKeys.SHOP] })
    },
    onError() {
      toaster.danger('Произошла ошибка при удалении товара')
    }
  })
}
