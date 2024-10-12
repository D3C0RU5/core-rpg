import { NextFunction, Request, Response } from 'express'

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization?.split(' ')[1]
  } else {
    res.status(401).json({
      message: 'Unatuthorized',
    })
  }
}
