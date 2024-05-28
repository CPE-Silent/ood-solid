import { Router } from "express"; 
import auth from './auth.router'

const router = Router();
export default (): Router => {
  auth(router);
  return router;
}