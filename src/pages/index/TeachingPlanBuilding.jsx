import { Fragment, useEffect, useState } from 'react';
import axios from '@/services/axios';
import { Card, Checkbox, Divider, List } from 'antd';

function TeachingPlanBuilding() {
    let [klasos, setKlasos] = useState([]);
    let [klasoSelected, setKlasoSelected] = useState([]);

    useEffect(() => {
        axios.get('/major/klaso').then(({ data }) => {
            setKlasos(data);
        });
        return () => {};
    }, []);

    return (
        <Fragment>
            <For each="majors" of={klasos}>
                <Divider orientation="left" key={majors.major}>
                    {majors.major}
                </Divider>
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                    dataSource={majors.klasos}
                    renderItem={({ id, name }) => (
                        <List.Item>
                            <Card>
                                <Checkbox value={id}>
                                    <a _href={id}>{name}</a>
                                </Checkbox>
                            </Card>
                        </List.Item>
                    )}
                />
            </For>
        </Fragment>
    );
}

export default TeachingPlanBuilding;
