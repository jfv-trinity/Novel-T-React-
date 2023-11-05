import dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import * as http from "http"
import { Game, MoveRequest, User, GAME_STATES } from "./common/TicTacToe";
import { generateId, getRandomInt } from "./utils";
 
  function handleError(err:any, req:any, res:any, next:any) {
    res.status(err.statusCode || 500).send({ message: err.message, statusCode: err.status })
}

const app: Express = express();

AppDataSource.initialize().then(async () => {

  dotenv.config();

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

  //  PORTS & SOCKETS
  // const httpServer = http.createServer(app);

  //   const io = require("socket.io")(httpServer, {
  //   cors: {
  //     origin: "http://localhost:3000",
  //     methods: ["GET", "POST"]
  //   }
  // });

    // const socketPort = process.env.PORT || 8000;

  const server = require('http').createServer(app)
  
  // const io = require("socket.io")(server, {
  //   cors: {
  //     origin: "http://localhost:3000",
  //     methods: ["GET", "POST"]
  //   }
  // });

  const io = require("socket.io")(server, {
    cors: {
      origin: `${process.env.REACT_APP_URL}`,
      methods: ["GET", "POST"]
    }
  });


  const port = process.env.PORT || 8000;

  let user_list: User[] = []
  let searching_players: User[] = []
  let rematch_list: User[] = []
  let active_games: Game[] = []

  io.sockets.on('connection', newConnection);

  function newConnection(socket: any){

    socket.on('disconnect',  playerLeft);

    socket.on('fillBoard', updateBoard);

    socket.on('rematch', clearBoard);

    socket.on('exit game', closeGame);

    function playerLeft(){
      console.log("this socket has disconnected: ", socket.id )
     }

    function RemoveGame(game:Game){
      active_games = active_games.filter(activeGame => activeGame !== game)
    }

    function closeGame(){
      let game:Game = findGameById(socket.id)!;

      if(game == undefined){
        socket.rooms.forEach(function (value:any) {
          if(value != socket.id){
            game = findGameById(value)!;
          }
        })
      }
     
      if(game){
        RemoveGame(game);
      }
    }

    function clearBoard(){

      let game:Game = findGameById(socket.id)!;

      if(game == undefined){
        socket.rooms.forEach(function (value:any) {
          if(value != socket.id){
            game = findGameById(value)!;
          }
        })
      }

        game.grid = new Array(3 ** 2).fill(null),
        game.current_turn = game.players[0],
        game.state = GAME_STATES.in_progress
      
      io.sockets.in(game.players[0].id).emit('rematch', {grid:game.grid});

    }

    function findGameById(socketId:string):Game| undefined{
      return active_games.find((g) => g.hostId == socketId)
    }

    function updateBoard(request:MoveRequest){
    
      let moveRequest:MoveRequest = {cell: request.cell};

      let game:Game = findGameById(socket.id)!;

      if(game == undefined){
        socket.rooms.forEach(function (value:any) {
          if(value != socket.id){
            game = findGameById(value)!;
          }
        })
      }

      if(!game?.grid![moveRequest.cell] && game?.current_turn?.id == socket.id){

        switch(game?.current_turn){
          case game?.players[0]:
            game.grid![request.cell] = 1
            game.current_turn = game.players[1]
            break;
  
            case game?.players[1]:
            game.grid![request.cell] = 2
            game.current_turn = game.players[0]
            break;
  
          default:
            console.log("Error with request");
            break;
          }

          io.sockets.in(game.players[0].id).emit('grid', {grid:game.grid});
      }
    }

    socket.on("find", (e:any) => {

      let user:User = e.Data;

      if(user.name != null){

        user_list.push(user)

        searching_players.push(user)
      
        if(searching_players.length >= 2){

          let game:Game = {
            hostId: searching_players[0].id,
            grid: new Array(3 ** 2).fill(null),
            players: [searching_players[0], searching_players[1]],
            current_turn: searching_players[0],
            state: GAME_STATES.in_progress
          }
            socket.join(searching_players[0].id) 

            active_games.push(game);

            searching_players.splice(0,2)

            io.sockets.in(game.players[0].id).emit("find")
          }
        }
      })
    }

  // httpServer.listen(socketPort,()=>{
  //   console.log(`socket connected to ${socketPort}`)
  // });

  server.listen(port, () => {
    console.log(`Express server has started on port ${port}.`)
    console.log("this should have a port number: ", io);
  });
  
}).catch((error: any) => console.log(error))