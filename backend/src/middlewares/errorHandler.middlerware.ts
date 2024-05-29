import { Request, Response, NextFunction } from 'express';

export function ErrorHandler(errorMessage: string = 'Internal Server Error') {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        await originalMethod.call(this, req, res, next);
      } catch (error) {
        const errorText = `Error in ${target.constructor.name}.${propertyKey}:`;
        console.error(errorText, error);
        res.status(500).json({ message: errorMessage });
      }
    };

    return descriptor;
  };
}
