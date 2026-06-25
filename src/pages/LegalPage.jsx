import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { SubHeading } from '../components';
import { FOOTER_LEGAL_LINKS, getLegalPage, LEGAL_CONTACT } from '../constants/legalContent';
import './LegalPage.css';

const LegalPage = () => {
  const { pathname } = useLocation();
  const page = getLegalPage(pathname);

  if (!page) return <Redirect to="/" />;

  return (
    <div className="app__legal-page">
      <div className="app__legal-page_wrap app__bg section__padding">
        <header className="app__legal-hero">
          <SubHeading title={page.eyebrow} />
          <h1 className="headtext__cormorant">{page.title}</h1>
          <p className="p__opensans app__legal-hero_lead">{page.description}</p>
          <p className="app__legal-updated">Last updated: {LEGAL_CONTACT.lastUpdated}</p>
        </header>

        <div className="app__legal-body">
          {page.sections.map((section) => (
            <section key={section.heading} className="app__legal-section">
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((text, i) => (
                <p key={`${section.heading}-p-${i}`}>{text}</p>
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item, i) => (
                    <li key={`${section.heading}-li-${i}`}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.afterList?.map((text, i) => (
                <p key={`${section.heading}-after-${i}`}>{text}</p>
              ))}
              {section.subsections?.map((sub) => (
                <div key={sub.title} className="app__legal-subsection">
                  <h3>{sub.title}</h3>
                  <p>{sub.body}</p>
                </div>
              ))}
            </section>
          ))}
        </div>

        <nav className="app__legal-nav" aria-label="Related legal pages">
          {FOOTER_LEGAL_LINKS.filter((link) => link.to !== pathname).map((link) => (
            <Link key={link.to} to={link.to} className="app__legal-nav-link">
              {link.label}
            </Link>
          ))}
          <Link to="/" className="app__legal-nav-link app__legal-nav-link--muted">
            Back to home
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default LegalPage;
