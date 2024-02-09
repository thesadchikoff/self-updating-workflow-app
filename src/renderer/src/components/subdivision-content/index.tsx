import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { MySubdivision, ServerError } from '../../@types/subdivision'
import Admin from '../../assets/king.svg'
import { constants } from '../../constants'

import { useAppSelector } from '@renderer/hooks/useAppSelector'
import { useRemoveSubdivisionEmployer } from '@renderer/hooks/useRemoveSubdivisionEmployer'
import { AlertCircle, UserRoundX } from 'lucide-react'
import subdivisionService from '../../services/subdivision/subdivision.service'
import SectionHeader from '../section-header'
import TaskItem from '../task-item'
import { IconSpace } from '../ui/icon-space'
import styles from './SubdivisionContent.module.scss'

const SubdivisionContent = (): any => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<MySubdivision, ServerError>({
    queryKey: [constants.queryKeys.MY_SUBDIVISION],
    queryFn: subdivisionService.getMySubdivision
  })
  const { mutate } = useRemoveSubdivisionEmployer()
  const user = useAppSelector((state) => state.user)
  // const { mutate } = useDeleteTaskMutation()
  console.log(data)
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <span>Загрузка...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex items-center gap-2">
          <AlertCircle />
          <span>{error?.response?.data ? error.response.data : error.message}</span>
        </div>
      </div>
    )
  }

  const adminValidation = (admin) => {
    return user?.role === 'admin' && Number(user.id) !== admin.id
  }

  if (isSuccess) {
    return (
      <div className="w-full h-full flex flex-col gap-10">
        <div className="py-5 px-10 bg-foreground rounded-xl">
          <h1 className="text-xl font-bold">Отдел {data.subdivision.subdivision_name}</h1>
          <span className="text-xs opacity-50">
            Руководитель - {data.subdivision.owner.username}
          </span>
        </div>
        <div className="">
          <SectionHeader title="Коллеги" />
          <div className="grid grid-cols-4 gap-10">
            {data.subdivision.employers.map((employer) => {
              return (
                <div className="bg-foreground rounded-xl p-5 flex items-center justify-between">
                  <span
                    className={cn(styles.username, {
                      [styles.admin]: data.subdivision.owner.id === employer.id
                    })}
                  >
                    {employer.username}
                  </span>
                  {data.subdivision.owner.id === employer.id && (
                    <img title="Руководитель отдела" src={Admin} alt="" />
                  )}
                  {!!adminValidation(employer) ? (
                    <div>
                      <IconSpace onClick={() => mutate(employer)}>
                        <UserRoundX size={12} />
                      </IconSpace>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <SectionHeader title="Задачи отдела" />
          <div className="grid grid-cols-2 gap-10 pb-10">
            {data.subdivision.tasks.map((task) => {
              return <TaskItem task={task} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default SubdivisionContent
