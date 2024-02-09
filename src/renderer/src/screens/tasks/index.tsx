import { Task } from '@renderer/@types/auth'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Alert } from '../../components/alert'
import Button from '../../components/button'
import Modal from '../../components/modal'
import SectionHeader from '../../components/section-header'
import TaskItem from '../../components/task-item'
import Input from '../../components/ui/input'
import Textarea from '../../components/ui/textarea'
import { constants } from '../../constants'
import { useChangeTaskMutation } from '../../hooks/useChangeTaskMutation'
import { useCreateTaskMutation } from '../../hooks/useCreateTaskMutation'
import { useDeleteTaskMutation } from '../../hooks/useDeleteTaskMutation'
import taskService from '../../services/task/task.service'

export interface CreateTaskInputs {
  title: string
  description: string
}

const TasksPage = () => {
  const { mutate: createMutate } = useCreateTaskMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm<CreateTaskInputs>({ mode: 'all' })
  const onSubmit: SubmitHandler<CreateTaskInputs> = (data) => {
    // @ts-ignore
    createMutate(data)
    reset()
    setModal(false)
  }
  const [isModal, setModal] = useState<boolean>(false)
  const onClose = () => setModal(false)
  const [isShow, setIsShow] = useState<boolean>(false)
  const { data, isError, isLoading, isFetched, isSuccess } = useQuery<Task[]>({
    queryKey: [constants.queryKeys.GET_TASKS],
    queryFn: taskService.getTasks,
    refetchOnWindowFocus: 'always'
  })
  const { mutate: deleteMutate } = useDeleteTaskMutation()
  const { mutate: changeMutate } = useChangeTaskMutation()

  const GetTasks = () => {
    if (isError) {
      setIsShow(true)
      return (
        isShow && (
          <Alert text="Error loading tasks" type="error" setIsShow={() => setIsShow(false)} />
        )
      )
    }
    if (!isFetched) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 size={16} className="animate-spin" />
        </div>
      )
    }
    if (isSuccess && data) {
      return (
        <div className="grid tablet:grid-cols-1 notebook:grid-cols-2 gap-10">
          {data.length > 0 &&
            data.map((task: Task) => {
              return (
                <TaskItem
                  task={task}
                  key={task.id}
                  completeButtonAction={() => changeMutate(task.id)}
                  deleteButtonAction={() => deleteMutate(task.id)}
                />
              )
            })}
        </div>
      )
    }
    return <span>Задачи отсутствуют</span>
  }

  return (
    <div className="flex flex-col gap-10 relative w-full h-full">
      <SectionHeader title="Ваши задачи" action={() => setModal(true)}>
        <span className="text-xl font-semibold">Всего {data ? data.length : '0'}</span>
      </SectionHeader>
      <Modal
        visible={isModal}
        title="Создание задачи"
        content={
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
            <Input
              placeholder="Укажите название задачи"
              {...register('title', {
                required: 'Поле не должно быть пустым',
                minLength: {
                  message: 'Длина поля должна составлять как минимум 3 символа',
                  value: 3
                }
              })}
              error={errors.title}
            />
            <Textarea
              placeholder="Укажите описание задачи"
              {...register('description', {
                required: 'Поле не должно быть пустым',
                minLength: {
                  message: 'Длина поля должна составлять как минимум 10 символов',
                  value: 10
                }
              })}
              error={errors.description}
            />
            <div className="grid grid-cols-1 w-full gap-4">
              <Button title="Создать" disable={!isDirty || !isValid || isLoading} />
            </div>
          </form>
        }
        onClose={onClose}
      />
      <GetTasks />
    </div>
  )
}

export default TasksPage
