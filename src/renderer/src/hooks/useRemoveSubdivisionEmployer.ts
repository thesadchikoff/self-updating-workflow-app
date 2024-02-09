import { constants } from '@renderer/constants'
import subdivisionService from '@renderer/services/subdivision/subdivision.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toaster } from 'evergreen-ui'

export const useRemoveSubdivisionEmployer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [constants.queryKeys.REMOVE_EMPLOYER],
    mutationFn: subdivisionService.deleteSubdivisionEmployer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [constants.queryKeys.MY_SUBDIVISION] })
      toaster.success('Сотрудник успешно исключен')
    },
    onError(error) {
      // @ts-ignore
      toaster.danger(error.response.data)
    }
  })
}
