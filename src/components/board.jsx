import React from 'react';
import {Link} from 'react-router-dom';

// Import Storage object
import {Storage} from './../storage/storage'

// Import Box component
import {Box} from './board-box'

// Import utility functions
import * as utils from '../utils/functions'

// Create Board component
export class Board extends React.Component {
    constructor(props) {
        super(props);

        // Initialize component state
        this.state = {
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        };
    }

    // Create instance of Storage object
    storage = new Storage();

    // Handle click on boxes on the board.
    handleBoxClick(index) {
        // get current state of boxes
        const boxes = this.state.boxes.slice();

        // Get current state of history
        let history = this.state.history;

        // Stop the game if board contains winning combination
        if (utils.findWinner(boxes) || boxes[index]) {
            return;
        }

        // Stop the game if all boxes are clicked (filled)
        if (utils.areAllBoxesClicked(boxes) === true) {
            return;
        }

        // Mark the box either as 'x' or 'o'
        boxes[index] = this.state.xIsNext ? 'x' : 'o';

        // Add move to game history
        history.push(this.state.xIsNext ? 'x' : 'o');

        // Update component state with new data
        this.setState({
            boxes: boxes,
            history: history,
            xIsNext: !this.state.xIsNext
        });
    }

    // Handle board restart - set component state to initial state
    handleBoardRestart = () => {
        this.setState({
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        });
    }

    render() {
        // Get winner (if there is any)
        const winner = utils.findWinner(this.state.boxes);

        // Are all boxes checked?
        const isFilled = utils.areAllBoxesClicked(this.state.boxes);

        // Status message
        let status;

        if (winner) {
            // If winner exists, create status message
            status = `The winner is: ${winner}!`;

            // Push data about the game to storage
            this.storage.update([`${winner} won`]);
        } else if (!winner && isFilled) {
            // If game is drawn, create status message
            status = 'Game drawn!';

            // Push data about the game to storage
            this.storage.update(['Game drawn']);
        } else {
            // If there is no winner and game is not drawn, ask the next player to make a move
            status = `It is ${(this.state.xIsNext ? 'x' : 'o')}'s turn.`;
        }

        return (
            <>
                {/* Link to scoreboard */}
                <Link to="/" className="board-link">Go back to scoreboard</Link>

                {/* The game board */}
                <div className="board-wrapper">
                    <div className="board">
                        <h2 className="board-heading">{status}</h2>

                        <div className="board-row">
                            <Box value={this.state.boxes[0]} onClick={() => this.handleBoxClick(0)}/>

                            <Box value={this.state.boxes[1]} onClick={() => this.handleBoxClick(1)}/>

                            <Box value={this.state.boxes[2]} onClick={() => this.handleBoxClick(2)}/>
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[3]} onClick={() => this.handleBoxClick(3)}/>

                            <Box value={this.state.boxes[4]} onClick={() => this.handleBoxClick(4)}/>

                            <Box value={this.state.boxes[5]} onClick={() => this.handleBoxClick(5)}/>
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[6]} onClick={() => this.handleBoxClick(6)}/>

                            <Box value={this.state.boxes[7]} onClick={() => this.handleBoxClick(7)}/>

                            <Box value={this.state.boxes[8]} onClick={() => this.handleBoxClick(8)}/>
                        </div>
                    </div>

                    <div className="board-history">
                        <h2 className="board-heading">Moves history:</h2>

                        {/* List with history of moves */}
                        <ul className="board-historyList">
                            {this.state.history.length === 0 && <span>No moves to show.</span>}

                            {this.state.history.length !== 0 && this.state.history.map((move, index) => {
                                return <li key={index}>Move {index + 1}: <strong>{move}</strong></li>
                            })}
                        </ul>
                    </div>

                    {/* Button to start new game */}
                    {winner && <div className="board-footer">
                        <button className="btn" onClick={this.handleBoardRestart}>Start new game</button>
                    </div>}
                </div>
            </>
        );
    }
}
