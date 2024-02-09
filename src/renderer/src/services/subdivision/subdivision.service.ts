import { User } from '@renderer/@types/auth'
import { Invite, Subdivision } from '@renderer/@types/subdivision'
import { toaster } from 'evergreen-ui'
import { createAxiosClient } from '../../api/http.interceptor'

class SubdivisionService {
  async getSubdivisions() {
    const client = createAxiosClient()
    const { data } = await client.get(`all-subdivisions`)
    return data
  }
  async deleteSubdivisionEmployer(employer: Omit<User, 'subdivision' | 'tasks'>) {
    const client = createAxiosClient()
    const { data } = await client.get(`/delete-user-from-subdivision/${employer.id}`)
    return data
  }
  async getInvites() {
    const client = createAxiosClient()
    const { data } = await client.get('invited-list')
    return data
  }

  async getInviteToSubdivision(subdivision: Subdivision) {
    const client = createAxiosClient()
    try {
      const { data } = await client.get(`request-invite/${subdivision.subdivision_id}`)
      toaster.notify(`Вы отправили заявку на вступление в отдел ${subdivision.name}`)
      return data
    } catch (error) {
      return error
    }
  }

  async acceptUser(acceptUserData: Invite) {
    const client = createAxiosClient()
    const { data } = await client.post('accept-user', {
      user_id: acceptUserData.user.user_id,
      subdivision_id: acceptUserData.subdivision.subdivision_id
    })
    return data
  }

  async getMySubdivision() {
    const client = createAxiosClient()
    const { data } = await client.get('my-subdivision')
    return data
  }

  async deleteReq(deleteData: Invite) {
    const client = createAxiosClient()
    const { data } = await client.get(`delete-req/${deleteData.user.user_id}`)
    return data
  }
}

export default new SubdivisionService()
