import { Router } from 'express';
import * as health from './health';
import * as user from './users';

export class Routes {
  private readonly router: Router = Router();

  public constructor() {
    this.initialize();
  }

  public initialize(): void {
    this.router.get('/health', health.index);
    this.router.post('/users', user.create);
  }

  public getRouter(): Router {
    return this.router;
  }
}
