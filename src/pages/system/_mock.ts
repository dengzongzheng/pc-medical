import { Request, Response } from 'express';

export default {
  'GET  /api1/user/testSupervise': (_:Request, res:Response) => {
    res.send({
      message: 'Ok',
      data: { code: 1, data: 'haha', message: '12311' },
    });
  },
};
