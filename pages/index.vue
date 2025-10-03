<template>
  <div>
    <UserForm
      :user="editingUser"
      :isEditing="!!editingUser"
      @submit="handleFormSubmit"
      @cancel="handleFormCancel"
    />

    <UserList
      :users="usersStore.users"
      :loading="usersStore.loading"
      :error="usersStore.error"
      @edit="handleEditUser"
      @delete="handleDeleteUser"
    />

    <!-- Confirmation Dialogs -->
    <ConfirmationDialog
      ref="createDialogRef"
      :title="$t('createUser')"
      :message="$t('confirmCreate')"
      @confirm="confirmCreateUser"
      @cancel="cancelCreateUser"
    />

    <ConfirmationDialog
      ref="updateDialogRef"
      :title="$t('editUser')"
      :message="$t('confirmUpdate')"
      @confirm="confirmUpdateUser"
      @cancel="cancelUpdateUser"
    />

    <ConfirmationDialog
      ref="deleteDialogRef"
      :title="$t('delete')"
      :message="$t('confirmDelete')"
      @confirm="confirmDeleteUser"
      @cancel="cancelDeleteUser"
    />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/store/users'
import UserList from '@/components/UserList.vue'
import UserForm from '@/components/UserForm.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import type { User } from '@/types/user'

const baseUrl = '' // 後端網址 將由面試官提供

const usersStore = useUsersStore()
const editingUser = ref<User | null>(null)

// Dialog refs
const createDialogRef = ref()
const updateDialogRef = ref()
const deleteDialogRef = ref()

// Pending actions data
const pendingUserData = ref<{ name: string; age: number } | null>(null)
const pendingUser = ref<User | null>(null)

const loadUsers = () => {
  usersStore.fetchUsers()
}

const handleFormSubmit = async (userData: { name: string; age: number }) => {
  pendingUserData.value = userData

  if (editingUser.value) {
    // Show update confirmation
    updateDialogRef.value?.show()
  } else {
    // Show create confirmation
    createDialogRef.value?.show()
  }
}

const handleFormCancel = () => {
  editingUser.value = null
}

const handleEditUser = async (user: User) => {
  console.log('Parent received edit event for user:', user)
  editingUser.value = {
    id: user.id,
    name: user.name,
    age: user.age,
  }
}

const handleDeleteUser = async (user: User) => {
  console.log('Parent received delete event for user:', user)
  pendingUser.value = user
  deleteDialogRef.value?.show()
}

// Confirmation handlers
const confirmCreateUser = async () => {
  if (pendingUserData.value) {
    await usersStore.createUser(pendingUserData.value)
    pendingUserData.value = null
  }
}

const cancelCreateUser = () => {
  pendingUserData.value = null
}

const confirmUpdateUser = async () => {
  if (editingUser.value && pendingUserData.value) {
    await usersStore.updateUser(editingUser.value, pendingUserData.value)
    editingUser.value = null
    pendingUserData.value = null
  }
}

const cancelUpdateUser = () => {
  pendingUserData.value = null
}

const confirmDeleteUser = async () => {
  if (pendingUser.value) {
    await usersStore.deleteUser(pendingUser.value)
    pendingUser.value = null
  }
}

const cancelDeleteUser = () => {
  pendingUser.value = null
}

onMounted(() => {
  loadUsers()
})
</script>

<style scoped lang="scss"></style>
