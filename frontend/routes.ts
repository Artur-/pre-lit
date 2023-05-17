import type { Route } from '@vaadin/router';
import './views/helloworldlit/hello-world-lit-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // Place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'hello-world-lit-view',
    icon: '',
    title: '',
  },
  {
    path: 'hello-world-view',
    component: 'hello-world-lit-view',
    icon: 'globe-solid',
    title: 'Hello World (Lit)',
  },
  {
    path: 'master-detail-view',
    component: 'master-detail-lit-view',
    icon: 'columns-solid',
    title: 'Master-Detail (Lit)',
    action: async (_context, _command) => {
      await import('./views/masterdetaillit/master-detail-lit-view.js');
      return;
    },
  },
  {
    path: 'master-detail-view-sampleaddress',
    component: 'master-detail-sample-address-lit-view',
    icon: 'columns-solid',
    title: 'Master-Detail SampleAddress (Lit)',
    action: async (_context, _command) => {
      await import('./views/masterdetailsampleaddresslit/master-detail-sample-address-lit-view.js');
      return;
    },
  },
  {
    path: 'master-detail-view-samplebook',
    component: 'master-detail-sample-book-lit-view',
    icon: 'columns-solid',
    title: 'Master-Detail SampleBook (Lit)',
    action: async (_context, _command) => {
      await import('./views/masterdetailsamplebooklit/master-detail-sample-book-lit-view.js');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: views,
  },
];
