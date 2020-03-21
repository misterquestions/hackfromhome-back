import { Router } from 'express';
import * as health from './health';

export class Routes {
  private readonly router: Router = Router();

  public constructor() {
    this.initialize();
  }

  public initialize(): void {
    this.router.get('/health', health.index);
  }

  public getRouter(): Router {
    return this.router;
  }
}
