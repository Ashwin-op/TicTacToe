export const findWinner = boxes => {
    // Array with winning combinations
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Iterate over array with winning combinations
    for (let i = 0; i < rows.length; i++) {
        const [a, b, c] = rows[i];

        // Check if the game board contains winning combination
        if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
            // Return the winner ('x' or 'o')
            return boxes[a];
        }
    }

    // Otherwise do nothing
    return null;
};

export const areAllBoxesClicked = boxes => {
    // Declare variable to store number of clicked boxes.
    let count = 0;

    // Iterate over all boxes
    boxes.forEach(item => {
        // Check if box is clicked (not null)
        if (item !== null) {
            // If yes, increase the value of count by 1
            count++;
        }
    });

    // Check if all boxes are clicked (filled)
    return count === 9;
};
