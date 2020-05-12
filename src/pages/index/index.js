import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { lazyload } from '@/util';

const TeachingAffairsStudent = () => import('@/pages/index/TeachingAffairsStudent');
const TeachingAffairsAdmin = () => import('@/pages/index/TeachingAffairsAdmin');

/**
 * TODO: 1. 未登录用户先进行登录。
 *       2. 登录后，学生（权限为page:teaching-affairs:student）和教师（page:teaching-affairs:teacher）分别进入不同的页面，但是路由相同。若两者皆无，直接跳转到管理员界面。
 *       3. 在教师页面中，有管理员权限（page:teaching-affairs:admin）的教师可以在header的工具栏中进入管理员界面。
 *       4. 若无管理员权限进入管理员界面，则跳转到403界面。
 */
function TeachingAffairs() {
    return (
        <React.Fragment>
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/" component={lazyload(TeachingAffairsStudent)} />
                    <Route path="/admin" component={lazyload(TeachingAffairsAdmin)} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

function Header() {
    console.debug('Header:1');
    return <div>header</div>;
}

ReactDOM.render(<TeachingAffairs />, document.getElementById('rc'));
