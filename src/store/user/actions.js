import { api } from '../../boot/axios.js'
import { Notify } from 'quasar'

export const login = async ({ commit }, form) => {
  try {
    const { data } = await api.post('/users/login', form)
    commit('login', data.result)
    Notify.create({
      message: '登入成功',
      type: 'positive'
    })
  } catch (error) {
    Notify.create({
      message: error.response.data.message,
      type: 'negative'
    })
  }
}

export const logout = async ({ commit, state }) => {
  try {
    await api.delete('/users/logout', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('logout')
    Notify.create({
      message: '已登出',
      type: 'positive'
    })
  } catch (error) {
    Notify.create({
      message: error.response.data.message,
      type: 'negative'
    })
  }
}

export const getInfo = async ({ commit, state }) => {
  if (state.token.length === 0) return
  try {
    const { data } = await api.get('/users/me', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('getInfo', data.result)
  } catch (error) {
    commit('logout')
  }
}

export const addCart = async ({ commit, state }, product) => {
  if (state.token.length === 0) {
    Notify.create({
      message: '請先登入',
      type: 'negative'
    })
    return
  }
  if (product.quantity <= 0) {
    Notify.create({
      message: '請輸入正確數量',
      type: 'negative'
    })
    return
  }
  try {
    const { data } = await api.post('/users/me/cart', product, {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('updateCart', data.result)
    Notify.create({
      message: '已加入購物車',
      type: 'positive'
    })
  } catch (error) {
    console.log(product)
    Notify.create({
      message: error.response.data.message,
      type: 'negative'
    })
  }
}
