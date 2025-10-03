import { getUsers } from '~/server/services/userService'
import { apiResponse, handleApiError } from '~/server/utils/apiHelpers'

export default defineEventHandler(async () => {
  try {
    const data = await getUsers()
    return apiResponse(data)
  } catch (err) {
    handleApiError(err)
  }
})
