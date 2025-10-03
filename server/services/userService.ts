import { api } from '../utils/axios'
import type { User } from '~/types/user'

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

async function request<T>(fn: Promise<any>): Promise<T> {
  const resp = await fn
  const body = resp.data as ApiResponse<T>

  if (!body || body.code !== 200) {
    throw new Error(body?.message || 'API request failed')
  }

  return body.data
}

export interface CreateUserDTO {
  name: string
  age: number
}

export interface UpdateUserDTO {
  id: number
  name: string
  age: number
}

export function getUsers() {
  return request<User[]>(api.get('/user'))
}

export function createUser(payload: CreateUserDTO) {
  return request<{ id: number }>(api.post('/user', payload))
}

export function updateUser(payload: UpdateUserDTO) {
  return request<string>(api.put('/user', payload))
}

export function deleteUser(id: number) {
  return request<{ id: number }>(api.delete('/user', { data: { id } }))
}
