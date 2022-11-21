import express, { Request, Response } from "express";
import userModel from "~/models/userModel";

const bcrypt = require('bcrypt');
const salRounds = 10;

let Router = express.Router();

Router.post('/register', (request: Request, response: Response): Response => {
  const { email, email_cfg, password, password_cfg } = request.body;
  if ((typeof email == 'string' && email != '') &&
      (typeof password == 'string' && password != '') &&
      (typeof email_cfg == 'string' && email_cfg != '') &&
      (typeof password_cfg == 'string' && password_cfg != '')
      ) {
        if (email != email_cfg || password != password_cfg) {
          return response.status(500).json({"msg": "Email or Password do not match."});
        }
        bcrypt.hash(password, salRounds, (err: any, hash: any) => {
          if (err) {
            return response.status(500).json({"msg": "Failed to encrypt the password."});
          }
          userModel.create({
            email,
            "password": hash
          }, (error) => {
              if (error) return response.status(500).json({"msg": "Failed to register. " + error});
          });
        });
  } else {
    return response.status(500).json({"msg": "Email and Password are either missing or empty."});
  }

  return response.status(200).json("Successfully register");
});

Router.post('/login', async (request: Request, response: Response) => {
  const { email, password } = request.body;

  if ((typeof email == 'string' && email != '') &&
      (typeof password == 'string' && password != '')) {
        try {
          let res = await userModel.findOne({ email });
          if (res) {
            let success = await bcrypt.compare(password, res.password);
            if (success) {
              return response.status(200).json({"msg": "Successfully login"});
            }
            return response.status(500).json({"msg": "Email or Password is incorrect."});
          }
          return response.status(500).json({"msg": "Email or Password is incorrect."});
        } catch (err) {
          return response.status(500).json({"msg": "Failed to login. " + err});
        }
  }
  return response.status(500).json({"msg": "Email and Password are either missing or empty."});
});

export default Router;