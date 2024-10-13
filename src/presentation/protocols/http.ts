/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserPayload } from '../../core/usecases/protocols/criptography/interface/user-payload'

export type HttpRequest = {
  headers?: {
    user?: UserPayload
  }
  body?: any
}

export type HttpResponse = {
  statusCode: number
  body: any
}
