import { MixLayout } from '@/components';
import { render } from 'react-dom';
import studentRoute from './student/route';

function Eams() {
    return <MixLayout route={studentRoute} />;
}

render(<Eams />, document.getElementById('rc'));
