import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

import { Footer } from './container';
import { Navbar, ScrollToTop, SEO } from './components';
import { SiteContentProvider } from './context/SiteContentContext';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import BanquetPage from './pages/BanquetPage';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminPage';
import HumanitarianPage from './pages/HumanitarianPage';
import './App.css';

const AppLayout = () => {
  const { pathname } = useLocation();
  const hideFooter = pathname === '/admin';

  return (
    <div>
      <SEO />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/booking" component={BookingPage} />
        <Route path="/banquet" component={BanquetPage} />
        <Route path="/menu" component={MenuPage} />
        <Route path="/humanitarian-aid" component={HumanitarianPage} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
      {!hideFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <SiteContentProvider>
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  </SiteContentProvider>
);

export default App;
