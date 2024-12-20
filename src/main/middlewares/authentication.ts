import { NextFunction, Request, Response } from 'express'
import { JwtAdapter } from '../../infra/criptography/jsonwebtoken/jwt-adapter'
import env from '../config/env'
import { UserPayload } from '../../core/usecases/protocols/criptography/interface/user-payload'

declare module 'express' {
  interface Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers: Record<string, any> & { user?: UserPayload }
  }
}

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers
    if (authorization) {
      const token = authorization?.split(' ')[1]

      const jwtAdapter = new JwtAdapter(env.SECRET, env.EXPIRATION_HOURS)
      req.headers.user = jwtAdapter.verify(token)
      next()
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      })
    }
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
    })
  }
}
