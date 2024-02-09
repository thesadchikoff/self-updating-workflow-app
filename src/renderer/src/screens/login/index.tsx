import { KeyRound, Loader2, UserRound } from 'lucide-react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@renderer/components/button'
import AppLink from '@renderer/components/ui/app-link'
import Input from '@renderer/components/ui/input'
import { useAppDispatch } from '@renderer/hooks/useAppDispatch'
import { useAppSelector } from '@renderer/hooks/useAppSelector'
import { login } from '@renderer/store/auth/auth.action'
import styles from './Login.module.scss'
interface AuthInputs {
  username: string
  password: string
}
const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm<AuthInputs>({ mode: 'all' })
  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
    dispatch(login(data))

    reset()
  }
  const isLoading = useAppSelector((state) => state.isLoading)
  const dispatch = useAppDispatch()

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={'text-xl'}>Welcome to Workflow!</h1>
        <div className={styles.form_container}>
          <Input
            placeholder={'Введите логин'}
            {...register('username', {
              required: 'Обязательно к заполнению'
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //   message: "Невалидный email",
              // },
            })}
            // @ts-ignore
            error={errors.username}
            icon={<UserRound className={'text-border'} />}
          />
          <Input
            type="password"
            placeholder={'Введите пароль'}
            {...register('password', {
              required: 'Данное поле является обязательным'
            })}
            // @ts-ignore
            error={errors.password}
            icon={<KeyRound className={'text-border'} />}
          />

          <Button
            icon={isLoading ? <Loader2 className="animate-spin" /> : null}
            title="Войти"
            disable={!isDirty || !isValid || isLoading}
          />
          <span className="mobile:text-[10px] tablet:text-xs notebook:text-xs desktop:text-xs text-destructive flex items-center gap-1">
            У Вас нет аккаунта? <AppLink to="/register" title="Зарегистрируйтесь!" />
          </span>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
