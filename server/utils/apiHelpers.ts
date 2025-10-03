export function apiResponse<T>(data: T) {
  return { code: 0, message: 'success', data }
}

export function handleApiError(err: unknown): never {
  if (err && typeof err === 'object' && 'statusCode' in err) {
    throw err
  }

  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as any
    const status = axiosErr.response?.status || 500
    const rawMsg = axiosErr.response?.data?.message
    const statusMessage =
      typeof rawMsg === 'string' && rawMsg.toLowerCase() !== 'success'
        ? rawMsg
        : 'External API request failed'
    throw createError({ statusCode: status, statusMessage })
  }

  if (err && typeof err === 'object' && 'code' in err) {
    const netErr = err as any
    if (netErr.code === 'ECONNABORTED') {
      throw createError({ statusCode: 504, statusMessage: 'External API timeout' })
    }
    if (netErr.code === 'ECONNREFUSED') {
      throw createError({ statusCode: 503, statusMessage: 'External API unavailable' })
    }
  }

  throw createError({
    statusCode: 500,
    statusMessage: err instanceof Error ? err.message : 'Internal server error',
  })
}

export function validateBody<T>(validator: (body: any) => T, body: unknown): T {
  try {
    return validator(body as any)
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: e instanceof Error ? e.message : 'Invalid request body',
    })
  }
}
