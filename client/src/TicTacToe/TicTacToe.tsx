import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DIMENSIONS, PLAYER_X, PLAYER_O, SQUARE_DIMS, GAME_STATES, DRAW, GAME_MODES, GAME_TYPE } from "./constants";
import { getRandomInt, switchPlayer } from "./utils";
import Board from "./board";
import { minimax } from './minimax';
import { ResultModal } from "./Modal";
import { border } from "./styles";
import tempImage from "../static/images/icon.png"
import { UserContext } from "../static/UserContext";
import {Socket, io} from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import PlayerProps from "../common/Player";
import { User } from "../common/TicTacToe";

const emptyGrid = new Array(DIMENSIONS ** 2).fill(null);
const board = new Board();

function TicTacToe() {

  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

useEffect(() => {
  if(socket == undefined && !socket){
    const newSocket:Socket<DefaultEventsMap, DefaultEventsMap> = io('http://localhost:8000')
    setSocket(newSocket)
  }
}, [])

socket?.on("rematch", ()=> {
  multiplayerSetup();
})

socket?.on("find", ()=> {
  multiplayerSetup();
})

socket?.on("grid", (e)=> {
  console.log("this is the returned grid info: ", e.grid)
  let passedData = e.grid
  setGrid(passedData);
  });

  let user = React.useContext(UserContext)!;

  const [modalOpen, setModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);  
  const [grid, setGrid] = useState(emptyGrid);
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);

  //multiplayer values
  const [winner, setWinner] = useState<null | string>(null);
  const [client, setClient] = useState<PlayerProps>();


  //single player values
  const [mode, setMode] = useState(GAME_MODES.medium);
  const [nextMove, setNextMove] = useState<null|number>(null);
  const [gameType, setGameType] = useState(GAME_TYPE.singleplayer);
  const [players, setPlayers] = useState<Record<string, number | null>>({
    human: null,
    ai: null,
  });
  
  const close = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(emptyGrid);
    setModalOpen(false);
    socket?.emit("exit game")
  };

  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(emptyGrid);
    setModalOpen(false);
    socket?.emit("rematch")
  };

  const closeLocalGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(emptyGrid);
    setModalOpen(false);
  };

  const startNewLocalGame = () => {
    setGrid(emptyGrid);
    setModalOpen(false);
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
  };

  useEffect(() => {
    if(user.username !== null && user.username !== undefined){
      setClient({...client, name:user.username! });
    }
    else
    {
      setClient({...client, name: `Anon${getRandomInt(500,3000).toString()}`});
    }
  }, []);

  // const move = useCallback(
  //   (index: number, player: number | null) => {
  //     console.log(player)
  //     if (player && gameState === GAME_STATES.inProgress) {
  //       setGrid((grid) => {
  //         const gridCopy = grid.concat();
  //         gridCopy[index] = player;
  //         return gridCopy;
  //       });
  //     }
  //   },
  //   [gameState]
  // );

  //SINGLE PLAYER FUNCTIONS
  if(gameType === GAME_TYPE.singleplayer){}
  const choosePlayer = (option: number) => {
    setGameType(GAME_TYPE.singleplayer);
    setPlayers({ human: option, ai: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
   
  };

  const changeMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const humanMove = (index: number) => {
    if (!grid[index] && nextMove === players.human) {
      localMove(index, players.human);
      setNextMove(players.ai);
    }
  };

     const localMove = useCallback(
    (index: number, player: number | null) => {
      console.log(player)
      if (player && gameState === GAME_STATES.inProgress) {
        setGrid((grid) => {
          const gridCopy = grid.concat();
          gridCopy[index] = player;
          return gridCopy;
        });
      }
    },
    [gameState]
  );

  const aiMove = useCallback(() => {
    if(gameType === GAME_TYPE.singleplayer){
      const board = new Board(grid.concat());
    const emptyIndices = board.getEmptySquares(grid);
    let index;
    switch (mode) {
      case GAME_MODES.easy:
        do {
          index = getRandomInt(0, 8);
        } while (!emptyIndices.includes(index));
        break;
      // Medium level moves are Minimax and random
      case GAME_MODES.medium:
        const smartMove = !board.isEmpty(grid) && Math.random() < 0.5;
        if (smartMove) {
          index = minimax(board, players.ai!)[1];
        } else {
          do {
            index = getRandomInt(0, 8);
          } while (!emptyIndices.includes(index));
        }
        break;
      case GAME_MODES.difficult:
      default:
        index = board.isEmpty(grid)
          ? getRandomInt(0, 8)
          : minimax(board, players.ai!)[1];
    }

    if (typeof index === "number" && !grid[index]) {
      if (players.ai !== null) {
        localMove(index, players.ai);
      }
      setNextMove(players.human);
    }
    }
    
  }, [localMove, grid, players, mode]);

  useEffect(() => {
    if(gameType == GAME_TYPE.singleplayer){
      let timeout: NodeJS.Timeout;
      if (
        nextMove !== null &&
        nextMove === players.ai &&
        gameState !== GAME_STATES.over
      ) {
        // Delay AI moves to make them seem more natural
        timeout = setTimeout(() => {
          aiMove();
        }, 500);
      }
      return () => timeout && clearTimeout(timeout);
    }
  }, [nextMove, aiMove, players.ai, gameState]);


  // MULTIPLAYER FUNCTIONS
  const multiplayerSetup = () => {
      setGameState(GAME_STATES.inProgress);
  };

  const move = useCallback(
    (index: number) => {
      if (gameState === GAME_STATES.inProgress) {
        let moveRequest = {cell: index}
        socket?.emit("fillBoard", moveRequest);
      }
    },
    [gameState]
  );

  const playerMove = (index: number) => {
    if (!grid[index])
      {
        move(index);
      }
  };

  
  const search = () => {
    if(socket && client !== undefined){
      setGameType(GAME_TYPE.multiplayer)
      let userObj:User = {id:socket.id, name: client.name!}
      console.log(userObj)
      socket.emit("find",{Data: userObj});
    }
  };
 

  // listeners
  useEffect(() => {
    const boardWinner = board.getWinner(grid);
    
    const declareWinner = (winner: number) => {
      let winnerStr;

      switch (winner) {
        case PLAYER_X:
          winnerStr = "Player X wins!";
          break;
        case PLAYER_O:
          winnerStr = "Player O wins!";
          break;
        case DRAW:
        default:
          winnerStr = "It's a draw";
      }

      setGameState(GAME_STATES.over);
      setWinner(winnerStr);
      // Slight delay for the modal so there is some time to see the last move
      setTimeout(() => setModalOpen(true), 300);
    };
 
    if (boardWinner !== null && gameState !== GAME_STATES.over) {
      declareWinner(boardWinner);
    }
  }, [gameState, grid, nextMove]);
   


  return gameState === GAME_STATES.notStarted ? (
    <div>
      <h1> Tic-Tac-Toe </h1>
      <TacBorder>
        <Inner>
        
          <p>Single Player</p>
          <select onChange={changeMode} value={mode}>
            {Object.keys(GAME_MODES).map(key => {
              const gameMode = GAME_MODES[key];
              return (
                <option key={gameMode} value={gameMode}>
                  {key}
                </option>
              );
            })}
          </select>
        </Inner>
        <Inner>
          <p>Choose your player</p>
          <ButtonRow>
            <button onClick={() => choosePlayer(PLAYER_X)}>X</button>
            <p>or</p>
            <button onClick={() => choosePlayer(PLAYER_O)}>O</button>
          </ButtonRow>
        </Inner>
      
        <Border>
          <Inner>
          <hr/>
            <p>Multiplayer</p>
            <button id="find" onClick={() => search()}> Search for players </button>
          </Inner>
        </Border>
      </TacBorder>
    </div>
  ) : (
    <Container dims={DIMENSIONS}>
    {grid?.map((value, index) => {
      const isActive = value !== null;
 
      return gameType === GAME_TYPE.multiplayer ? (
        <Square
          data-testid={`square_${index}`}
          key={index}
          onClick={() => playerMove(index)}
        >
          {isActive && <Marker>{value === PLAYER_X ? "X" : "O"}</Marker>}
        </Square>
      ) : 
        <Square
        data-testid={`square_${index}`}
        key={index}
        onClick={() => humanMove(index)}
      >
        {isActive && <Marker>{value === PLAYER_X ? "X" : "O"}</Marker>}
      </Square>
      ;
    })}

    {
      gameType === GAME_TYPE.multiplayer ? 
      <ResultModal
          isOpen={modalOpen}
          winner={winner}
          close={() => setModalOpen(false)}
          exit={close}
          startNewGame={startNewGame}
        /> :  

      <ResultModal
        isOpen={modalOpen}
        winner={winner}
        close={() => setModalOpen(false)}
        exit={closeLocalGame}
        startNewGame={startNewLocalGame}
      />
    }

    <Strikethrough
      styles={
        gameState === GAME_STATES.over ? board.getStrikethroughStyles() : ""
      }
    />

  </Container>
  );
};

const Border = styled.div`
border: 1px black;
border-style: solid;
`;

const TacBorder = styled.div`
border: 5px black;
border-style: solid;
margin-left: 50%;
transform: translateX(-50%);
max-width: 18%;
min-width: %;
`;
 
const Container = styled.div<{ dims: number }>`
  display: inline-flex;
  justify-content: center;
  width: ${({ dims }) => `${dims * (SQUARE_DIMS + 5)}px`};
  flex-flow: wrap;
  position: relative;
`;
 
const Marker = styled.p`
  font-size: 68px;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-between;
`;
 
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${SQUARE_DIMS}px;
  height: ${SQUARE_DIMS}px;
  ${border};                  // Adding new border styles
 
  &:hover {
    cursor: pointer;
  }
`;

const Strikethrough = styled.div<{ styles: string | null }>`
  position: absolute;
  ${({ styles }) => styles}
  background-color: indianred;
  height: 5px;
  width: ${({ styles }) => !styles && "0px"};
`;

export default TicTacToe;