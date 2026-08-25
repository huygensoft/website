import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('public');
const siteUrl = (process.env.VITE_SITE_URL || 'https://huygensoft.com').replace(/\/+$/, '');
const locales = [
  { code: 'en', tag: 'en-GB', direction: 'ltr' },
  { code: 'it', tag: 'it-IT', direction: 'ltr' },
  { code: 'nl', tag: 'nl-NL', direction: 'ltr' },
  { code: 'fr', tag: 'fr-FR', direction: 'ltr' },
  { code: 'de', tag: 'de-DE', direction: 'ltr' },
  { code: 'es', tag: 'es-ES', direction: 'ltr' },
  { code: 'pt', tag: 'pt-PT', direction: 'ltr' },
  { code: 'yo', tag: 'yo', direction: 'ltr' },
  { code: 'ig', tag: 'ig', direction: 'ltr' },
  { code: 'ar', tag: 'ar', direction: 'rtl' },
  { code: 'zh', tag: 'zh-Hans', direction: 'ltr' },
];

const catalog = JSON.parse(await readFile(path.resolve('src/data/legacy-site.json'), 'utf8'));

const basePages = [
  { key: 'home', path: '', priority: '1.0', changefreq: 'monthly' },
  { key: 'services', path: '/services', priority: '0.8', changefreq: 'monthly' },
  { key: 'company', path: '/company', priority: '0.7', changefreq: 'monthly' },
  { key: 'contact', path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { key: 'privacy', path: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

const servicePages = catalog.services.map((service) => ({
  key: 'service',
  path: `/services/${service.category}/${service.slug}`,
  priority: '0.7',
  changefreq: 'monthly',
  service,
}));

const pages = [...basePages, ...servicePages];

const metadata = {
  en: {
    home: ['Huygensoft | Software Development & IT Consultancy', 'Huygensoft builds considered software and provides IT consultancy, with a focus on clear, useful digital products.'],
    services: ['Services | Huygensoft', 'Software development, integration, automation and technical consultancy from Huygensoft.'],
    company: ['Company | Huygensoft', 'Company information for Huygensoft Limited, a UK private limited company.'],
    contact: ['Contact | Huygensoft', 'Start a conversation with Huygensoft about software development, integration or IT consultancy.'],
    privacy: ['Privacy | Huygensoft', 'How Huygensoft handles information submitted through its contact form.'],
  },
  it: {
    home: ['Huygensoft | Sviluppo software e consulenza IT', 'Huygensoft realizza software progettato con cura e offre consulenza IT, con attenzione a prodotti digitali chiari e utili.'],
    services: ['Servizi | Huygensoft', 'Sviluppo software, integrazione, automazione e consulenza tecnica da Huygensoft.'],
    company: ['Azienda | Huygensoft', 'Informazioni societarie su Huygensoft Limited, società privata a responsabilità limitata del Regno Unito.'],
    contact: ['Contatti | Huygensoft', 'Avvia una conversazione con Huygensoft su sviluppo software, integrazione o consulenza IT.'],
    privacy: ['Privacy | Huygensoft', 'Come Huygensoft gestisce le informazioni inviate tramite il modulo di contatto.'],
  },
  nl: {
    home: ['Huygensoft | Softwareontwikkeling en IT-advies', 'Huygensoft bouwt doordachte software en biedt IT-advies, met aandacht voor duidelijke en bruikbare digitale producten.'],
    services: ['Diensten | Huygensoft', 'Softwareontwikkeling, integratie, automatisering en technisch advies van Huygensoft.'],
    company: ['Bedrijf | Huygensoft', 'Bedrijfsinformatie over Huygensoft Limited, een Britse besloten vennootschap.'],
    contact: ['Contact | Huygensoft', 'Start een gesprek met Huygensoft over softwareontwikkeling, integratie of IT-advies.'],
    privacy: ['Privacy | Huygensoft', 'Hoe Huygensoft informatie behandelt die via het contactformulier wordt verstuurd.'],
  },
  fr: {
    home: ['Huygensoft | Développement logiciel et conseil IT', 'Huygensoft crée des logiciels réfléchis et fournit du conseil IT pour des produits numériques utiles et clairs.'],
    services: ['Services | Huygensoft', 'Développement logiciel, intégration, automatisation et conseil technique par Huygensoft.'],
    company: ['Entreprise | Huygensoft', 'Informations sur Huygensoft Limited, société privée britannique.'],
    contact: ['Contact | Huygensoft', 'Contactez Huygensoft pour le développement logiciel, l’intégration ou le conseil IT.'],
    privacy: ['Confidentialité | Huygensoft', 'Comment Huygensoft traite les informations envoyées via son formulaire de contact.'],
  },
  de: {
    home: ['Huygensoft | Softwareentwicklung & IT-Beratung', 'Huygensoft entwickelt durchdachte Software und bietet IT-Beratung für klare, nützliche digitale Produkte.'],
    services: ['Leistungen | Huygensoft', 'Softwareentwicklung, Integration, Automatisierung und technische Beratung von Huygensoft.'],
    company: ['Unternehmen | Huygensoft', 'Informationen zu Huygensoft Limited, einem britischen Privatunternehmen.'],
    contact: ['Kontakt | Huygensoft', 'Kontaktieren Sie Huygensoft für Softwareentwicklung, Integration oder IT-Beratung.'],
    privacy: ['Datenschutz | Huygensoft', 'Wie Huygensoft Informationen aus dem Kontaktformular verarbeitet.'],
  },
  es: {
    home: ['Huygensoft | Desarrollo de software y consultoría TI', 'Huygensoft crea software considerado y ofrece consultoría TI para productos digitales claros y útiles.'],
    services: ['Servicios | Huygensoft', 'Desarrollo de software, integración, automatización y consultoría técnica de Huygensoft.'],
    company: ['Empresa | Huygensoft', 'Información de Huygensoft Limited, una sociedad privada británica.'],
    contact: ['Contacto | Huygensoft', 'Contacte con Huygensoft para desarrollo de software, integración o consultoría TI.'],
    privacy: ['Privacidad | Huygensoft', 'Cómo Huygensoft trata la información enviada por su formulario de contacto.'],
  },
  pt: {
    home: ['Huygensoft | Desenvolvimento de software e consultoria de TI', 'A Huygensoft cria software ponderado e presta consultoria de TI para produtos digitais claros e úteis.'],
    services: ['Serviços | Huygensoft', 'Desenvolvimento de software, integração, automação e consultoria técnica pela Huygensoft.'],
    company: ['Empresa | Huygensoft', 'Informação sobre a Huygensoft Limited, sociedade privada do Reino Unido.'],
    contact: ['Contacto | Huygensoft', 'Contacte a Huygensoft para desenvolvimento de software, integração ou consultoria de TI.'],
    privacy: ['Privacidade | Huygensoft', 'Como a Huygensoft trata informação enviada pelo formulário de contacto.'],
  },
  yo: {
    home: ['Huygensoft | Ìdàgbàsókè sọ́fitiwia àti ìmọ̀ràn IT', 'Huygensoft ń kọ sọ́fitiwia tí a gbèrò dáadáa, ó sì ń pèsè ìmọ̀ràn IT fún àwọn ọjà oní-nọ́mbà tó mọ́ tí ó sì wúlò.'],
    services: ['Àwọn iṣẹ́ | Huygensoft', 'Ìdàgbàsókè sọ́fitiwia, ìsopọ̀, ìmúṣiṣẹ́ aládàáṣe àti ìmọ̀ràn nípa ìmọ̀-ẹ̀rọ láti ọ̀dọ̀ Huygensoft.'],
    company: ['Ilé-iṣẹ́ | Huygensoft', 'Ìwífún nípa Huygensoft Limited, ilé-iṣẹ́ aládàáni tí ojúṣe rẹ̀ ní ààlà ní UK.'],
    contact: ['Kàn sí wa | Huygensoft', 'Bẹ̀rẹ̀ ìjíròrò pẹ̀lú Huygensoft nípa ìdàgbàsókè sọ́fitiwia, ìsopọ̀ tàbí ìmọ̀ràn IT.'],
    privacy: ['Ìpamọ́ | Huygensoft', 'Bí Huygensoft ṣe ń ṣàkóso ìwífún tí a fi ránṣẹ́ nípasẹ̀ fọ́ọ̀mù ìbánisọ̀rọ̀ rẹ̀.'],
  },
  ig: {
    home: ['Huygensoft | Mmepe ngwanrọ na ndụmọdụ IT', 'Huygensoft na-emepụta ngwanrọ e jiri nlezianya chepụta ma na-enye ndụmọdụ IT, na-elekwasị anya na ngwaahịa dijitalụ doro anya ma bara uru.'],
    services: ['Ọrụ | Huygensoft', 'Mmepe ngwanrọ, njikọta, akpaaka na ndụmọdụ teknụzụ sitere na Huygensoft.'],
    company: ['Ụlọọrụ | Huygensoft', 'Ozi gbasara Huygensoft Limited, ụlọọrụ nkeonwe nwere oke ibu na UK.'],
    contact: ['Kpọtụrụ anyị | Huygensoft', 'Malite mkparịta ụka na Huygensoft gbasara mmepe ngwanrọ, njikọta ma ọ bụ ndụmọdụ IT.'],
    privacy: ['Nzuzo | Huygensoft', 'Otu Huygensoft si ejikwa ozi e nyefere site na fọm kọntaktị ya.'],
  },
  ar: {
    home: ['Huygensoft | تطوير البرمجيات واستشارات تقنية المعلومات', 'تقدم Huygensoft برمجيات مدروسة واستشارات تقنية لمنتجات رقمية واضحة ومفيدة.'],
    services: ['الخدمات | Huygensoft', 'تطوير البرمجيات والتكامل والأتمتة والاستشارات التقنية من Huygensoft.'],
    company: ['الشركة | Huygensoft', 'معلومات عن Huygensoft Limited، شركة بريطانية خاصة.'],
    contact: ['تواصل | Huygensoft', 'تواصل مع Huygensoft لتطوير البرمجيات أو التكامل أو استشارات تقنية المعلومات.'],
    privacy: ['الخصوصية | Huygensoft', 'كيف تتعامل Huygensoft مع المعلومات المرسلة من نموذج التواصل.'],
  },
  zh: {
    home: ['Huygensoft | 软件开发与 IT 咨询', 'Huygensoft 提供经过深思熟虑的软件和 IT 咨询，专注于清晰实用的数字产品。'],
    services: ['服务 | Huygensoft', 'Huygensoft 提供软件开发、集成、自动化与技术咨询。'],
    company: ['公司 | Huygensoft', 'Huygensoft Limited 的公司信息，一家英国私人有限公司。'],
    contact: ['联系 | Huygensoft', '联系 Huygensoft 讨论软件开发、集成或 IT 咨询。'],
    privacy: ['隐私 | Huygensoft', 'Huygensoft 如何处理通过联系表单提交的信息。'],
  },
};

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function pageMetadata(locale, page) {
  if (page.service) return [`${page.service.title} | Huygensoft`, page.service.description];
  return metadata[locale.code][page.key];
}

function setMeta(document, attribute, key, value) {
  const expression = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*("\\s*/?>)`, 'i');
  return document.replace(expression, `$1${escapeHtml(value)}$2`);
}

const fallbackCopy = {
  en: {
    nav: { label: 'Primary navigation', home: 'Home', services: 'Services', company: 'Company', contact: 'Contact' },
    footer: 'Huygensoft Limited · Company No. 17250183',
    details: {
      home: '<section><h2>Software development, integration and IT consultancy</h2><p>Huygensoft helps organisations turn ideas, disconnected tools and difficult workflows into considered digital products.</p></section>',
      services: '<section><h2>Software development</h2><p>Web, desktop and product work shaped around the way a business operates.</p><h2>Integration and automation</h2><p>Connect important systems and remove repeat work.</p><h2>Technical consultancy</h2><p>Practical discovery, architecture and delivery support for complex software.</p></section>',
      company: '<section><h2>Huygensoft Limited</h2><p>UK private limited company registered for software publishing, software development and IT consultancy.</p><dl><div><dt>Company number</dt><dd>17250183</dd></div><div><dt>Status</dt><dd>Active private limited company</dd></div><div><dt>Incorporated</dt><dd>29 May 2026</dd></div><div><dt>Registered office</dt><dd>182–184 High Street North, London, England, E6 2JA</dd></div></dl><h2>Registered activities</h2><ul><li>58290 — Other software publishing</li><li>62012 — Business and domestic software development</li><li>62020 — Information technology consultancy activities</li></ul></section>',
      contact: '<section><h2>Contact details</h2><p><a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a></p><address>182–184 High Street North, London, England, E6 2JA</address><p>The full enquiry form is available when JavaScript is enabled.</p></section>',
      privacy: '<section><h2>Privacy for enquiries</h2><p>We use the information you provide to understand and respond to your enquiry and keep an appropriate record of that conversation.</p><p>For privacy questions, contact <a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a>.</p></section>',
    },
  },
  it: {
    nav: { label: 'Navigazione principale', home: 'Pagina iniziale', services: 'Servizi', company: 'Azienda', contact: 'Contatti' },
    footer: 'Huygensoft Limited · N. di iscrizione 17250183',
    details: {
      home: '<section><h2>Sviluppo software, integrazione e consulenza IT</h2><p>Huygensoft aiuta le organizzazioni a trasformare idee, strumenti scollegati e flussi di lavoro complessi in prodotti digitali progettati con cura.</p></section>',
      services: '<section><h2>Sviluppo software</h2><p>Soluzioni web, desktop e di prodotto modellate sul modo in cui la tua azienda opera davvero.</p><h2>Integrazione e automazione</h2><p>Colleghiamo i sistemi che contano, eliminiamo il lavoro ripetitivo e facciamo circolare le informazioni senza attriti.</p><h2>Consulenza tecnica</h2><p>Portiamo chiarezza alle decisioni complesse con analisi, architettura e supporto alla realizzazione concreti.</p></section>',
      company: '<section><h2>Huygensoft Limited</h2><p>Huygensoft Limited è una società privata a responsabilità limitata del Regno Unito, registrata per l’editoria di software, lo sviluppo software e la consulenza IT.</p><dl><div><dt>Numero di iscrizione</dt><dd>17250183</dd></div><div><dt>Stato</dt><dd>Società privata attiva a responsabilità limitata</dd></div><div><dt>Costituita</dt><dd>29 maggio 2026</dd></div><div><dt>Sede legale</dt><dd>182–184 High Street North, London, England, E6 2JA</dd></div></dl><h2>Attività registrate</h2><ul><li>58290 — Altra editoria di software</li><li>62012 — Sviluppo di software aziendale e domestico</li><li>62020 — Attività di consulenza informatica</li></ul></section>',
      contact: '<section><h2>Recapiti</h2><p><a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a></p><address>182–184 High Street North, London, England, E6 2JA</address><p>Il modulo di richiesta completo è disponibile quando JavaScript è attivato.</p></section>',
      privacy: '<section><h2>Privacy per le richieste</h2><p>Utilizziamo le informazioni che fornisci per comprendere e rispondere alla tua richiesta e per mantenere una registrazione appropriata della conversazione.</p><p>Per domande sulla privacy, contatta <a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a>.</p></section>',
    },
  },
  nl: {
    nav: { label: 'Hoofdnavigatie', home: 'Startpagina', services: 'Diensten', company: 'Bedrijf', contact: 'Contact' },
    footer: 'Huygensoft Limited · Bedrijfsnummer 17250183',
    details: {
      home: '<section><h2>Softwareontwikkeling, integratie en IT-advies</h2><p>Huygensoft helpt organisaties om ideeën, losstaande tools en lastige werkprocessen om te zetten in doordachte digitale producten.</p></section>',
      services: '<section><h2>Softwareontwikkeling</h2><p>Web-, desktop- en productontwikkeling, afgestemd op de manier waarop uw organisatie daadwerkelijk werkt.</p><h2>Integratie en automatisering</h2><p>Koppel de systemen die ertoe doen, verminder herhaalwerk en laat informatie soepel stromen.</p><h2>Technisch advies</h2><p>Breng rust in complexe beslissingen met praktische verkenning, architectuur en ondersteuning bij de oplevering.</p></section>',
      company: '<section><h2>Huygensoft Limited</h2><p>Huygensoft Limited is een Britse besloten vennootschap, geregistreerd voor het uitgeven en ontwikkelen van software en voor IT-advies.</p><dl><div><dt>Bedrijfsnummer</dt><dd>17250183</dd></div><div><dt>Status</dt><dd>Actieve besloten vennootschap</dd></div><div><dt>Opgericht</dt><dd>29 mei 2026</dd></div><div><dt>Statutaire zetel</dt><dd>182–184 High Street North, London, England, E6 2JA</dd></div></dl><h2>Geregistreerde activiteiten</h2><ul><li>58290 — Overige software-uitgeverij</li><li>62012 — Ontwikkeling van bedrijfs- en huishoudsoftware</li><li>62020 — Activiteiten op het gebied van IT-advies</li></ul></section>',
      contact: '<section><h2>Contactgegevens</h2><p><a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a></p><address>182–184 High Street North, London, England, E6 2JA</address><p>Het volledige aanvraagformulier is beschikbaar wanneer JavaScript is ingeschakeld.</p></section>',
      privacy: '<section><h2>Privacy voor aanvragen</h2><p>We gebruiken de gegevens die u verstrekt om uw aanvraag te begrijpen en te beantwoorden, en om een passend dossier van dat gesprek bij te houden.</p><p>Voor privacyvragen kunt u contact opnemen via <a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a>.</p></section>',
    },
  },
  yo: {
    nav: { label: 'Ìdarí ojú-ìwé àkọ́kọ́', home: 'Ilé', services: 'Àwọn iṣẹ́', company: 'Ilé-iṣẹ́', contact: 'Kàn sí wa' },
    footer: 'Huygensoft Limited · Nọ́mbà Ilé-iṣẹ́ 17250183',
    details: {
      home: '<section><h2>Ìdàgbàsókè sọ́fitiwia, ìsopọ̀ àti ìmọ̀ràn IT</h2><p>Huygensoft ń ràn àwọn àjọ lọ́wọ́ láti yí àwọn èrò, àwọn irinṣẹ́ tí kò so pọ̀ àti àwọn ìlànà iṣẹ́ tó nira padà sí àwọn ọjà oní-nọ́mbà tí a gbèrò dáadáa.</p></section>',
      services: '<section><h2>Ìdàgbàsókè sọ́fitiwia</h2><p>Iṣẹ́ wẹ́ẹ̀bù, ẹ̀rọ orí kọ̀ǹpútà àti ọjà tí a ṣe ní ìbámu pẹ̀lú bí ilé-iṣẹ́ yín ṣe ń ṣiṣẹ́ lóòótọ́.</p><h2>Ìsopọ̀ àti ìmúṣiṣẹ́ aládàáṣe</h2><p>So àwọn ètò tó ṣe pàtàkì pọ̀, yọ iṣẹ́ àtúnṣe kúrò, kí ìwífún sì máa lọ láìsí ìdènà.</p><h2>Ìmọ̀ràn nípa ìmọ̀-ẹ̀rọ</h2><p>Mú ìbàlẹ̀ wá sí àwọn ìpinnu tó díjú pẹ̀lú ìwádìí ìbẹ̀rẹ̀, àpẹẹrẹ ètò àti ìtìlẹ́yìn ìmúṣẹ́ tó wúlò.</p></section>',
      company: '<section><h2>Huygensoft Limited</h2><p>Huygensoft Limited jẹ́ ilé-iṣẹ́ aládàáni tí ojúṣe rẹ̀ ní ààlà ní UK, tí a forúkọ sílẹ̀ fún títẹ̀jade sọ́fitiwia, ìdàgbàsókè sọ́fitiwia àti ìmọ̀ràn IT.</p><dl><div><dt>Nọ́mbà ilé-iṣẹ́</dt><dd>17250183</dd></div><div><dt>Ìpo</dt><dd>Ń ṣiṣẹ́ · Ilé-iṣẹ́ aládàáni tí ojúṣe rẹ̀ ní ààlà</dd></div><div><dt>Ọjọ́ ìdásílẹ̀</dt><dd>29 May 2026</dd></div><div><dt>Ọ́fíìsì ìfọ̀rúkọsílẹ̀</dt><dd>182–184 High Street North, London, England, E6 2JA</dd></div></dl><h2>Àwọn iṣẹ́ tí a forúkọ sílẹ̀</h2><ul><li>58290 — Other software publishing</li><li>62012 — Business and domestic software development</li><li>62020 — Information technology consultancy activities</li></ul></section>',
      contact: '<section><h2>Àlàyé ìbánisọ̀rọ̀</h2><p><a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a></p><address>182–184 High Street North, London, England, E6 2JA</address><p>Fọ́ọ̀mù ìbéèrè kíkún wà nígbà tí JavaScript bá ń ṣiṣẹ́.</p></section>',
      privacy: '<section><h2>Ìpamọ́ fún àwọn ìbéèrè</h2><p>A ń lo ìwífún tí ẹ pèsè láti lóye àti láti dáhùn ìbéèrè yín, àti láti pa àkọsílẹ̀ tó yẹ ti ìjíròrò náà mọ́.</p><p>Fún ìbéèrè nípa ìpamọ́, kàn sí <a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a>.</p></section>',
    },
  },
  ig: {
    nav: { label: 'Nduzi bụ isi', home: 'Peeji mbụ', services: 'Ọrụ', company: 'Ụlọọrụ', contact: 'Kpọtụrụ anyị' },
    footer: 'Huygensoft Limited · Nọmba Ụlọọrụ 17250183',
    details: {
      home: '<section><h2>Mmepe ngwanrọ, njikọta na ndụmọdụ IT</h2><p>Huygensoft na-enyere òtù dị iche iche aka ịgbanwe echiche, ngwá ọrụ ndị na-adịghị ejikọta onwe ha na usoro ọrụ siri ike ka ha ghọọ ngwaahịa dijitalụ e jiri nlezianya chepụta.</p></section>',
      services: '<section><h2>Mmepe ngwanrọ</h2><p>Ọrụ weebụ, desktọpụ na ngwaahịa e mere ka ọ dabara n’ụzọ azụmahịa gị si arụ ọrụ n’eziokwu.</p><h2>Njikọta na akpaaka</h2><p>Jikọta sistemụ ndị dị mkpa, wepụ ọrụ a na-eme ugboro ugboro ma mee ka ozi na-aga nke ọma.</p><h2>Ndụmọdụ teknụzụ</h2><p>Weta ịdị jụụ n’ime mkpebi ndị mgbagwoju anya site n’ịchọpụta mkpa nke ọma, nhazi sistemụ na nkwado nnyefe bara uru.</p></section>',
      company: '<section><h2>Huygensoft Limited</h2><p>Huygensoft Limited bụ ụlọọrụ nkeonwe nwere oke ibu na UK, nke e debanyere aha maka mbipụta ngwanrọ, mmepe ngwanrọ na ndụmọdụ IT.</p><dl><div><dt>Nọmba ụlọọrụ</dt><dd>17250183</dd></div><div><dt>Ọnọdụ</dt><dd>Na-arụ ọrụ · Ụlọọrụ nkeonwe nwere oke ibu</dd></div><div><dt>Ụbọchị e hiwere</dt><dd>29 May 2026</dd></div><div><dt>Ụlọọrụ e debanyere aha</dt><dd>182–184 High Street North, London, England, E6 2JA</dd></div></dl><h2>Ọrụ e debanyere aha</h2><ul><li>58290 — Other software publishing</li><li>62012 — Business and domestic software development</li><li>62020 — Information technology consultancy activities</li></ul></section>',
      contact: '<section><h2>Nkọwa kọntaktị</h2><p><a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a></p><address>182–184 High Street North, London, England, E6 2JA</address><p>Fọm ajụjụ zuru ezu dị mgbe JavaScript na-arụ ọrụ.</p></section>',
      privacy: '<section><h2>Nzuzo maka ajụjụ</h2><p>Anyị na-eji ozi ị nyere ghọta ma zaa ajụjụ gị, nakwa idobe ndekọ kwesịrị ekwesị nke mkparịta ụka ahụ.</p><p>Maka ajụjụ nzuzo, kpọtụrụ <a href="mailto:reach@huygensoft.com">reach@huygensoft.com</a>.</p></section>',
    },
  },
};

function serviceFallbackDetails(service) {
  const sections = service.sections.map((section) => {
    const blocks = section.blocks.map((block) => {
      if (block.type === 'paragraph') return `<p>${escapeHtml(block.content)}</p>`;
      const tag = block.ordered ? 'ol' : 'ul';
      return `<${tag}>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</${tag}>`;
    }).join('');
    return `<section><h2>${escapeHtml(section.heading)}</h2>${blocks}</section>`;
  }).join('');
  return `<section><p>${escapeHtml(service.intro)}</p>${sections}</section>`;
}

function testimonialsFallback() {
  const entries = catalog.testimonials.map((testimonial) => `<article><blockquote><p>${escapeHtml(testimonial.feedback)}</p></blockquote><p><strong>${escapeHtml(testimonial.client)}</strong> — ${escapeHtml(testimonial.project)} · ${escapeHtml(testimonial.location)} · ${escapeHtml(testimonial.date)} · ${'★'.repeat(testimonial.rating)}</p></article>`).join('');
  return `<section lang="en"><h2>Client testimonials</h2>${entries}</section>`;
}

function companyLegacyFallback() {
  return '<section lang="en"><h2>Engineering custom software for complex systems</h2><p>Huygensoft is a specialised software engineering firm dedicated to solving complex integration challenges. We build robust middleware, APIs and desktop applications that connect advanced hardware with scalable cloud architectures.</p><p>From reverse-engineering legacy systems to building real-time 3CX call-flow solutions, we focus on reliable, performant software for clients globally.</p><h2>Our locations</h2><dl><div><dt>United Kingdom — registered office</dt><dd>182–184 High Street North, East Ham, London E6 2JA</dd></div><div><dt>Nigeria — office and registered presence</dt><dd>8, Providence Street, Lekki Phase I, Lagos 105102</dd></div></dl><h2>Our mission</h2><p>To eliminate operational bottlenecks by developing bespoke, secure and highly reliable software integrations that bridge the gap between complex hardware systems and business logic.</p><h2>Our vision</h2><p>To be the technical engineering partner for global enterprises seeking deep expertise in smart locker deployments, API creation and specialised VoIP telephony solutions.</p><h2>Our philosophy</h2><p>Pragmatic problem solving, robust architecture and functional excellence. We believe in clean, reliable code that stands up to intensive, around-the-clock operational demands.</p></section>';
}

function contactLocationsFallback() {
  return '<section lang="en"><h2>Office locations and hours</h2><address><strong>United Kingdom — registered office</strong><br />182–184 High Street North<br />East Ham, London E6 2JA</address><address><strong>Nigeria — office and registered presence</strong><br />8, Providence Street<br />Lekki Phase I, Lagos 105102</address><p>Monday–Friday, 9:00 am–5:00 pm.</p></section>';
}

function fallbackMarkup(locale, page, title, description) {
  const href = (key) => `/${locale.code}${key === 'home' ? '' : `/${key}`}`;
  const copy = fallbackCopy[locale.code] ?? fallbackCopy.en;
  const details = page.service ? serviceFallbackDetails(page.service) : copy.details[page.key];
  const supplement = locale.code === 'en' ? (page.key === 'home' ? testimonialsFallback() : page.key === 'company' ? companyLegacyFallback() : page.key === 'contact' ? contactLocationsFallback() : '') : '';
  const socialLinks = '<p><a href="https://www.linkedin.com/company/83504608">LinkedIn</a> · <a href="https://x.com/huygensoft">X</a></p>';
  return `<div class="seo-fallback"><header><a href="${href('home')}">Huygensoft</a><nav aria-label="${copy.nav.label}"><a href="${href('home')}">${copy.nav.home}</a><a href="${href('services')}">${copy.nav.services}</a><a href="${href('company')}">${copy.nav.company}</a><a href="${href('contact')}">${copy.nav.contact}</a></nav></header><main><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${details}${supplement}</main><footer>${copy.footer}${socialLinks}</footer></div>`;
}

function renderPage(template, locale, page) {
  const [title, description] = pageMetadata(locale, page);
  const canonical = `${siteUrl}/${locale.code}${page.path}`;
  const alternateLocales = page.service ? locales.filter((option) => option.code === 'en') : locales;
  const alternateLinks = alternateLocales.map((option) => `<link rel="alternate" data-huygensoft-alternate="true" hreflang="${option.tag}" href="${siteUrl}/${option.code}${page.path}" />`).join('') + `<link rel="alternate" data-huygensoft-alternate="true" hreflang="x-default" href="${siteUrl}/en${page.path}" />`;
  let document = template
    .replace('<html lang="en-GB">', `<html lang="${locale.tag}" dir="${locale.direction}">`)
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonical}" />`)
    .replace('<div id="root"></div>', `<div id="root">${fallbackMarkup(locale, page, title, description)}</div>`)
    .replace('</head>', `${alternateLinks}</head>`);
  document = setMeta(document, 'name', 'description', description);
  document = setMeta(document, 'property', 'og:title', title);
  document = setMeta(document, 'property', 'og:description', description);
  document = setMeta(document, 'property', 'og:url', canonical);
  document = setMeta(document, 'property', 'og:locale', locale.tag.replace('-', '_'));
  document = setMeta(document, 'name', 'twitter:title', title);
  document = setMeta(document, 'name', 'twitter:description', description);
  return document;
}

const template = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
await writeFile(path.join(outputDirectory, 'index.html'), renderPage(template, locales[0], pages[0]));
for (const locale of locales) {
  for (const page of pages) {
    if (page.service && locale.code !== 'en') continue;
    const targetDirectory = path.join(outputDirectory, locale.code, ...page.path.split('/').filter(Boolean));
    await mkdir(targetDirectory, { recursive: true });
    await writeFile(path.join(targetDirectory, 'index.html'), renderPage(template, locale, page));
  }
}

const sitemapEntries = locales.flatMap((locale) => pages
  .filter((page) => !page.service || locale.code === 'en')
  .map((page) => `<url><loc>${siteUrl}/${locale.code}${page.path}</loc><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`));
await writeFile(path.join(outputDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${sitemapEntries.join('\n  ')}\n</urlset>\n`);
