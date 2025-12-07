import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
    res.on('finish', () => {
      const line = `${new Date().toISOString()} ${req.ip} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms\n`;
      fs.appendFileSync(path.join(logDir, 'requests.log'), line);
    });
    next();
  }
}
