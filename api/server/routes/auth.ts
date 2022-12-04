import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

import userModel from "~/models/userModel";

const saltRounds = 10;

let Router = express.Router();

Router.post('/register', async (request: Request, response: Response): Promise<Response> => {
  const { email, email_cfg, password, password_cfg } = request.body;
  let user;
  if ((typeof email == 'string' && email != '') &&
      (typeof password == 'string' && password != '') &&
      (typeof email_cfg == 'string' && email_cfg != '') &&
      (typeof password_cfg == 'string' && password_cfg != '')
      ) {
        if (email != email_cfg || password != password_cfg) {
          return response.status(500).json({"msg": "Email or Password do not match."});
        }
        try {
          user = await userModel.create({
            email,
            "password": bcrypt.hashSync(password, saltRounds)
          });
        } catch (error) {
          return response.status(500).json({"msg": "Failed to register. " + error});
        }
  } else {
    return response.status(500).json({"msg": "Email and Password are either missing or empty."});
  }

  return response.status(200).json("Successfully registered.\n" + user);
});

Router.post('/login', async (request: Request, response: Response) => {
  const { email, password } = request.body;

  if ((typeof email == 'string' && email != '') &&
      (typeof password == 'string' && password != '')) {
        try {
          let res = await userModel.findOne({ email });
          if (res) {
            let success = await bcrypt.compareSync(password, res.password);
            if (success) {
              return response.status(200).json({"msg": "Successfully login"});
            }
          }
          return response.status(500).json({"msg": "Email or Password is incorrect."});
        } catch (err) {
          return response.status(500).json({"msg": "Failed to login. " + err});
        }
  }
  return response.status(500).json({"msg": "Email and Password are either missing or empty."});
});

export default Router;