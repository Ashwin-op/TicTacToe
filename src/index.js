import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router';
// Import Board and Scoreboard views
import {Board} from './components/board';
import {Scoreboard} from './components/scoreboard';

import './styles/board.css';
import './styles/box.css';
import './styles/buttons.css';


// Create App component
class App extends React.Component {
    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <Route exact path="/" component={Scoreboard}/>
                    <Route path="/board" component={Board}/>
                </BrowserRouter>
            </div>
        );
    }
}

// Render the App component into DOM
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
