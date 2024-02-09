import Button from '@renderer/components/button'
import AppLink from '@renderer/components/ui/app-link'
import Input from '@renderer/components/ui/input'
import { useAppDispatch } from '@renderer/hooks/useAppDispatch'
import { useAppSelector } from '@renderer/hooks/useAppSelector'
import { registerHandler } from '@renderer/store/auth/auth.action'
import { KeyRound, Loader2, Mail } from 'lucide-react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Register.module.scss'

interface RegisterInputs {
  username: string
  password: string
}
const RegisterPage: FC = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm<RegisterInputs>({ mode: 'all' })
  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    dispatch(registerHandler(data))
    reset()
  }
  const isLoading = useAppSelector((state) => state.isLoading)

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={'text-xl text-center'}>Create new account in Workflow</h1>
        <div className={styles.form_container}>
          <Input
            placeholder={'Придумайте логин'}
            {...register('username', {
              required: 'Обязательно к заполнению'
              // pattern: {
              // 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              // 	message: 'Невалидный email',
              // },
            })}
            error={errors.username}
            icon={<Mail className={'text-border'} />}
          />
          <Input
            placeholder={'Придумайте пароль'}
            {...register('password', {
              required: 'Данное поле является обязательным',
              minLength: {
                value: 6,
                message: 'Пароль должен состоять минимум из 6 символов'
              },
              maxLength: {
                value: 30,
                message: 'Пароль не должен превышать 30 символов'
              }
            })}
            type="password"
            error={errors.password}
            icon={<KeyRound className={'text-border'} />}
          />

          <Button
            title="Регистрация"
            disable={!isDirty || !isValid}
            icon={isLoading ? <Loader2 className="animate-spin" /> : null}
          />
          <span className="mobile:text-[10px] tablet:text-xs notebook:text-xs desktop:text-xs text-destructive flex items-center gap-1">
            У Вас уже есть аккаунт? <AppLink to="/login" title="Авторизуйтесь!" />
          </span>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
