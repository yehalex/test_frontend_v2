import { deleteUser } from '~/server/services/userService'
import { apiResponse, handleApiError, validateBody } from '~/server/utils/apiHelpers'

const validateDeleteUser = (b: any): { id: number } => {
  const id = Number(b?.id)
  if (!Number.isInteger(id) || id <= 0) throw new Error('Invalid user ID')
  return { id }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validated = validateBody(validateDeleteUser, body)
    const result = await deleteUser(validated.id)
    return apiResponse(result)
  } catch (err) {
    handleApiError(err)
  }
})
