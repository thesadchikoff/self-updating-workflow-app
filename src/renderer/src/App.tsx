import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { constants } from './constants'
import { OnlyAdmin, OnlyAuth, OnlyUnAuth } from './hoc/ProtectedRoute'
import { useAppDispatch } from './hooks/useAppDispatch'
import HomePage from './screens/home'
import InvitesPage from './screens/invites'
import LoginPage from './screens/login'
import NotFound from './screens/not-found'
import ProfilePage from './screens/profile'
import RegisterPage from './screens/register'
import ShopPage from './screens/shop'
import SubdivisionPage from './screens/subdivision'
import TasksPage from './screens/tasks'
import userService from './services/user/user.service'
import { logout, updateProfile } from './store/auth/auth.slice'

function App() {
  const dispatch = useAppDispatch()
  const { data, isError } = useQuery({
    queryKey: [constants.queryKeys.GET_PROFILE],
    queryFn: userService.getProfile,
    refetchOnWindowFocus: 'always',
    refetchInterval: 5000
  })
  const revalid = () => {
    if (isError) {
      console.log('error')
      dispatch(logout())
    }
    dispatch(updateProfile(data))
  }
  useEffect(() => {
    revalid()
  }, [data])
  console.log(data)

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={'/'} element={<OnlyAuth component={<HomePage />} />} />
          <Route path={'/profile'} element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path={'/tasks'} element={<OnlyAuth component={<TasksPage />} />} />
          <Route path={'/shop'} element={<OnlyAuth component={<ShopPage />} />} />
          <Route path={'/subdivision'} element={<OnlyAuth component={<SubdivisionPage />} />} />
          <Route path={'/invites'} element={<OnlyAdmin component={<InvitesPage />} />} />
          <Route path={'/login'} element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path={'/register'} element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
