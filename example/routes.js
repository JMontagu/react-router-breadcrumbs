import React from 'react';
import { Router, Route, NoMatch, hashHistory, IndexRoute } from 'react-router';
import { App, Info, Users, User, UserDetails, UserImage, PublishersPage, PublisherPageContainer } from './app.js';
import { HelloComponent, GoodByeComponent } from './no-nesting-components.js';

const createRoute = (path, name) => ({path, name});
const helloOverrides = [
  createRoute('nonesting/:name/goodbye', 'Goodbye :name')
];
const goodbyeOverrides = [
  createRoute('nonesting/:name/hello', 'Hello :name')
];

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Examples" component={App} >
      <Route name="Users" path="users" component={Users}>
        <Route name="UserLocator" path=":userId" component={User} breadcrumbName=":userId">
          <Route name="UserImage" path="image" component={UserImage} />
          <Route name="UserDetails" path="details" component={UserDetails} breadcrumbName="Details" />
        </Route>
      </Route>
      <Route name="RouteName1" path="parent" component={Info}>
        <Route name="RouteName2" path="child1" component={Info}>
          <Route name="RouteName3" path=":item1" component={Info} breadcrumbName=":item1">
            <Route name="RouteName4" path="child2" component={Info}>
              <Route name="RouteName5" path=":item2" component={Info} breadcrumbName=":item2">
                <Route name="RouteName6" path="child3" component={Info} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route name="RouteName7" path="parent-2" component={Info}>
        <Route name="RouteName8" path="child1" component={Info}>
          <Route name="RouteName9" path=":item1" component={Info} breadcrumbName=":item1">
            <Route name="RouteName10" path="child2" component={Info}>
              <Route name="RouteName11" path=":item2" component={Info} breadcrumbName=":item2">
                <Route name="RouteName12" path="child3" component={Info} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path=":context" breadcrumbIgnore >
        <Route path="publishers" breadcrumbIgnore >
          <IndexRoute component={PublishersPage} breadcrumbIgnore />
          <Route path=":publisherId" component={PublisherPageContainer} />
        </Route>
      </Route>
      <Route name="nonesting">
        <Route path="nonesting/:name/hello" component={HelloComponent} breadcrumbsOverride={helloOverrides} />
        <Route path="nonesting/:name/goodbye" component={GoodByeComponent} breadcrumbsOverride={goodbyeOverrides} />
      </Route>
    </Route>
    <Route name="404: No Match for route" path="*" component={NoMatch} />
  </Router>
);
