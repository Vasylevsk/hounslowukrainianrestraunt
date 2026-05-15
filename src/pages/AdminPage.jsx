import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { defaultSiteContent, SITE_CONTENT_VERSION } from '../constants/siteDefaults';
import { useSiteContent } from '../context/SiteContentContext';
import AdminBookings from '../components/AdminBookings/AdminBookings';
import { adminPassword } from '../utils/adminAuth';
import { priceFromInput, priceInputValue } from '../utils/priceFormat';
import './AdminPage.css';

function AdminPriceInput({ value, onChange, ariaLabel }) {
  return (
    <div className="adm-price-field">
      <span className="adm-price-prefix" aria-hidden>
        £
      </span>
      <input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        className="adm-input adm-input--table adm-input--price"
        value={priceInputValue(value)}
        onChange={(e) => onChange(priceFromInput(e.target.value))}
        aria-label={ariaLabel}
      />
    </div>
  );
}

const SESSION_KEY = 'prosperity_admin_session';

function cloneJson(x) {
  return JSON.parse(JSON.stringify(x));
}

const TABS = [
  { id: 'bookings', label: 'Bookings' },
  { id: 'hours', label: 'Hours' },
  { id: 'featured', label: 'Home picks' },
  { id: 'menu', label: 'Menu' },
  { id: 'backup', label: 'Backup' },
];

function HoursEditor({ rows, onChange }) {
  return (
    <div className="adm-card">
      <p className="adm-lead">One row per weekday. Guests see this in the footer and on Find Us.</p>
      <div className="adm-table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: '32%' }}>Day</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.day}-${index}`}>
                <td>
                  <input
                    className="adm-input adm-input--table"
                    value={row.day}
                    onChange={(e) => {
                      const next = [...rows];
                      next[index] = { ...next[index], day: e.target.value };
                      onChange(next);
                    }}
                    aria-label={`Day row ${index + 1}`}
                  />
                </td>
                <td>
                  <input
                    className="adm-input adm-input--table"
                    value={row.hours}
                    onChange={(e) => {
                      const next = [...rows];
                      next[index] = { ...next[index], hours: e.target.value };
                      onChange(next);
                    }}
                    aria-label={`Hours row ${index + 1}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Table editor for featured columns (title, price, tags) */
function PicksTableEditor({ label, sectionTitle, onSectionTitle, items, onItems }) {
  const setRow = (i, field, v) => {
    const next = items.map((row, j) => (j === i ? { ...row, [field]: v } : row));
    onItems(next);
  };

  return (
    <div className="adm-card adm-card--tight">
      <h3 className="adm-card-title">{label}</h3>
      <div className="adm-field">
        <label className="adm-label">Section heading (on homepage)</label>
        <input className="adm-input" value={sectionTitle} onChange={(e) => onSectionTitle(e.target.value)} />
      </div>
      <div className="adm-table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Dish name</th>
              <th style={{ width: '124px' }}>Price</th>
              <th>Description</th>
              <th className="adm-th-actions" aria-label="actions" />
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <tr key={i}>
                <td>
                  <input className="adm-input adm-input--table" value={row.title} onChange={(e) => setRow(i, 'title', e.target.value)} />
                </td>
                <td>
                  <AdminPriceInput value={row.price} onChange={(v) => setRow(i, 'price', v)} ariaLabel={`Price row ${i + 1}`} />
                </td>
                <td>
                  <textarea
                    className="adm-input adm-textarea adm-input--table"
                    rows={2}
                    value={row.tags}
                    onChange={(e) => setRow(i, 'tags', e.target.value)}
                  />
                </td>
                <td className="adm-td-actions">
                  <button type="button" className="adm-icon-btn" onClick={() => onItems(items.filter((_, j) => j !== i))} title="Remove row">
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" className="adm-btn adm-btn--ghost" onClick={() => onItems([...items, { title: '', price: '', tags: '' }])}>
        + Add dish
      </button>
    </div>
  );
}

const AdminPage = () => {
  const history = useHistory();
  const { content, patchContent, resetContent, replaceContent } = useSiteContent();

  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState('menu');
  const [savedToast, setSavedToast] = useState(false);

  const [hoursDraft, setHoursDraft] = useState(content.workingHours);
  const [featuredDraft, setFeaturedDraft] = useState(content.featuredMenu);
  const [introDraft, setIntroDraft] = useState(content.menuIntro);
  const [fullDraft, setFullDraft] = useState(content.fullMenu);
  const [backupText, setBackupText] = useState('');
  const [catSearch, setCatSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(0);

  useEffect(() => {
    setHoursDraft(content.workingHours);
  }, [content.workingHours]);

  useEffect(() => {
    setFeaturedDraft(content.featuredMenu);
  }, [content.featuredMenu]);

  useEffect(() => {
    setIntroDraft(content.menuIntro);
  }, [content.menuIntro]);

  useEffect(() => {
    setFullDraft(content.fullMenu);
  }, [content.fullMenu]);

  const dirtyHours = useMemo(
    () => JSON.stringify(hoursDraft) !== JSON.stringify(content.workingHours),
    [hoursDraft, content.workingHours]
  );
  const dirtyFeatured = useMemo(
    () => JSON.stringify(featuredDraft) !== JSON.stringify(content.featuredMenu),
    [featuredDraft, content.featuredMenu]
  );
  const dirtyFull = useMemo(
    () =>
      JSON.stringify(fullDraft) !== JSON.stringify(content.fullMenu) || introDraft !== content.menuIntro,
    [fullDraft, content.fullMenu, introDraft, content.menuIntro]
  );
  const anyDirty = dirtyHours || dirtyFeatured || dirtyFull;

  const categoryIndicesVisible = useMemo(() => {
    const q = catSearch.trim().toLowerCase();
    if (!q) return fullDraft.map((_, i) => i);
    return fullDraft
      .map((cat, i) => {
        const t = (cat.title || '').toLowerCase().includes(q);
        const items = cat.items.some(
          (it) =>
            (it.name && it.name.toLowerCase().includes(q)) ||
            (it.price && String(it.price).toLowerCase().includes(q)) ||
            (it.description && String(it.description).toLowerCase().includes(q))
        );
        return t || items ? i : -1;
      })
      .filter((i) => i >= 0);
  }, [fullDraft, catSearch]);

  useEffect(() => {
    if (!categoryIndicesVisible.length) return;
    if (!categoryIndicesVisible.includes(selectedCat)) {
      setSelectedCat(categoryIndicesVisible[0]);
    }
  }, [categoryIndicesVisible, selectedCat]);

  useEffect(() => {
    if (selectedCat >= fullDraft.length) {
      setSelectedCat(Math.max(0, fullDraft.length - 1));
    }
  }, [fullDraft.length, selectedCat]);

  const flashSaved = useCallback(() => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2400);
  }, []);

  const saveAll = useCallback(() => {
    if (!anyDirty) return;
    patchContent({
      workingHours: hoursDraft,
      featuredMenu: featuredDraft,
      fullMenu: fullDraft,
      menuIntro: introDraft,
    });
    flashSaved();
  }, [anyDirty, hoursDraft, featuredDraft, fullDraft, introDraft, patchContent, flashSaved]);

  const discardAll = useCallback(() => {
    setHoursDraft(cloneJson(content.workingHours));
    setFeaturedDraft(cloneJson(content.featuredMenu));
    setFullDraft(cloneJson(content.fullMenu));
    setIntroDraft(content.menuIntro);
  }, [content]);

  useEffect(() => {
    const onBeforeUnload = (e) => {
      if (!anyDirty) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [anyDirty]);

  const tryLeave = (fn) => {
    if (anyDirty && !window.confirm('You have unsaved changes. Leave without saving?')) return;
    fn();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminPassword()) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('Wrong password.');
    }
  };

  const updateCategoryTitle = (ci, title) => {
    setFullDraft(fullDraft.map((c, i) => (i === ci ? { ...c, title } : c)));
  };

  const updateItemField = (ci, ii, field, value) => {
    setFullDraft(
      fullDraft.map((cat, i) => {
        if (i !== ci) return cat;
        return {
          ...cat,
          items: cat.items.map((it, j) => (j === ii ? { ...it, [field]: value } : it)),
        };
      })
    );
  };

  const addCategory = () => {
    const idx = fullDraft.length;
    setFullDraft([...fullDraft, { title: 'New category', items: [{ name: '', price: '', description: '', image: '' }] }]);
    setSelectedCat(idx);
    setTab('menu');
  };

  const removeCategory = (ci) => {
    if (!window.confirm('Delete this category and all dishes inside it?')) return;
    setFullDraft(fullDraft.filter((_, i) => i !== ci));
    setSelectedCat((prev) => {
      if (prev > ci) return prev - 1;
      if (prev === ci) return Math.max(0, ci - 1);
      return prev;
    });
  };

  const addMenuRow = (ci) => {
    setFullDraft(
      fullDraft.map((cat, i) =>
        i === ci ? { ...cat, items: [...cat.items, { name: '', price: '', description: '', image: '' }] } : cat
      )
    );
  };

  const removeMenuRow = (ci, ii) => {
    setFullDraft(
      fullDraft.map((cat, i) => (i === ci ? { ...cat, items: cat.items.filter((_, j) => j !== ii) } : cat))
    );
  };

  const exportJson = () => {
    const payload = {
      version: SITE_CONTENT_VERSION,
      workingHours: hoursDraft,
      featuredMenu: featuredDraft,
      fullMenu: fullDraft,
      menuIntro: introDraft,
    };
    const str = JSON.stringify(payload, null, 2);
    setBackupText(str);
    try {
      navigator.clipboard.writeText(str);
      flashSaved();
    } catch {
      /* ignore */
    }
  };

  const importJson = () => {
    try {
      const parsed = JSON.parse(backupText);
      if (parsed.version !== SITE_CONTENT_VERSION) {
        alert(`Backup version ${parsed.version} - expected ${SITE_CONTENT_VERSION}.`);
        return;
      }
      if (!Array.isArray(parsed.workingHours) || !parsed.featuredMenu || !Array.isArray(parsed.fullMenu)) {
        alert('Invalid backup file.');
        return;
      }
      replaceContent(parsed);
      setHoursDraft(parsed.workingHours);
      setFeaturedDraft(parsed.featuredMenu);
      setFullDraft(parsed.fullMenu);
      setIntroDraft(parsed.menuIntro || defaultSiteContent.menuIntro);
      setSelectedCat(0);
      flashSaved();
    } catch {
      alert('Could not parse JSON.');
    }
  };

  const currentCat = fullDraft[selectedCat];

  if (!authed) {
    return (
      <div className="adm-login">
        <div className="adm-login-card">
          <h1 className="adm-login-title">Content</h1>
          <p className="adm-login-text">Sign in to edit hours and menus. Data is stored in this browser.</p>
          <form onSubmit={handleLogin}>
            <label className="adm-label" htmlFor="adm-pw">
              Password
            </label>
            <input id="adm-pw" type="password" className="adm-input" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            {loginError ? <p className="adm-error">{loginError}</p> : null}
            <button type="submit" className="adm-btn adm-btn--gold">
              Sign in
            </button>
            <p className="adm-login-hint">
              Production: set <code>REACT_APP_ADMIN_PASSWORD</code>. Default local: <code>prosperity</code>
            </p>
          </form>
        </div>
        <Link to="/" className="adm-link-back">
          ← Back to site
        </Link>
      </div>
    );
  }

  return (
    <div className="adm">
      <header className="adm-header">
        <div className="adm-header-left">
          <span className="adm-logo">PROSPERITY</span>
          <span className="adm-header-sep" />
          <span className="adm-header-crumb">Content</span>
        </div>

        <nav className="adm-tabs" aria-label="Editor sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`adm-tab ${tab === t.id ? 'adm-tab--on' : ''}`}
              onClick={() => {
                setTab(t.id);
                setSavedToast(false);
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="adm-header-right">
          {anyDirty ? <span className="adm-badge">Unsaved</span> : <span className="adm-badge adm-badge--ok">Saved</span>}
          <button type="button" className="adm-btn adm-btn--gold adm-btn--sm" onClick={saveAll} disabled={!anyDirty}>
            Save all
          </button>
          <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={discardAll} disabled={!anyDirty}>
            Undo all
          </button>
          <span className="adm-header-sep" />
          <Link to="/" className="adm-header-link" onClick={(e) => anyDirty && (e.preventDefault(), tryLeave(() => history.push('/')))}>
            Site
          </Link>
          <button type="button" className="adm-header-link" onClick={() => tryLeave(() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); })}>
            Out
          </button>
        </div>
      </header>

      {savedToast ? (
        <div className="adm-toast" role="status">
          All changes saved.
        </div>
      ) : null}

      <div className="adm-body">
        {tab === 'bookings' && <AdminBookings />}

        {tab === 'hours' && <HoursEditor rows={hoursDraft} onChange={setHoursDraft} />}

        {tab === 'featured' && (
          <>
            <div className="adm-panel adm-panel--mb">
              <h2 className="adm-panel-title">Homepage menu section</h2>
              <div className="adm-grid-2 adm-grid-2--tight">
                <div className="adm-field">
                  <label className="adm-label">Small title (above spoon)</label>
                  <input
                    className="adm-input"
                    value={featuredDraft.sectionSubTitle || ''}
                    onChange={(e) => setFeaturedDraft({ ...featuredDraft, sectionSubTitle: e.target.value })}
                    placeholder="Menu Highlights"
                  />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Main heading</label>
                  <input
                    className="adm-input"
                    value={featuredDraft.sectionTitle || ''}
                    onChange={(e) => setFeaturedDraft({ ...featuredDraft, sectionTitle: e.target.value })}
                    placeholder="Prosperity Classics"
                  />
                </div>
              </div>
            </div>
            <div className="adm-grid-2">
            <PicksTableEditor
              label="Left column (homepage)"
              sectionTitle={featuredDraft.leftTitle}
              onSectionTitle={(v) => setFeaturedDraft({ ...featuredDraft, leftTitle: v })}
              items={featuredDraft.leftItems}
              onItems={(leftItems) => setFeaturedDraft({ ...featuredDraft, leftItems })}
            />
            <PicksTableEditor
              label="Right column (homepage)"
              sectionTitle={featuredDraft.rightTitle}
              onSectionTitle={(v) => setFeaturedDraft({ ...featuredDraft, rightTitle: v })}
              items={featuredDraft.rightItems}
              onItems={(rightItems) => setFeaturedDraft({ ...featuredDraft, rightItems })}
            />
          </div>
          </>
        )}

        {tab === 'menu' && (
          <div className="adm-split">
            <aside className="adm-split-nav">
              <div className="adm-field">
                <label className="adm-label">Find category</label>
                <input className="adm-input" type="search" value={catSearch} onChange={(e) => setCatSearch(e.target.value)} placeholder="Search…" />
              </div>
              <ul className="adm-cat-list">
                {categoryIndicesVisible.map((ci) => {
                  const cat = fullDraft[ci];
                  const on = ci === selectedCat;
                  return (
                    <li key={ci}>
                      <button type="button" className={`adm-cat-btn ${on ? 'adm-cat-btn--on' : ''}`} onClick={() => setSelectedCat(ci)}>
                        <span className="adm-cat-btn-title">{cat.title || 'Untitled'}</span>
                        <span className="adm-cat-btn-meta">{cat.items.length} dishes</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {categoryIndicesVisible.length === 0 ? <p className="adm-empty">No match.</p> : null}
              <button type="button" className="adm-btn adm-btn--ghost adm-btn--block" onClick={addCategory}>
                + New category
              </button>
            </aside>

            <div className="adm-split-main">
              {fullDraft.length === 0 ? (
                <div className="adm-card">
                  <p className="adm-lead">No categories yet. Click &quot;New category&quot; on the left.</p>
                </div>
              ) : categoryIndicesVisible.length === 0 ? (
                <div className="adm-card">
                  <p className="adm-lead">No categories match your search. Clear the search box or try other words.</p>
                </div>
              ) : currentCat ? (
                <div className="adm-card">
                  <div className="adm-toolbar">
                    <div className="adm-field adm-field--grow">
                      <label className="adm-label">Category name</label>
                      <input
                        className="adm-input adm-input--lg"
                        value={currentCat.title}
                        onChange={(e) => updateCategoryTitle(selectedCat, e.target.value)}
                      />
                    </div>
                    <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => removeCategory(selectedCat)}>
                      Delete category
                    </button>
                  </div>

                  <div className="adm-field" style={{ marginTop: '1.25rem' }}>
                    <label className="adm-label">Menu page intro (paragraph under title)</label>
                    <textarea className="adm-input adm-textarea" rows={3} value={introDraft} onChange={(e) => setIntroDraft(e.target.value)} />
                  </div>

                  <h3 className="adm-subheading">Dishes in this category</h3>
                  <p className="adm-lead adm-lead--tight">
                    Edit name, price, and description. Optional photo URL (e.g. <code>/menu/borsch.jpg</code> in <code>public</code>) for the oval on
                    the menu page.
                  </p>

                  <div className="adm-table-scroll">
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Dish name</th>
                          <th style={{ width: '120px' }}>Price</th>
                          <th>Description</th>
                          <th>Photo URL</th>
                          <th className="adm-th-actions" />
                        </tr>
                      </thead>
                      <tbody>
                        {currentCat.items.map((item, ii) => (
                          <tr key={ii}>
                            <td>
                              <input
                                className="adm-input adm-input--table"
                                value={item.name}
                                onChange={(e) => updateItemField(selectedCat, ii, 'name', e.target.value)}
                              />
                            </td>
                            <td>
                              <AdminPriceInput
                                value={item.price}
                                onChange={(v) => updateItemField(selectedCat, ii, 'price', v)}
                                ariaLabel={`Dish price ${ii + 1}`}
                              />
                            </td>
                            <td>
                              <textarea
                                className="adm-input adm-textarea adm-input--table"
                                rows={2}
                                value={item.description || ''}
                                onChange={(e) => updateItemField(selectedCat, ii, 'description', e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                className="adm-input adm-input--table adm-input--photo"
                                value={item.image || ''}
                                onChange={(e) => updateItemField(selectedCat, ii, 'image', e.target.value)}
                                placeholder="/menu/…"
                                title="Optional image path or full URL"
                              />
                            </td>
                            <td className="adm-td-actions">
                              <button type="button" className="adm-icon-btn" onClick={() => removeMenuRow(selectedCat, ii)} title="Remove">
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button type="button" className="adm-btn adm-btn--ghost" onClick={() => addMenuRow(selectedCat)}>
                    + Add dish
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {tab === 'backup' && (
          <div className="adm-card">
            <p className="adm-lead">Export a JSON backup or paste one to restore. Use &quot;Save all&quot; in the header after importing if you also changed other tabs.</p>
            <div className="adm-row">
              <button type="button" className="adm-btn adm-btn--gold" onClick={exportJson}>
                Copy backup to clipboard
              </button>
              <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setBackupText(JSON.stringify(content, null, 2))}>
                Show current JSON
              </button>
              <button
                type="button"
                className="adm-btn adm-btn--ghost"
                onClick={() => {
                  if (window.confirm('Reset site copy to factory defaults?')) {
                    resetContent();
                    setHoursDraft(defaultSiteContent.workingHours);
                    setFeaturedDraft(defaultSiteContent.featuredMenu);
                    setFullDraft(defaultSiteContent.fullMenu);
                    setIntroDraft(defaultSiteContent.menuIntro);
                    setSelectedCat(0);
                    flashSaved();
                  }
                }}
              >
                Factory reset
              </button>
            </div>
            <div className="adm-field" style={{ marginTop: '1rem' }}>
              <label className="adm-label">JSON</label>
              <textarea className="adm-input adm-json" spellCheck={false} value={backupText} onChange={(e) => setBackupText(e.target.value)} />
            </div>
            <button type="button" className="adm-btn adm-btn--gold" style={{ marginTop: '0.75rem' }} onClick={importJson}>
              Import from JSON above
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminPage;
