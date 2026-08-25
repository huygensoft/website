import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import SystemsCanvas from './components/SystemsCanvas';
import { detectBrowserLocale, getLocaleOption, isLocale, localeOptions, translations, type Locale, type Page, type Translation } from './content';
import { getCategory, getService, getServicesForCategory, serviceCategories, servicePath, testimonials, type ServiceDetail } from './data/legacySite';
import { ContactApiError, submitContact, validateContact, type ContactErrorCode, type ContactField, type ContactPayload } from './lib/contact';
import { getSiteUrl } from './lib/config';

const pages: Page[] = ['home', 'services', 'company', 'contact', 'privacy'];

function pathFor(locale: Locale, page: Page) {
  return page === 'home' ? `/${locale}` : `/${locale}/${page}`;
}

function routeFor(locale: Locale, page: Page, service?: ServiceDetail) {
  return service ? servicePath(locale, service) : pathFor(locale, page);
}

function preferredLocale(): Locale {
  const storedLocale = window.localStorage.getItem('huygensoft:locale');
  if (isLocale(storedLocale)) return storedLocale;
  return detectBrowserLocale();
}

type IconName = 'arrow' | 'sun' | 'moon' | 'menu' | 'close' | 'globe' | 'check' | 'external' | 'mail' | 'pin' | 'shield' | 'clock' | 'linkedin' | 'x';

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  const drawings: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M20.7 15.4A8.5 8.5 0 0 1 8.6 3.3 8.5 8.5 0 1 0 20.7 15.4Z" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    check: <path d="m5 12 4.2 4.2L19 6.7" />,
    external: <><path d="M14 4h6v6" /><path d="m20 4-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    shield: <path d="M12 3 4.5 6v5.5c0 4.4 3 7.8 7.5 9.5 4.5-1.7 7.5-5.1 7.5-9.5V6L12 3Z" />,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.3 2" /></>,
    linkedin: <path fill="currentColor" stroke="none" d="M5.2 3a2.2 2.2 0 1 0 0 4.4A2.2 2.2 0 0 0 5.2 3ZM3.3 8.8h3.8V21H3.3V8.8ZM9.4 8.8h3.6v1.7h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 2.6 4.7 6.1V21h-3.8v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.4V8.8Z" />,
    x: <path fill="currentColor" stroke="none" d="M18.9 2.8h3.7l-8.1 9.3L24 21.2h-7.4l-5.8-5.5-4.8 5.5H2.3l8.6-9.8-9.1-8.6h7.6l5.2 5 4.3-5ZM17.6 19l-9.8-14.1H6l9.9 14.1h1.7Z" />,
  };
  return <svg {...props}>{drawings[name]}</svg>;
}

function Brand() {
  return (
    <span className="brand">
      <img className="brand__logo" src="/brand/huygensoft-logo-light.svg" alt="Huygensoft" width="100" height="64" />
    </span>
  );
}

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = window.localStorage.getItem('huygensoft:theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0e1d' : '#f7f8fc');
    window.localStorage.setItem('huygensoft:theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

function useSeo(locale: Locale, page: Page, translation: Translation, service?: ServiceDetail) {
  useEffect(() => {
    const localeInfo = getLocaleOption(locale);
    const baseUrl = getSiteUrl();
    const canonical = `${baseUrl}${routeFor(service ? 'en' : locale, page, service)}`;
    const seo = service ? { title: `${service.title} | Huygensoft`, description: service.description } : translation.seo[page];

    document.title = seo.title;
    document.documentElement.lang = localeInfo.tag;
    document.documentElement.dir = localeInfo.direction;

    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = content;
    };

    setMeta('name', 'description', seo.description);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:locale', localeInfo.tag.replace('-', '_'));
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.append(canonicalLink);
    }
    canonicalLink.href = canonical;

    document.querySelectorAll('link[data-huygensoft-alternate="true"]').forEach((element) => element.remove());
    const alternateLocales = service ? localeOptions.filter((option) => option.code === 'en') : localeOptions;
    alternateLocales.forEach((option) => {
      const alternate = document.createElement('link');
      alternate.rel = 'alternate';
      alternate.hreflang = option.tag;
      alternate.href = `${baseUrl}${routeFor(option.code, page, service)}`;
      alternate.dataset.huygensoftAlternate = 'true';
      document.head.append(alternate);
    });
    const fallback = document.createElement('link');
    fallback.rel = 'alternate';
    fallback.hreflang = 'x-default';
    fallback.href = `${baseUrl}${routeFor('en', page, service)}`;
    fallback.dataset.huygensoftAlternate = 'true';
    document.head.append(fallback);
  }, [locale, page, translation, service]);
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    const anchor = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'auto' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.hash, location.pathname]);
  return null;
}

function Header({ locale, page, translation, theme, onThemeChange, onLocaleChange }: { locale: Locale; page: Page; translation: Translation; theme: 'light' | 'dark'; onThemeChange: () => void; onLocaleChange: (locale: Locale) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const links: Array<{ page: Page; label: 'home' | 'services' | 'company' }> = [
    { page: 'home', label: 'home' },
    { page: 'services', label: 'services' },
    { page: 'company', label: 'company' },
  ];

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand-link" to={pathFor(locale, 'home')}><Brand /></Link>
        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label={translation.nav.primaryNavigation}>
          <div className="site-nav__links">
            {links.map((link) => <Link key={link.page} className={page === link.page ? 'nav-link nav-link--active' : 'nav-link'} to={pathFor(locale, link.page)}>{translation.nav[link.label]}</Link>)}
          </div>
          <div className="site-nav__actions">
            <label className="language-select">
              <span className="sr-only">{translation.nav.language}</span>
              <Icon name="globe" size={16} />
              <select value={locale} onChange={(event) => onLocaleChange(event.target.value as Locale)} aria-label={translation.nav.language}>
                {localeOptions.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
              </select>
            </label>
            <button className="icon-button" type="button" onClick={onThemeChange} aria-label={theme === 'light' ? translation.nav.dark : translation.nav.light} title={translation.nav.theme}>
              <Icon name={theme === 'light' ? 'moon' : 'sun'} />
            </button>
            <Link className="button button--compact" to={pathFor(locale, 'contact')}>{translation.nav.contact}<Icon name="arrow" size={16} /></Link>
          </div>
        </nav>
        <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? translation.nav.closeMenu : translation.nav.openMenu}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
}

function PageIntro({ eyebrow, title, body, children }: { eyebrow: string; title: string; body: string; children?: React.ReactNode }) {
  return <section className="page-intro shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-intro__body">{body}</p>{children}</section>;
}

function Home({ locale, t }: { locale: Locale; t: Translation }) {
  return (
    <>
      <section className="hero shell">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--accent">{t.home.eyebrow}</p>
          <h1>{t.home.title}</h1>
          <p className="hero__body">{t.home.body}</p>
          <div className="hero__actions">
            <Link className="button" to={pathFor(locale, 'contact')}>{t.common.getInTouch}<Icon name="arrow" /></Link>
            <Link className="text-link" to={pathFor(locale, 'services')}>{t.common.exploreServices}<Icon name="arrow" size={16} /></Link>
          </div>
          <div className="hero-signal glass-card"><span className="hero-signal__dot" aria-hidden="true" /><div><span>{t.home.signal}</span><strong>{t.home.signalValue}</strong></div></div>
        </div>
        <div className="hero__visual" aria-label={t.home.visualLabel}>
          <SystemsCanvas label={t.home.visualLabel} caption={t.home.signalValue} />
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading section-heading--split"><div><p className="eyebrow">{t.home.servicesEyebrow}</p><h2>{t.home.servicesTitle}</h2></div><p>{t.home.servicesBody}</p></div>
        <div className="service-grid" lang="en">
          {serviceCategories.map((category, index) => <article className="service-card glass-card" key={category.id}><span className="card-index">{String(index + 1).padStart(2, '0')}</span><h3>{category.title}</h3><p>{category.summary}</p><Link className="card-link" to={`${pathFor(locale, 'services')}#${category.id}`} aria-label={`${t.common.learnMore}: ${category.title}`}>{t.common.learnMore}<Icon name="arrow" size={16} /></Link></article>)}
        </div>
      </section>
      <section className="process-section"><div className="shell"><div className="section-heading"><p className="eyebrow">{t.home.stepsEyebrow}</p><h2>{t.home.stepsTitle}</h2></div><div className="process-grid">{t.home.steps.map((step) => <article className="process-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></div></section>
      <Testimonials />
      <section className="shell section section--last"><div className="cta-panel glass-card"><div><p className="eyebrow eyebrow--accent">Huygensoft</p><h2>{t.services.closingTitle}</h2><p>{t.services.closingBody}</p></div><Link className="button" to={pathFor(locale, 'contact')}>{t.common.getInTouch}<Icon name="arrow" /></Link></div></section>
    </>
  );
}

function ServicesPage({ locale, t }: { locale: Locale; t: Translation }) {
  return <>
    <PageIntro eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.body} />
    <section className="shell section section--tight service-catalog" lang="en">
      {serviceCategories.map((category) => {
        const services = getServicesForCategory(category.id);
        return <section id={category.id} className="service-category" key={category.id}>
          <div className="service-category__heading"><p className="eyebrow">{category.title}</p><h2>{category.title}</h2><p>{category.summary}</p></div>
          <div className="service-grid service-grid--catalog">
            {services.map((service, index) => <article className="service-card glass-card" key={service.slug}><span className="card-index">{String(index + 1).padStart(2, '0')}</span><h3>{service.title}</h3><p>{service.description}</p><Link className="card-link" to={servicePath(locale, service)} aria-label={`${t.common.learnMore}: ${service.title}`}>{t.common.learnMore}<Icon name="arrow" size={16} /></Link></article>)}
          </div>
        </section>;
      })}
    </section>
    <section className="shell section section--last"><div className="cta-panel glass-card"><div><p className="eyebrow eyebrow--accent">Huygensoft</p><h2>{t.services.closingTitle}</h2><p>{t.services.closingBody}</p></div><Link className="button" to={pathFor(locale, 'contact')}>{t.common.getInTouch}<Icon name="arrow" /></Link></div></section>
  </>;
}

function ServiceDetailPage({ locale, t, service }: { locale: Locale; t: Translation; service: ServiceDetail }) {
  const category = getCategory(service.category);
  const relatedServices = getServicesForCategory(service.category).filter((item) => item.slug !== service.slug).slice(0, 3);

  return <div lang="en">
    <section className="service-detail-hero shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to={pathFor(locale, 'services')}>{t.nav.services}</Link><span aria-hidden="true">/</span><Link to={`${pathFor(locale, 'services')}#${service.category}`}>{category?.title}</Link></nav>
      <p className="eyebrow eyebrow--accent">{category?.title}</p>
      <h1>{service.title}</h1>
      <p className="service-detail-hero__body">{service.intro}</p>
      <div className="hero__actions"><Link className="button" to={pathFor(locale, 'contact')}>{t.common.getInTouch}<Icon name="arrow" /></Link><Link className="text-link" to={`${pathFor(locale, 'services')}#${service.category}`}>All {category?.title}<Icon name="arrow" size={16} /></Link></div>
    </section>
    <section className="shell section section--tight service-detail-layout">
      <aside className="service-detail-aside glass-card"><p className="eyebrow">Service overview</p><h2>{service.title}</h2><p>{service.description}</p><Link className="text-link" to={pathFor(locale, 'contact')}>Discuss this service<Icon name="arrow" size={16} /></Link></aside>
      <div className="service-detail-content">
        {service.sections.map((section, sectionIndex) => <section className="service-detail-section" key={`${section.heading}-${sectionIndex}`}>
          <h2>{section.heading}</h2>
          {section.blocks.map((block, blockIndex) => block.type === 'paragraph'
            ? <p key={`${block.content}-${blockIndex}`}>{block.content}</p>
            : block.ordered
              ? <ol key={`ordered-${blockIndex}`}>{block.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}</ol>
              : <ul key={`unordered-${blockIndex}`}>{block.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}</ul>)}
        </section>)}
      </div>
    </section>
    {relatedServices.length > 0 && <section className="shell section service-detail-related"><div className="section-heading"><p className="eyebrow">Related expertise</p><h2>More in {category?.title}</h2></div><div className="service-grid service-grid--related">{relatedServices.map((related) => <article className="service-card glass-card" key={related.slug}><h3>{related.title}</h3><p>{related.description}</p><Link className="card-link" to={servicePath(locale, related)}>Explore service<Icon name="arrow" size={16} /></Link></article>)}</div></section>}
    <section className="shell section section--last"><div className="cta-panel glass-card"><div><p className="eyebrow eyebrow--accent">Huygensoft</p><h2>Ready to discuss the work?</h2><p>Tell us about the system, constraint or outcome you are working toward.</p></div><Link className="button" to={pathFor(locale, 'contact')}>{t.common.getInTouch}<Icon name="arrow" /></Link></div></section>
  </div>;
}

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const testimonial = testimonials[current];
  const previous = () => setCurrent((index) => (index - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((index) => (index + 1) % testimonials.length);

  return <section className="testimonials-section" lang="en"><div className="shell"><div className="testimonials-heading"><div><p className="eyebrow">Testimonials</p><h2>What clients say</h2></div><div className="testimonial-controls"><button className="testimonial-control testimonial-control--previous" type="button" onClick={previous} aria-label="Previous testimonial"><Icon name="arrow" /></button><button className="testimonial-control" type="button" onClick={next} aria-label="Next testimonial"><Icon name="arrow" /></button></div></div><article className="testimonial-card glass-card" aria-live="polite"><span className="testimonial-quote" aria-hidden="true">“</span><blockquote><p>{testimonial.feedback}</p></blockquote><footer><div><strong>{testimonial.client}</strong><span>{testimonial.project}</span></div><div className="testimonial-meta"><span>{testimonial.location}</span><span>{testimonial.date}</span><span aria-label={`${testimonial.rating} out of 5 stars`}>{'★'.repeat(testimonial.rating)}</span></div></footer></article><p className="testimonial-position">{current + 1} of {testimonials.length}</p></div></section>;
}

function CompanyPage({ t }: { t: Translation }) {
  const facts = [
    [t.common.status, t.common.active],
    [t.common.companyNumber, '17250183'],
    [t.common.incorporated, '29 May 2026'],
    [t.common.registeredOffice, '182–184 High Street North, East Ham, London, E6 2JA'],
  ];
  const activities = ['58290 — Other software publishing', '62012 — Business and domestic software development', '62020 — Information technology consultancy activities'];
  const capabilities = [
    ['3CX & Communication Solutions', 'Tailored API middleware that connects 3CX PBX systems with enterprise CRMs, automated call flows, predictive dialers and AI-powered agents.'],
    ['Enterprise Software & Cloud Backend', 'Scalable C# and .NET solutions across web and desktop platforms, from high-performance applications to Azure DevOps pipelines and secure APIs.'],
    ['Legacy Software Modernization', 'A practical route from deprecated .NET Framework applications and older WinForms interfaces to supported, maintainable architectures.'],
    ['Hardware & Specialized Engineering', 'Complex hardware integrations, smart locker APIs, C++ to C# porting, deployment packaging and dependable background synchronisation utilities.'],
  ];
  const principles = [
    ['Our mission', 'To eliminate operational bottlenecks by developing bespoke, secure and highly reliable software integrations that bridge the gap between complex hardware systems and business logic.'],
    ['Our vision', 'To be the technical engineering partner for global enterprises seeking deep expertise in smart locker deployments, API creation and specialised VoIP telephony solutions.'],
    ['Our philosophy', 'Pragmatic problem solving, robust architecture and functional excellence. We believe in clean, reliable code that stands up to intensive, around-the-clock operational demands.'],
  ];

  return <>
    <PageIntro eyebrow={t.company.eyebrow} title={t.company.title} body={t.company.body} />
    <section className="shell section section--tight company-layout company-layout--overview">
      <article className="company-story glass-card"><p className="eyebrow">Who we are</p><h2>Engineering custom software for complex systems.</h2><p>Huygensoft is a specialised software engineering firm dedicated to solving complex integration challenges. We build robust middleware, APIs and desktop applications that connect advanced hardware with scalable cloud architectures.</p><p>From reverse-engineering legacy systems to building real-time 3CX call-flow solutions, we focus on reliable, performant software for clients globally.</p></article>
      <article className="legal-card glass-card"><div className="legal-card__heading"><span className="legal-badge"><Icon name="shield" size={17} /></span><div><p className="eyebrow">{t.company.legalTitle}</p><h2>Huygensoft Limited</h2></div></div><p>{t.company.legalBody}</p><dl className="fact-list">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="legal-card__status"><span className="status-dot" />{t.common.active} · {t.common.privateLimited}</p></article>
    </section>
    <section className="shell section company-capabilities"><div className="section-heading"><p className="eyebrow">How we help</p><h2>Deep engineering across the systems that have to work together.</h2></div><div className="capability-grid">{capabilities.map(([title, copy], index) => <article className="capability-card glass-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="shell section company-layout"><article className="activities-card"><p className="eyebrow">{t.common.activities}</p><h2>{t.company.activitiesIntro}</h2><ul>{activities.map((activity) => <li key={activity}><Icon name="check" size={17} />{activity}</li>)}</ul><a className="source-link" href="https://find-and-update.company-information.service.gov.uk/company/17250183" target="_blank" rel="noreferrer">{t.common.source}: Companies House<Icon name="external" size={15} /></a><p className="source-note">{t.company.sourceNote}</p></article><article className="company-presence glass-card"><p className="eyebrow">Our locations</p><h2>United Kingdom and Nigeria</h2><div className="location-list"><div><span><Icon name="pin" size={17} /></span><p><strong>United Kingdom · Registered office</strong>182–184 High Street North<br />East Ham, London E6 2JA</p></div><div><span><Icon name="pin" size={17} /></span><p><strong>Nigeria · Office and registered presence</strong>8, Providence Street<br />Lekki Phase I, Lagos 105102</p></div></div></article></section>
    <section className="company-principles"><div className="shell"><div className="section-heading"><p className="eyebrow">What guides the work</p><h2>Clarity, resilience and useful outcomes.</h2></div><div className="principle-grid">{principles.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
  </>;
}

const initialForm: Omit<ContactPayload, 'locale'> = { name: '', email: '', organisation: '', phone: '', topic: '', message: '', privacyAccepted: false, website: '' };

function ContactDetails({ t }: { t: Translation }) {
  return <aside className="contact-aside">
    <p className="eyebrow">{t.contact.contactDetails}</p>
    <a className="contact-detail" href="mailto:reach@huygensoft.com"><span><Icon name="mail" /></span><div><small>EMAIL</small><strong>reach@huygensoft.com</strong></div></a>
    <div className="contact-detail"><span><Icon name="pin" /></span><div><small>UNITED KINGDOM · REGISTERED OFFICE</small><address>182–184 High Street North<br />East Ham, London E6 2JA</address></div></div>
    <div className="contact-detail"><span><Icon name="pin" /></span><div><small>NIGERIA · OFFICE AND REGISTERED PRESENCE</small><address>8, Providence Street<br />Lekki Phase I, Lagos 105102</address></div></div>
    <div className="contact-detail"><span><Icon name="clock" /></span><div><small>OFFICE HOURS</small><strong>Monday – Friday, 9:00 am – 5:00 pm</strong></div></div>
    <p className="contact-aside__legal">{t.footer.legal}</p>
  </aside>;
}

function ContactPage({ locale, t }: { locale: Locale; t: Translation }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<ContactField, ContactErrorCode>>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [requestError, setRequestError] = useState<ContactErrorCode | null>(null);

  const update = <K extends keyof typeof initialForm>(key: K, value: (typeof initialForm)[K]) => setForm((current) => ({ ...current, [key]: value }));
  const fieldError = (field: ContactField) => errors[field] ? t.contact.errors[errors[field]] : undefined;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: ContactPayload = { ...form, locale: getLocaleOption(locale).tag };
    const validation = validateContact(payload);
    setErrors(validation);
    setRequestError(null);
    if (Object.keys(validation).length) return;

    setState('sending');
    try {
      await submitContact(payload);
      setState('success');
    } catch (error) {
      setState('error');
      setRequestError(error instanceof ContactApiError ? error.code : 'generic');
    }
  }

  if (state === 'success') {
    return <><PageIntro eyebrow={t.contact.eyebrow} title={t.contact.title} body={t.contact.body} /><section className="shell section section--last"><div className="success-panel glass-card"><span className="success-panel__icon"><Icon name="check" size={30} /></span><h2>{t.contact.successTitle}</h2><p>{t.contact.successBody}</p><Link className="text-link" to={pathFor(locale, 'home')}>{t.common.backHome}<Icon name="arrow" size={16} /></Link></div></section></>;
  }

  return <>
    <PageIntro eyebrow={t.contact.eyebrow} title={t.contact.title} body={t.contact.body} />
    <section className="shell section section--tight contact-layout">
      <ContactDetails t={t} />
      <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__heading"><p className="eyebrow">{t.contact.formTitle}</p><span className="form-mark" aria-hidden="true">✦</span></div>
        {requestError && <p className="form-alert" role="alert">{t.contact.errors[requestError]}</p>}
        <div className="form-grid">
          <FormField label={t.contact.name} id="name" required error={fieldError('name')}><input id="name" autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(fieldError('name'))} /></FormField>
          <FormField label={t.contact.email} id="email" required error={fieldError('email')}><input id="email" type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(fieldError('email'))} /></FormField>
          <FormField label={t.contact.organisation} id="organisation"><input id="organisation" autoComplete="organization" value={form.organisation} onChange={(event) => update('organisation', event.target.value)} /></FormField>
          <FormField label={t.contact.phone} id="phone"><input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} /></FormField>
          <FormField label={t.contact.topic} id="topic"><select id="topic" value={form.topic} onChange={(event) => update('topic', event.target.value)}><option value="">{t.contact.selectTopic}</option>{t.contact.topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}</select></FormField>
          <FormField label={t.contact.message} id="message" required error={fieldError('message')} className="form-field--full"><textarea id="message" rows={6} value={form.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(fieldError('message'))} /></FormField>
        </div>
        <div className="hp-field" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update('website', event.target.value)} /></div>
        <label className="check-field"><input type="checkbox" checked={form.privacyAccepted} onChange={(event) => update('privacyAccepted', event.target.checked)} aria-invalid={Boolean(fieldError('privacy'))} /><span><span className="check-box"><Icon name="check" size={13} /></span>{t.contact.privacy}</span></label>
        {fieldError('privacy') && <p className="field-error" role="alert">{fieldError('privacy')}</p>}
        <button className="button form-submit" disabled={state === 'sending'}>{state === 'sending' ? t.contact.sending : t.contact.submit}<Icon name="arrow" /></button>
      </form>
    </section>
  </>;
}

function FormField({ label, id, error, required, className = '', children }: { label: string; id: string; error?: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return <label className={`form-field ${className}`} htmlFor={id}><span>{label}{required && <em aria-hidden="true">*</em>}</span>{children}{error && <small className="field-error" role="alert">{error}</small>}</label>;
}

function PrivacyPage({ t }: { t: Translation }) {
  const items = [[t.privacy.collectionTitle, t.privacy.collectionBody], [t.privacy.useTitle, t.privacy.useBody], [t.privacy.retentionTitle, t.privacy.retentionBody], [t.privacy.contactTitle, t.privacy.contactBody]];
  return <><PageIntro eyebrow={t.privacy.eyebrow} title={t.privacy.title} body={t.privacy.intro} /><section className="shell section section--last"><div className="privacy-grid">{items.map(([title, body], index) => <article className="privacy-card glass-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h2>{title}</h2><p>{body}</p></article>)}</div></section></>;
}

function Footer({ locale, t }: { locale: Locale; t: Translation }) {
  return <footer className="site-footer"><div className="shell footer-inner"><div><Brand /><p>{t.footer.line}</p></div><div><div className="footer-links"><Link to={pathFor(locale, 'home')}>{t.nav.home}</Link><Link to={pathFor(locale, 'services')}>{t.nav.services}</Link><Link to={pathFor(locale, 'company')}>{t.footer.companyLink}</Link><Link to={pathFor(locale, 'contact')}>{t.nav.contact}</Link><Link to={pathFor(locale, 'privacy')}>{t.footer.privacy}</Link><a href="https://huygensoft.uk">huygensoft.uk</a></div><div className="footer-socials" aria-label="Follow Huygensoft"><a href="https://www.linkedin.com/company/83504608" target="_blank" rel="noreferrer" aria-label="Follow Huygensoft on LinkedIn"><Icon name="linkedin" size={19} /></a><a href="https://x.com/huygensoft" target="_blank" rel="noreferrer" aria-label="Follow Huygensoft on X"><Icon name="x" size={18} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {t.footer.legal}</span><span>{t.common.registeredIn}</span></div></div></footer>;
}

function LocaleRedirect() {
  return <Navigate to={pathFor(preferredLocale(), 'home')} replace />;
}

function Site() {
  const { locale: maybeLocale, '*': remainder } = useParams();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const pathSegments = remainder?.split('/').filter(Boolean) ?? [];
  const candidatePage = pathSegments[0] ?? 'home';
  const page = pages.includes(candidatePage as Page) ? candidatePage as Page : 'home';
  const selectedService = candidatePage === 'services' ? getService(pathSegments[1], pathSegments[2]) : undefined;
  const isTopLevelRoute = pathSegments.length <= 1 && pages.includes(candidatePage as Page);
  const isServiceDetailRoute = candidatePage === 'services' && pathSegments.length === 3 && Boolean(selectedService);
  const locale = isLocale(maybeLocale) ? maybeLocale : preferredLocale();
  const t = translations[locale];

  useSeo(locale, page, t, selectedService);

  if (!isLocale(maybeLocale)) return <Navigate to={pathFor(locale, 'home')} replace />;
  if (!isTopLevelRoute && !isServiceDetailRoute) return <Navigate to={candidatePage === 'services' ? pathFor(locale, 'services') : pathFor(locale, 'home')} replace />;
  if (isServiceDetailRoute && locale !== 'en' && selectedService) return <Navigate to={servicePath('en', selectedService)} replace />;
  const switchLocale = (nextLocale: Locale) => {
    window.localStorage.setItem('huygensoft:locale', nextLocale);
    navigate(routeFor(nextLocale, page, selectedService));
  };

  return <div className="app"><ScrollToTop /><a className="skip-link" href="#main">{t.nav.skipToContent}</a><div className="ambient ambient--one" /><div className="ambient ambient--two" /><Header locale={locale} page={page} translation={t} theme={theme} onThemeChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} onLocaleChange={switchLocale} /><main id="main">{page === 'home' && <Home locale={locale} t={t} />}{page === 'services' && (selectedService ? <ServiceDetailPage locale={locale} t={t} service={selectedService} /> : <ServicesPage locale={locale} t={t} />)}{page === 'company' && <CompanyPage t={t} />}{page === 'contact' && <ContactPage locale={locale} t={t} />}{page === 'privacy' && <PrivacyPage t={t} />}</main><Footer locale={locale} t={t} /></div>;
}

export default function App() {
  return <Routes><Route path="/" element={<LocaleRedirect />} /><Route path="/:locale/*" element={<Site />} /><Route path="*" element={<LocaleRedirect />} /></Routes>;
}
