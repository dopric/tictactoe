
import React, { useReducer } from 'react'
import BoardItem from './BoardItem'

var BoardItemModel = {
    text: null,
    index: -1
}

const boardItemsArray = Array();
for (let i = 0; i < 9; i++)
{
    let item = Object.create(BoardItemModel)
    item.text = null
    item.index = i
    boardItemsArray.push(item)
}

const reducer = (state, action) =>
{
    console.log(action)
    switch (action.type)
    {
        case 'start':
            return { ...state, status: 'Next player is X', started: true, boardItems: boardItemsArray }
        case 'end':
            return { ...state, status: 'Winner: X', started, boardItems: boardItemsArray }
        case 'restart':
            return { ...state, status: 'Next player is X', started: true, boardItems: boardItemsArray }
        case 'quit':
            return { ...state, status: 'Game not started', started: false, boardItems: boardItemsArray }
        case 'itemPlayed':
            const playedIndex = action.index

            state.boardItems[playedIndex].text = state.nextIsX ? 'X' : 'O'
            const msg = `Next player is ${state.nextIsX ? 'O' : 'X'}`
            return { ...state, status: msg, started: true, nextIsX: !state.nextIsX }
        case 'winning':
            return { ...state, status: `Congratulations Player ${action.winner}`, started: false }
        case 'equal_played':
            return { ...state, status: 'Game ended in a draw', started: false }
        default:
            return state
    }
}



const Game = () =>
{


    const [state, dispatch] = useReducer(reducer, { status: 'Game not started', nextIsX: true, winner: null, started: false, boardItems: boardItemsArray })
    const { nextIsX, status, started, boardItems } = state

    const resetBoardItems = () =>
    {
        boardItemsArray.forEach(element =>
        {
            element.text = null
        });
    }
    const handleStartGame = () =>
    {
        resetBoardItems()
        dispatch({ type: 'start' })
    }

    const quitGame = () =>
    {
        dispatch({ type: 'quit' })
    }

    const getWinner = (boardItems) =>
    {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations)
        {
            const [a, b, c] = combination;
            if (boardItems[a].text && boardItems[a].text === boardItems[b].text && boardItems[a].text === boardItems[c].text)
            {
                return boardItems[a].text;
            }
        }
        return null
    }

    const restartGame = () =>
    {
        resetBoardItems()
        dispatch({ type: 'restart' })
    }

    const handleItemPlayed = (item) =>
    {

        dispatch({ type: 'itemPlayed', index: item.index })
        setTimeout(() =>
        {
            const winner = getWinner(boardItems)
            if (winner !== null)
            {
                dispatch({ type: 'winning', winner: winner })
                return;
            } else
            {

                const isBoardFull = boardItems.filter(item => item.text === null).length === 0
                if (isBoardFull)
                {
                    dispatch({ type: 'equal_played' })
                }
            }
        })

    }

    return (
        <div className="home-page">
            <div className='game-home'>
                <h1 className='text-center text-2xl font-bold mb-4'>Tic Tac Toe</h1>
                <h2>{status}</h2> {started.toString()}
                <div className='game-board'>
                    {boardItems.map((item, index) => <BoardItem className="board-item" key={index} data={item} itemClicked={handleItemPlayed} enabled={started} />)}
                </div>
            </div>
            <div>
                {!started && <button className='status-btn' onClick={() => handleStartGame()} disabled={started}>Start the game</button>}
                {started && <div style={{ 'display': 'flex', 'flexDirection': 'column', 'padding': '10px' }}>
                    <button className='status-btn restart-btn' onClick={restartGame}>Restart the game</button>
                    <button className='status-btn quit-btn' onClick={quitGame}>Quit the game</button>

                </div>
                }
            </div>

        </div>
    )
}

export default Game