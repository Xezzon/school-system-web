import React from 'react';
import { AuthContext } from '@/context/auth';

/**
 * 依据权限渲染组件
 * @param {React.Component} WrappedComponent 有相应权限时渲染的组件
 * @param {string} requiredPermissions 需要的权限
 * @param {React.Component} FeedbackComponent 无权限时渲染的组件
 */
const withPermissions = (WrappedComponent, requiredPermissions, FeedbackComponent) => {
    let user = React.useContext(AuthContext);
    console.debug(requiredPermissions, user, user.permissions.includes(...requiredPermissions))
    return user.permissions.includes(...requiredPermissions) ? WrappedComponent : FeedbackComponent;
};

export { withPermissions };
