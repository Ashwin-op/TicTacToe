export class Storage {
    constructor(storageName = 'gameScoreboard', initialValue = '[]') {
        this.storageName = storageName;

        // Check if localStorage contains any data from previous games
        if (!localStorage.getItem(storageName)) {
            // If not, create new item for our Tic Tac Toe game
            localStorage.setItem(storageName, initialValue);
        }
    }

    // Load data from previous games from localStorage
    getData() {
        return JSON.parse(localStorage.getItem(this.storageName));
    }

    // Update data in localStorage
    update(data) {
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }
}
