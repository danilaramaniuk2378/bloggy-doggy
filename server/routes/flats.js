import express from 'express';
import passport from 'passport';
import FlatsController from '../controllers/flats';
import {
  validateBody,
  schemas,
} from '../helpers/validation';

const passportJWT = passport.authenticate('jwt', { session: false });
const app = express.Router();

app.post(
  '/add-flat',
  passportJWT,
  validateBody(schemas.addFlatSchema),
  FlatsController.addFlat,
);

export default app;
