import { useState } from 'react';
import { calculateWinner } from '../../utils/WinnerCalculator';
import { Board } from '../Borad/Board';
import { ResultModal } from '../ResultModal/ResultModal';
import './Game.css';

export const Game = () => {

    const [cellValues, setCellValues] = useState(['', '', '', '', '', '', '', '', '']);
    const [xIsNext, setXIsNext] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [numberOfTurnsLeft, setNumberOfTurnsLeft] = useState(9);
    const [winner, setWinner] = useState();
    const [winningCombination, setWinningCombination] = useState([]);

    const isCellEmpty = (cellIndex) => cellValues[cellIndex] === '';

    const restartGame = () => {
        setCellValues(['', '', '', '', '', '', '', '', '']);
        setXIsNext(true);
        setIsGameOver(false);
        setNumberOfTurnsLeft(9);
        setWinner(undefined);
        setWinningCombination([]);
    };


    const onCellClicked = (cellIndex) => {
        if (isCellEmpty(cellIndex)) {
            const newCellValues = [...cellValues];
            newCellValues[cellIndex] = xIsNext ? 'X' : 'O';

            const newNumberOfTurnsLeft = numberOfTurnsLeft - 1;

            // Calculate The Result

            const calcResult = calculateWinner(newCellValues, newNumberOfTurnsLeft, cellIndex);
            setCellValues(newCellValues);
            setXIsNext(!xIsNext);
            setIsGameOver(calcResult.hasResult);
            setNumberOfTurnsLeft(newNumberOfTurnsLeft);
            setWinner(calcResult.winner);
            setWinningCombination(calcResult.winningCombination);
        }
    };

    return (
        <>

            <div id="game">
                <h1>Tic Tac Toe</h1>
                <Board
                    cellValues={cellValues}
                    winningCombination={winningCombination}
                    cellClicked={onCellClicked} />
            </div>

            <ResultModal
                isGameOver={isGameOver}
                winner={winner}
                onNewGameClicked={restartGame}
            />

        </>
    );
}
