import React from 'react';
import ReactDOM from 'react-dom';
import boostrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom';
import routes from './routes';



ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('root')
        
);
registerServiceWorker();
