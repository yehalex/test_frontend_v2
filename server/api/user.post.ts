import { createUser } from '~/server/services/userService'
import { apiResponse, handleApiError, validateBody } from '~/server/utils/apiHelpers'
import type { CreateUserDTO } from '~/server/services/userService'

const validateCreateUser = (b: any): CreateUserDTO => {
  const name = typeof b?.name === 'string' ? b.name.trim() : String(b?.name ?? '').trim()
  const age = Number(b?.age)
  if (!name) throw new Error('Name is required')
  if (!Number.isInteger(age) || age <= 0) throw new Error('Age must be a positive number')
  return { name, age }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validated = validateBody(validateCreateUser, body)
    const result = await createUser(validated)
    return apiResponse(result)
  } catch (err) {
    handleApiError(err)
  }
})
