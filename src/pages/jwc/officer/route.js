import { lazyload } from '@/services/lazyload';

export default {
    title: '教务管理系统',
    routes: [
        {
            path: '/',
            redirect: '/teaching-plan',
            exact: true,
        },
        {
            path: '/teaching-plan',
            name: '教学计划',
            routes: [
                {
                    path: '/teaching-plan/builder',
                    name: '新增教学计划',
                    component: lazyload(import('./teaching-plan/Builder')),
                },
                {
                    path: '/teaching-plan/list',
                    name: '教学计划列表',
                },
                {
                    path: '/teaching-plan/other-faculty',
                    name: '外院教学资源',
                },
            ],
        },
    ],
    default: '/teaching-plan',
};
