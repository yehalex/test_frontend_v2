import { defineStore } from 'pinia'
import type { User } from '@/types/user'

interface ApiResponse {
  code: number
  message: string
  data: User[]
}

interface CreateUserResponse {
  code: number
  message: string
  data: { id: number }
}

interface UpdateUserResponse {
  code: number
  message: string
  data: string
}

interface DeleteUserResponse {
  code: number
  message: string
  data: { id: number }
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    byId: (state) => (id: number) => state.users.find((u) => u.id === id),
    count: (state) => state.users.length,
  },

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('/api/user')
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const res: ApiResponse = await response.json()
        this.users = res.data || []
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Failed to fetch users'
      } finally {
        this.loading = false
      }
    },

    async createUser(userData: { name: string; age: number }) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userData.name,
            age: userData.age,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const res: CreateUserResponse = await response.json()

        await this.fetchUsers()
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Failed to create user'
      } finally {
        this.loading = false
      }
    },

    async updateUser(user: User, userData: { name: string; age: number }) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
            name: userData.name,
            age: userData.age,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const res: UpdateUserResponse = await response.json()

        await this.fetchUsers()
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Failed to update user'
      } finally {
        this.loading = false
      }
    },

    async deleteUser(user: User) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('/api/user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const res: DeleteUserResponse = await response.json()

        await this.fetchUsers()
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Failed to delete user'
      } finally {
        this.loading = false
      }
    },

    clear() {
      this.users = []
      this.error = null
      this.loading = false
    },
  },
})
