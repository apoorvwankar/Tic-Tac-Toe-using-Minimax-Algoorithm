# Tic Tac Toe using Minimax Algorithm

Tic-tac-toe is a paper-and-pencil game for two players who take turns marking the spaces in a three-by-three grid with X or O.
This is an implementation of Minimax Algorithm for the Tic Tac Toe game. 

![game](https://user-images.githubusercontent.com/74948909/169686252-4ef3e57a-d8ce-4d26-b974-f44be49fd62f.jpg)

## Minimax

The minimax algorithm is used in Artificial Intelligence to determine an optimal move for a player in a two-player game. It assumes that the other player is playing optimally.
## Run Locally

Clone the project

```bash
  git clone https://github.com/apoorvwankar/Tic-Tac-Toe-using-Minimax-Algorithm
```



## Game Space Tree

This game tree depicts all the possible paths that the game can take from the root board state.Sometimes it is impossible for minimax to compute every possible game state for complex games like Chess. Hence we only compute upto a certain depth and use the evaluation function to calculate the value of the board. Minimax is applied to only to 2 player games.  

![tree](https://user-images.githubusercontent.com/74948909/169686262-d0cc2c55-9443-463e-9ce8-d86cba023636.png)

There are total 11 nodes in the tree.
