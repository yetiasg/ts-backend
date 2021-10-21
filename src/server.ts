import { App } from './App';
import config from './config/config';
import { UserController } from './api/v1/controllers/User.controller';
import { UserController2 } from './api/v1/controllers/User2.controller'; 
import { AuthController } from './api/v1/controllers/Auth.controller';

const port: number = Number(config.server.PORT);

new App([
  new UserController(),
  new UserController2(),
  new AuthController()
], port).listen();

