import { Redirect, Route, Switch } from 'react-router-dom';

function RouterSwitch({ routes }) {
    let route2component = (route) => {
        let routeList = [];
        let redirectList = [];

        if (route.routes) {
            routeList.push(...route.routes.map((route) => route2component(route)));
        } else if (route.redirect) {
            redirectList.push(<Redirect exact={true} from={route.path} to={route.redirect} />);
        } else {
            routeList.push(<Route exact={true} path={route.path} component={route.component} />);
        }
        return [...routeList, ...redirectList];
    };

    return <Switch>{routes.map(route2component)}</Switch>;
}

export default RouterSwitch;
