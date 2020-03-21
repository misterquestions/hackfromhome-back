import express, { Application } from 'express';
import cors from 'cors';
import { Routes } from './routes';

class Core {
  private readonly app: Application = express();

  public initialize() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    const routes: Routes = new Routes();
    this.app.use('/api', routes.getRouter());

    this.app.listen(process.env.port || 3000);

    console.log('Application started!');
  }
}


/*
*   Application boot
*   
*   Here the application main instance its created, we initialize and handle main process.
*   Make sure not to create two or more instances of core class.
*
*/
const core: Core = new Core();

core.initialize();