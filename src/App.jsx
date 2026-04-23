import { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/logo.png'
import work1 from './assets/furniture-website.jpg'
import work2 from './assets/hotel-webiste.jpg'
import work3 from './assets/saloon-website.jpg'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>,
    title: 'Website Design',
    desc: 'Clean, modern designs tailored to your brand — restaurants, shops, clinics, temples & more.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    title: 'Mobile-Friendly',
    desc: 'Every site is fully responsive so your customers find you easily on any phone or tablet.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: 'Fast & Optimised',
    desc: 'Lightning-fast load times keep visitors engaged and improve your Google search ranking.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
    title: 'Online Store',
    desc: 'Accept orders and payments online — perfect for Udupi food businesses and local retailers.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    title: 'Google Maps & SEO',
    desc: 'Get found locally. Google My Business setup and on-page SEO included at no extra cost.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: 'Maintenance & Support',
    desc: 'Affordable monthly plans to keep your site updated, secure, and running smoothly.',
  },
]

const SAMPLE_WORK = [
  { img: work1, name: 'Furniz', type: 'Furniture & Interior', desc: 'Dark, premium storefront with product showcase, gallery, and service pages for a furniture brand.', tags: ['E-commerce', 'Dark Theme', 'Gallery'] },
  { img: work2, name: 'Peacerest', type: 'Hotel & Hospitality', desc: 'Luxury hotel website with room listings, booking enquiry, stats section, and immersive photo galleries.', tags: ['Booking', 'Gallery', 'Rooms'] },
  { img: work3, name: 'Coiffure', type: 'Salon & Wellness', desc: 'Modern booking platform for a salon with service listings, city-based search, and appointment scheduling.', tags: ['Booking', 'Services', 'Dark Theme'] },
]

const PLANS = [
  {
    name: 'Starter',
    price: '₹2,999',
    period: 'one-time',
    highlight: true,
    features: [
      'Custom website design',
      'Mobile-friendly layout',
      'Contact form',
      'Google Maps integration',
      'WhatsApp button',
      'Social media links',
      'Fast delivery',
    ],
    cta: 'Get Started',
  },
]

const TESTIMONIALS = [
  {
    name: 'Ravi Shetty',
    business: "Ravi's Tiffin Centre, Udupi",
    text: 'My restaurant was full on weekends but slow on weekdays. After getting the website with online menu and Google listing, we started getting walk-ins from Manipal students every single day!',
    rating: 5,
  },
  {
    name: 'Sunitha Kamath',
    business: 'Sunitha Sarees, Kundapur',
    text: 'I was scared websites would be too expensive and complicated. It was neither — the process was smooth, the price was fair, and now customers WhatsApp me orders from the catalogue directly.',
    rating: 5,
  },
  {
    name: 'Dr. Prasad Nayak',
    business: 'Nayak Dental Clinic, Manipal',
    text: 'Patients now book appointments online before visiting. The professional look of the site has genuinely increased trust. Highly recommend to any Udupi doctor or clinic.',
    rating: 5,
  },
]

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}


function CopyBtn({ value }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button className={`copy-btn${copied ? ' copy-btn--done' : ''}`} onClick={copy} title="Copy">
      {copied
        ? <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        : <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      }
    </button>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <a className="navbar__brand" href="#hero" onClick={e => { e.preventDefault(); scrollTo('#hero') }}>
        <img src={logo} alt="Udupi Websites" />
        <div className="brand-name">
          <span className="brand-name__top">UDUPI</span>
          <span className="brand-name__bottom">WEBSITES</span>
        </div>
      </a>

      <ul className={`navbar__links${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={e => { e.preventDefault(); setMenuOpen(false); scrollTo(l.href) }}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="navbar__cta"
            onClick={e => { e.preventDefault(); setMenuOpen(false); scrollTo('#contact') }}
          >
            Let's Talk
          </a>
        </li>
      </ul>

      <button className={`navbar__hamburger${menuOpen ? ' active' : ''}`} aria-label="Toggle menu" onClick={() => setMenuOpen(o => !o)}>
        <span /><span /><span />
      </button>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg" />
      <div className="hero__content">
        <span className="hero__badge">✦ Based in Udupi, Karnataka</span>
        <h1 className="hero__title">
          Your Business Deserves a<br />
          <span className="gradient-text">Professional Website</span>
        </h1>
        <p className="hero__sub">
          I build fast, beautiful, mobile-friendly websites for local Udupi businesses —
          restaurants, clinics, shops, homestays & more — at prices that actually make sense.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => scrollTo('#contact')}>Let's Talk</button>
          <button className="btn btn--outline" onClick={() => scrollTo('#portfolio')}>See My Work</button>
        </div>
        <div className="hero__stats">
          <div className="stat"><span className="stat__num">30+</span><span className="stat__label">Sites Built</span></div>
          <div className="stat__divider" />
          <div className="stat"><span className="stat__num">100%</span><span className="stat__label">Local Clients</span></div>
          <div className="stat__divider" />
          <div className="stat"><span className="stat__num">5 ★</span><span className="stat__label">Avg Rating</span></div>
        </div>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <div className="hero-visual-wrap">

          {/* Main browser mockup */}
          <div className="browser-mockup">
            <div className="browser-bar">
              <span /><span /><span />
              <div className="browser-url">udupi-business.in</div>
            </div>
            <div className="browser-body">
              <div className="mock-nav" />
              <div className="mock-hero-block">
                <div className="mock-hero-text">
                  <div className="mock-line mock-line--title" />
                  <div className="mock-line mock-line--sub" />
                  <div className="mock-btn" />
                </div>
              </div>
              <div className="mock-section-label" />
              <div className="mock-cards">
                <div><div className="mock-card-icon" /><div className="mock-card-line" /><div className="mock-card-line short" /></div>
                <div><div className="mock-card-icon" /><div className="mock-card-line" /><div className="mock-card-line short" /></div>
                <div><div className="mock-card-icon" /><div className="mock-card-line" /><div className="mock-card-line short" /></div>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="float-card float-card--tl">
            <div className="float-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div className="float-card__title">Website Live</div>
              <div className="float-card__sub">Delivered in 7 days</div>
            </div>
          </div>

          <div className="float-card float-card--br">
            <div className="float-card__icon float-card__icon--star">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div>
              <div className="float-card__title">5.0 Rating</div>
              <div className="float-card__sub">30+ Happy Clients</div>
            </div>
          </div>

          <div className="float-card float-card--bm">
            <div className="float-card__icon float-card__icon--mobile">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </div>
            <div>
              <div className="float-card__title">Mobile Ready</div>
              <div className="float-card__sub">Works on all devices</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">What I Offer</span>
          <span className="gold-line" />
          <h2>Everything Your Business Website Needs</h2>
          <p>No hidden costs. No tech jargon. Just a great website that works for your business.</p>
        </div>
        <div className="grid grid--3">
          {SERVICES.map(s => (
            <div className="card service-card" key={s.title}>
              <span className="card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SampleWork() {
  return (
    <section className="section section--alt" id="portfolio">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Sample Work</span>
          <span className="gold-line" />
          <h2>Designs We Bring to Life</h2>
          <p>From dark premium storefronts to elegant hospitality sites — here's the quality you can expect.</p>
        </div>
        <div className="work-grid">
          {SAMPLE_WORK.map((w, i) => (
            <div className="work-card" key={w.name}>
              <div className="work-card__img-wrap">
                <img src={w.img} alt={w.name} loading="lazy" />
                <div className="work-card__overlay">
                  <button className="work-card__cta" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Build Something Like This →
                  </button>
                </div>
              </div>
              <div className="work-card__body">
                <span className="tag">{w.type}</span>
                <h3>{w.name}</h3>
                <p>{w.desc}</p>
                <div className="tag-list">
                  {w.tags.map(t => <span key={t} className="tag tag--sm">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Transparent Pricing</span>
          <span className="gold-line" />
          <h2>One Simple Package</h2>
          <p>Everything your business needs — one honest price, no hidden charges.</p>
        </div>
        <div className="pricing-single">
          {PLANS.map(plan => (
            <div className={`card pricing-card pricing-card--single${plan.highlight ? ' pricing-card--highlight' : ''}`} key={plan.name}>
              {plan.highlight && <div className="pricing-badge">Everything Included</div>}
              <h3>{plan.name}</h3>
              <div className="pricing-price">
                <span className="price">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {plan.features.map(f => <li key={f}><span className="check">✓</span>{f}</li>)}
              </ul>
              <button
                className={`btn ${plan.highlight ? 'btn--primary' : 'btn--outline'} btn--full`}
                onClick={() => scrollTo('#contact')}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        <p className="pricing-note">
          Need something custom?{' '}
          <button className="link-btn" onClick={() => scrollTo('#contact')}>Let's talk</button>
          {' '}— I price every project fairly based on your actual needs.
        </p>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section section--alt" id="testimonials">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Client Reviews</span>
          <span className="gold-line" />
          <h2>What Udupi Business Owners Say</h2>
          <p>Real results from real local businesses — not templates, not guesses.</p>
        </div>
        <div className="grid grid--3">
          {TESTIMONIALS.map(t => (
            <div className="card testimonial-card" key={t.name}>
              <div className="stars">{'★'.repeat(t.rating)}</div>
              <blockquote>"{t.text}"</blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.business}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', business: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const msg = `Hi! I'm ${form.name} from ${form.business}. ${form.message} My phone: ${form.phone}`
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Get In Touch</span>
          <span className="gold-line" />
          <h2>Ready to Get Your Business Online?</h2>
          <p>Tell me about your business and I'll get back with a free quote within 24 hours.</p>
        </div>
        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Why Work With Me?</h3>
            <ul className="contact-benefits">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>I know Udupi businesses and customers personally</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>Meet me in person in Udupi or Manipal</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/></svg>
                <span>Talk to me in Kannada, Tulu, or English</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span>Most sites delivered in 5–7 working days</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span>Long-term support, not a one-time handoff</span>
              </li>
            </ul>
            <div className="contact-direct">
              <div className="contact-link-row">
                <a href="tel:+916363037828" className="contact-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.06 6.06l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +91 6363037828
                </a>
                <CopyBtn value="+916363037828" />
              </div>
              <div className="contact-link-row">
                <a href="mailto:udupiwebsites@gmail.com" className="contact-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  udupiwebsites@gmail.com
                </a>
                <CopyBtn value="udupiwebsites@gmail.com" />
              </div>
            </div>
          </div>

          {sent ? (
            <div className="contact-success">
              <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              <h3>Sent via WhatsApp!</h3>
              <p>I'll reply within a few hours. Looking forward to working with you.</p>
              <button className="btn btn--outline" onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" placeholder="Ravi Shetty" required value={form.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="business">Business Name</label>
                <input id="business" name="business" type="text" placeholder="Ravi's Tiffin Centre" required value={form.business} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">WhatsApp Number</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required value={form.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Tell me about your business</label>
                <textarea id="message" name="message" rows={4} placeholder="What kind of website do you need? Any specific features?" value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn--primary btn--full">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Udupi Websites" />
            <p>Professional web design for Udupi local businesses — affordable, fast & built to last.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href) }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <a href="https://maps.google.com/?q=Udupi,Karnataka" target="_blank" rel="noreferrer" className="footer-contact__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Udupi, Karnataka
            </a>
            <a href="tel:+916363037828" className="footer-contact__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.06 6.06l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 6363037828
            </a>
            <a href="mailto:udupiwebsites@gmail.com" className="footer-contact__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              udupiwebsites@gmail.com
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} UdupiWebsites. Made with <svg style={{display:'inline',verticalAlign:'middle',marginBottom:'2px'}} xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" color="var(--gold)"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> in Udupi.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <SampleWork />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
