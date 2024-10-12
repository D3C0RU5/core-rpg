const getEnvAsNumberOrNull = (value: string | undefined) => {
  const asNumber = Number(value)
  const isNumber = !isNaN(asNumber)
  return isNumber ? asNumber : null
}

export const env = {
  SALT: getEnvAsNumberOrNull(process.env.SALT) ?? 12,
  SECRET: process.env.SECRET ?? 'temporary-secret',
  EXPIRATION_HOURS: getEnvAsNumberOrNull(process.env.EXPIRATION_HOURS) ?? 1,
}
