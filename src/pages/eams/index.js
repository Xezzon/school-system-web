import { MixLayout } from '@/components';
import { render } from 'react-dom';
import officerRoute from './officer/route';

function Eams() {
    return <MixLayout route={officerRoute} />;
}

render(<Eams />, document.getElementById('rc'));
