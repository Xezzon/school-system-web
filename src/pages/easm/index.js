import { MixLayout } from '@/components';
import { render } from 'react-dom';
import studentRoute from './student/route';

function Easm() {
    return <MixLayout route={studentRoute} />;
}

render(<Easm />, document.getElementById('rc'));
