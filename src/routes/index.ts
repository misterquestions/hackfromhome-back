import { Router } from 'express';
import * as health from './health';
import * as challenges from './challenges';

export class Routes {
  private readonly router: Router = Router();

  public constructor() {
    this.initialize();
  }

  public initialize(): void {
    this.router.get('/health', health.index);

    this.router.get('/challenges', challenges.index);
  }

  public getRouter(): Router {
    return this.router;
  }
}
