/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express'

export const fileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //@ts-ignore
    const file = req?.files as any

    console.log(file);
    res.status(200).send({
      success: true,
      data: file[0]?.path,
    })
  } catch (err) {
    next(err)
  }
}
