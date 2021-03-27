import { CheckCircleTwoTone } from '@ant-design/icons';
import { Badge, Card } from 'antd';
import { useEffect, useRef, useState } from 'react';

function CheckedCard({ checked: checkedProp = false, className, children, style, ...restProps }, ref) {
    let [checked, setChecked] = useState(false);
    let inputRef = useRef();
    console.debug(1);

    useEffect(() => {
        console.debug(2);
        setChecked(checkedProp);
    }, [checkedProp]);

    let change = (e) => {
        let newChecked = e.target.checked;
        restProps.onChange ? restProps.onChange(newChecked) : setChecked(newChecked);
    };

    let onClick = () => {
        inputRef.current.click();
    };

    return (
        <>
            <input
                type="checkbox"
                name={restProps.name}
                checked={checked}
                className="d-none"
                readOnly
                onChange={change}
                ref={inputRef}
            />
            <Badge count={<CheckCircleTwoTone className={checked || 'invisible'} />}>
                <Card hoverable style={checked ? { border: '1px solid #1890FF' } : {}} onClick={onClick}>
                    {children}
                </Card>
            </Badge>
        </>
    );
}

export default CheckedCard;
