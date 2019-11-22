import { lazy } from 'react';
import App from './app';

export default [{
    component: App,
    routes: [{
        path: '/',
        component: lazy(() => import(/* webpackChunkName: "feature1" */'./feature1')),
    }, {
        path: '/feature4',
        component: lazy(() => import(/* webpackChunkName: "feature4" */'./feature4')),
    }, {
        path: '/feature3',
        component: lazy(() => import(/* webpackChunkName: "feature3" */'./feature3')),
    }],
}];
