import Modal from '@renderer/components/modal'
import Input from '@renderer/components/ui/input'
import Textarea from '@renderer/components/ui/textarea'
import { useDeleteShopItemMutate } from '@renderer/hooks/queries/useDeleteShopItemMutate'
import { useAddShopItemMutate } from '@renderer/hooks/useAddShopItemMutate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Coin from '../../assets/coin.svg'
import Button from '../../components/button'
import SectionHeader from '../../components/section-header'
import { formatNumber } from '../../helpers/format-balance.helper'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import shopService from '../../services/shop/shop.service'
import { getProfile } from '../../store/auth/auth.action'
import styles from './Shop.module.scss'

const ShopPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { mutate: shopItemDeleteMutate } = useDeleteShopItemMutate()
  const dispatch = useAppDispatch()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<createShopItemField>({
    mode: 'all'
  })
  const { mutate: addItemData, isPending } = useAddShopItemMutate()
  const user = useAppSelector((state) => state.user)
  const { data, isSuccess, isError, isLoading } = useQuery<ShopItem[]>({
    queryKey: ['shop'],
    queryFn: shopService.getShopItems
  })
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: shopService.buyShopItem,
    mutationKey: ['buy'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-me']
      })
      dispatch(getProfile())
    }
  })
  const onCreateItemShopSubmit: SubmitHandler<createShopItemField> = (data) => {
    // @ts-ignore
    addItemData(data)
    reset()
    setShowModal(false)
  }

  const ShopItem = ({ item }: { item: ShopItem }) => {
    return (
      <div className={styles.shop_item}>
        <div className={styles.shop_header}>
          <h1 className={styles.shop_title}>{item.title}</h1>
        </div>
        <div className={styles.shop_body}>
          <span className={styles.shop_description}>{item.description}</span>
        </div>
        <div className={styles.shop_footer}>
          <div className={styles.shop_price}>
            <img src={Coin} />
            <span>{formatNumber(item.price)}</span>
          </div>
          <div className="flex items-center gap-5">
            {user?.role === 'admin' && (
              <Button
                onClick={() => shopItemDeleteMutate(item)}
                title="Удалить товар"
                size="xs"
                type="danger"
              />
            )}
            <Button onClick={() => mutate(item)} title="Приобрести" size="xs" />
          </div>
        </div>
      </div>
    )
  }
  console.log(data)
  return (
    <div className={styles.wrapper}>
      <SectionHeader
        title="Магазин"
        // @ts-ignore
        action={user?.role === 'admin' ? () => setShowModal(true) : null}
      >
        <span className={styles.total_balance}>
          {/* @ts-ignore */}
          Ваш баланс <article>{formatNumber(user?.balance)}</article>
          <img src={Coin} alt="Coin" />
        </span>
      </SectionHeader>
      {isSuccess && !data && (
        <div className="w-full h-full flex items-center justify-center">
          <span>Магазин на данный момент пуст</span>
        </div>
      )}

      {isSuccess && data && (
        <div className={styles.shop_wrapper}>
          {data.map((item) => {
            return <ShopItem item={item} />
          })}
        </div>
      )}

      {isError && (
        <div className="flex w-full h-full items-center justify-center">
          <span>Ошибка получения данных</span>
        </div>
      )}

      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <span>Загрузка данных...</span>
        </div>
      )}

      {user?.role === 'admin' && (
        <Modal
          onClose={() => setShowModal(false)}
          title="Добавление товара"
          visible={showModal}
          content={
            <form onSubmit={handleSubmit(onCreateItemShopSubmit)} className="flex flex-col gap-5">
              <Input
                placeholder="Укажите название товара"
                {...register('title', {
                  required: 'Это поле обязательно к заполнению'
                })}
                error={errors.title}
              />
              <Textarea
                placeholder="Укажите описание товара"
                {...register('description', {
                  required: 'Это поле обязательно к заполнению'
                })}
                error={errors.description}
              />
              <Input
                placeholder="Укажите стоимость товара"
                {...register('price', {
                  valueAsNumber: true,
                  required: 'Это поле обязательно к заполнению'
                })}
                error={errors.price}
                type="number"
                icon={<img src={Coin} />}
              />
              <Button
                title="Добавить"
                size="md"
                disable={!isDirty || !isValid || isPending}
                // @ts-ignore
                icon={isPending && <Loader2 className="animate-spin" />}
              />
            </form>
          }
        />
      )}
    </div>
  )
}

export default ShopPage
