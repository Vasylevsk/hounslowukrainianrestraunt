import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { Footer } from './container';
import { Navbar, ScrollToTop, SEO, CookieConsent } from './components';
import { SiteContentProvider } from './context/SiteContentContext';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import BookingStatusPage from './pages/BookingStatusPage';
import BanquetPage from './pages/BanquetPage';
import MenuPage from './pages/MenuPage';
import BreakfastPage from './pages/BreakfastPage';
import AdminPage from './pages/AdminPage';
import HumanitarianPage from './pages/HumanitarianPage';
import LegalPage from './pages/LegalPage';
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
        <Route path="/booking/status/:id" component={BookingStatusPage} />
        <Route path="/booking" component={BookingPage} />
        <Route path="/banquet" component={BanquetPage} />
        <Route path="/menu" component={MenuPage} />
        <Route path="/drinks">
          <Redirect to="/menu#menu-bar" />
        </Route>
        <Route path="/breakfast" component={BreakfastPage} />
        <Route path="/humanitarian-aid" component={HumanitarianPage} />
        <Route path="/privacy-policy" component={LegalPage} />
        <Route path="/cookie-policy" component={LegalPage} />
        <Route path="/terms-of-use" component={LegalPage} />
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
      <CookieConsent />
      <AppLayout />
    </Router>
  </SiteContentProvider>
);

export default App;
