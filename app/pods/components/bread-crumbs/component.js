// C bread-crumbs
import Ember from 'ember';
import layout from '../bread-crumbs/template';
import getOwner from 'ember-getowner-polyfill';

const {
  get,
  Component,
  computed,
  getWithDefault,
  assert,
  typeOf,
  setProperties,
  A: emberArray,
  String: { classify }
} = Ember;


export default Component.extend({
  layout,
  tagName: 'ul',
  linkable: true,
  reverse: false,
  classNameBindings: ['breadCrumbClass'],
  hasBlock: computed.bool('template').readOnly(),
  currentUrl: computed.readOnly('applicationRoute.router.url'),
  currentRouteName: computed.readOnly('applicationRoute.controller.currentRouteName'),

  routeHierarchy: computed('currentUrl', 'currentRouteName', 'reverse', {
    get() {
      const currentRouteName = getWithDefault(this, 'currentRouteName', false);

      assert('[ember-crumbly] Could not find a curent route', currentRouteName);

      const routeNames = currentRouteName.split('.');
      const filteredRouteNames = this._filterIndexRoutes(routeNames);
      const crumbs = this._lookupBreadCrumb(routeNames, filteredRouteNames);

      return get(this, 'reverse') ? crumbs.reverse() : crumbs;
    }
  }).readOnly(),

  breadCrumbClass: computed('outputStyle', {
    get() {
      let className = 'nav navbar-nav';
      return className;
    }
  }).readOnly(),

  _guessRoutePath(routeNames, name, index) {
    const routes = routeNames.slice(0, index + 1);

    if (routes.length === 1) {
      let path = `${name}.index`;

      return (this._lookupRoute(path)) ? path : name;
    }

    return routes.join('.');
  },

  _filterIndexRoutes(routeNames) {
    return routeNames.filter((name) => name !== 'index');
  },

  _lookupRoute(routeName) {
    return getOwner(this).lookup(`route:${routeName}`);
  },

  _lookupBreadCrumb(routeNames, filteredRouteNames) {
    let defaultLinkable = get(this, 'linkable');
    const pathLength = routeNames.length;
    const breadCrumbs = filteredRouteNames.map((name, index) => {
      const path = this._guessRoutePath(routeNames, name, index);
      const route = this._lookupRoute(path);

      assert(`[ember-crumbly] \`route:${path}\` was not found`, route);

      let breadCrumb = getWithDefault(route, 'breadCrumb', undefined);
      const breadCrumbType = typeOf(breadCrumb);

      if (index === pathLength - 1) {
        defaultLinkable = false;
      }
      if (breadCrumbType === 'undefined') {
        breadCrumb = {
          path,
          linkable: defaultLinkable,
          title: classify(name)
        };
      } else if (breadCrumbType === 'null') {
        return;
      } else {
        setProperties(breadCrumb, {
          path,
          linkable: breadCrumb.hasOwnProperty('linkable') ? breadCrumb.linkable : defaultLinkable
        });
      }

      return breadCrumb;
    });

    return emberArray(breadCrumbs.filter((breadCrumb) => typeOf(breadCrumb) !== 'undefined'));
  }
});