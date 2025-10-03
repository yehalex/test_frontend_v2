import { updateUser } from '~/server/services/userService'
import { apiResponse, handleApiError, validateBody } from '~/server/utils/apiHelpers'
import type { UpdateUserDTO } from '~/server/services/userService'

const validateUpdateUser = (b: any): UpdateUserDTO => {
  const id = Number(b?.id)
  const name = typeof b?.name === 'string' ? b.name.trim() : String(b?.name ?? '').trim()
  const age = Number(b?.age)
  if (!Number.isInteger(id) || id <= 0) throw new Error('Invalid user ID')
  if (!name) throw new Error('Name is required')
  if (!Number.isInteger(age) || age <= 0) throw new Error('Age must be a positive number')
  return { id, name, age }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validated = validateBody(validateUpdateUser, body)
    const result = await updateUser(validated)
    return apiResponse(result)
  } catch (err) {
    handleApiError(err)
  }
})
