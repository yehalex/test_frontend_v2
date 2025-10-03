<template>
  <div class="user-list">
    <div v-if="loading" class="loading">{{ $t('loading') }}</div>

    <div v-else-if="error" class="error">{{ $t('error') }}: {{ error }}</div>

    <div v-else-if="users.length === 0" class="empty">{{ $t('noUsers') }}</div>

    <div v-else class="table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('name') }}</th>
            <th>{{ $t('age') }}</th>
            <th>{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="user-row">
            <td class="user-id">{{ user.id }}</td>
            <td class="user-name">{{ user.name }}</td>
            <td class="user-age">{{ user.age }}</td>
            <td class="user-actions">
              <EBtn :text="$t('edit')" color="warn" @click="handleEdit(user)" />
              <EBtn :text="$t('delete')" color="error" @click="handleDelete(user)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'
import EBtn from './EBtn.vue'

interface Props {
  users: User[]
  loading?: boolean
  error?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
})

const emit = defineEmits<{
  edit: [user: User]
  delete: [user: User]
}>()

const handleEdit = (user: User) => {
  console.log('Edit user:', user)
  emit('edit', user)
}

const handleDelete = (user: User) => {
  console.log('Delete user:', user)
  emit('delete', user)
}
</script>

<style scoped lang="scss">
.user-list {
  width: 100%;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #ef4444;
  font-weight: 600;
}

.empty {
  color: #6b7280;
}

.table-container {
  overflow-x: auto;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background: white;

  th {
    background: #f9fafb;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;

    &:first-child {
      border-top-left-radius: 0.5rem;
    }

    &:last-child {
      border-top-right-radius: 0.5rem;
    }
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
    vertical-align: middle;
  }

  .user-row {
    transition: background-color 0.2s ease;

    &:hover {
      background: #f9fafb;
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  .user-id {
    font-family: 'Courier New', monospace;
    font-weight: 600;
    color: #6b7280;
    width: 80px;
  }

  .user-name {
    font-weight: 500;
    color: #111827;
  }

  .user-age {
    color: #6b7280;
    width: 80px;
  }

  .user-actions {
    width: 200px;

    .e-btn {
      margin-right: 0.5rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .user-table {
    font-size: 0.875rem;

    th,
    td {
      padding: 0.75rem 0.5rem;
    }

    .user-actions {
      .e-btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.75rem;
      }
    }
  }
}
</style>
