import { lazyload } from '@/services/lazyload';

export default {
    title: '教务管理系统',
    routes: [
        {
            path: '/',
            redirect: '/welcome',
            exact: true,
        },
        {
            path: '/welcome',
            name: '欢迎',
            component: lazyload(import('./Welcome')),
        },
        {
            path: '/course',
            name: '课程',
            routes: [
                {
                    path: '/course/required',
                    name: '必修课',
                    component: lazyload(import('./course/Required')),
                },
                {
                    path: '/course/elective',
                    name: '选修课',
                    component: lazyload(import('./course/Elective')),
                },
            ],
        },
        {
            path: '/exam',
            name: '考试',
            routes: [
                {
                    path: '/exam/exam',
                    name: '考试',
                    component: lazyload(import('./exam/Exam')),
                },
            ],
        },
    ],
    default: '/welcome',
};
