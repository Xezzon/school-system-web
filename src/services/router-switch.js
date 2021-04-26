import { Redirect, Route, Switch } from 'react-router-dom';

function RouterSwitch(routes) {
    return <Switch>{routes.map(RouterRoute)}</Switch>;
}

function RouterRoute(route) {
    let routeList = [];
    let redirectList = [];

    if (route.routes) {
        routeList.push(...route.routes.map((route) => RouterRoute(route)));
    } else if (route.redirect) {
        redirectList.push(<Redirect exact={route.exact} from={route.path} to={route.redirect} />)
    } else {
        routeList.push(<Route path={route.path} component={route.component} />);
    }
    return [...routeList, ...redirectList];
}

export default RouterSwitch;
