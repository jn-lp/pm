import React from 'react';
import { Route } from 'react-router-dom';

import Side from '../../components/Side';

import Projects from './Projects';

const Dashboard = () => (
  <>
    <Side />
    <main>
      <Route path="/dashboard/" exact component={Projects} />
      <Route path="/dashboard/:project" exact component={({ match }) => match.params.project} />
      <Route path="/dashboard/:project/calendar" component={({ match }) => `${match.params.project} calendar`} />
      <Route path="/dashboard/:project/team" component={({ match }) => `${match.params.project} team`} />
      <Route path="/dashboard/:project/settings" component={() => 'settings'} />
    </main>
  </>
);

export default Dashboard;
