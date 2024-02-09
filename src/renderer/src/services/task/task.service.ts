import { Task } from '@renderer/@types/auth'
import { CreateTaskInputs } from '@renderer/screens/tasks'
import axios from 'axios'
import { toaster } from 'evergreen-ui'
import config from '../../shared/config'
import userService from '../user/user.service'

class TaskService {
  async getTasks() {
    try {
      const { data } = await axios.get(`${config.baseURL}my-tasks`, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`
        }
      })
      return data
    } catch (error) {
      return error
    }
  }
  async createTask(dataTask: CreateTaskInputs) {
    try {
      const { data } = await axios.post<Task>(`${config.baseURL}create-task`, dataTask, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`
        }
      })
      toaster.success(`Задача ${dataTask.title} успешно создана`)
      return data
    } catch (error) {
      toaster.danger('Ошибка создания задачи')
      return error
    }
  }
  async completeTask(id: number) {
    try {
      const { data } = await axios.get(`${config.baseURL}change-task/${id}`, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`
        }
      })
      return data
    } catch (error) {
      return error
    }
  }
  async deleteTask(id: number) {
    try {
      const { data } = await axios.delete(`${config.baseURL}delete-task/${id}`, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`
        }
      })
      toaster.success(`Задача успешно удалена`)
      return data
    } catch (error) {
      toaster.danger('Ошибка удаления задачи')
      return error
    }
  }
}

export default new TaskService()
