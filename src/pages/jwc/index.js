import { MixLayout } from '@/components';
import { render } from 'react-dom';
import studentRoute from './student/route';

function Jwc() {
    return <MixLayout route={studentRoute} />;
}

render(<Jwc />, document.getElementById('rc'));
