import { render } from 'react-dom';
import Eams from './App';

const rootEl = document.getElementById('rc');
render(<Eams />, rootEl);

if (module.hot) {
    module.hot.accept('./App', () => {
        const App = require('./App').default;
        render(<Eams />, rootEl);
    });
}
