import dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import * as http from "http"
 
  function handleError(err:any, req:any, res:any, next:any) {
    res.status(err.statusCode || 500).send({ message: err.message, statusCode: err.status })
}

setInterval(function () {
  
http.get("http://desolate-sands-65605.herokuapp.com", (res) => {
    res.setEncoding('utf8');
    res.on('data', function (body) {
        // console.log("GET CAME BACK", body);
    });
}); 
  
}, 300000); // every 5 minutes (300000)

AppDataSource.initialize().then(async () => {

  dotenv.config();

  const app: Express = express();

  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json())

  Routes.forEach(route => {
        (app as any)[route.method](route.route,
            //route.validation,
            async (req: Request, res: Response, next: Function) => {
                try {
                // const errors = validationResult(req)
                // console.log(errors)
                // if (!errors.isEmpty()) {
                //     return res.status(400).json({ errors: errors.array() })
                // }
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result)
            } catch (error) {
                next(error)
            }
            
        })
    })

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('/*', function (req: Request, res: Response) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

  app.use(handleError);
  
  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    setInterval(function () { http.get("http://desolate-sands-65605.herokuapp.com"); }, 300000); // every 5 minutes (300000)
    console.log(`Express server has started on port ${port}.`)
    http.get("http://desolate-sands-65605.herokuapp.com", (res) => {
    res.setEncoding('utf8');
    res.on('data', function (body) {
        // console.log("GET CAME BACK", body);
    });
});
  });
  
}).catch((error: any) => console.log(error))