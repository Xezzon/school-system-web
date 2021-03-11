import { Badge, Card } from 'antd';
import { useState } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';

function CheckedCard({ children, option, ...props }) {
    const [checked, setChecked] = useState(false);

    let toggleChecked = () => {
        setChecked(!checked);
    };

    return (
        <Badge count={<CheckCircleTwoTone style={{ visibility: checked || 'hidden' }} />} {...option}>
            <Card {...props} hoverable style={checked ? { border: '1px solid #1890FF' } : {}} onClick={toggleChecked}>
                {children}
            </Card>
        </Badge>
    );
}

export default CheckedCard;
