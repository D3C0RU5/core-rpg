import { BaseError } from '../../../utils/errors/base-error'
import { ServerError } from '../../errors/server-error'
import { HttpResponse } from '../../protocols/http'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { message: error.message, name: error.name },
})

export const serverError = (error: unknown): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error.stack : undefined),
})

export const handleError = (error: unknown): HttpResponse => {
  if (error instanceof BaseError) {
    return {
      statusCode: 400,
      body: { message: error.message, name: error.name },
    }
  } else {
    console.error(error)
    return {
      statusCode: 500,
      body: new ServerError(error instanceof Error ? error.stack : undefined),
    }
  }
}
