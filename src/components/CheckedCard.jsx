import { CheckCircleTwoTone } from '@ant-design/icons';
import { Badge, Card } from 'antd';
import { useEffect, useState } from 'react';

function CheckedCard({ checked: checkedProp = false, className, children, style, onChange, ...restProps }) {
    let [checked, setChecked] = useState(false);
    console.debug(1);

    useEffect(() => {
        console.debug(2);
        setChecked(checkedProp);
    }, [checkedProp]);

    let change = () => {
        onChange ? onChange(!checked) : setChecked(!checked);
    };

    return (
        <Badge count={<CheckCircleTwoTone className={checked || 'invisible'} />} className={className}>
            <Card
                hoverable
                style={checked ? { border: '1px solid #1890FF', ...style } : { ...style }}
                onClick={change}
                {...restProps}
            >
                {children}
            </Card>
        </Badge>
    );
}

export default CheckedCard;
