const getEnvAsNumberOrNull = (value: string | undefined) => {
  const asNumber = Number(value)
  const isNumber = !isNaN(asNumber)
  return isNumber ? asNumber : null
}

export default {
  port: process.env.APPLICATION_PORT ?? 5050,
  SALT: getEnvAsNumberOrNull(process.env.SALT) ?? 12,
  SECRET: process.env.SECRET ?? 'temporary-secret',
  EXPIRATION_HOURS: getEnvAsNumberOrNull(process.env.EXPIRATION_HOURS) ?? 1,
}
