// import React, { useState } from 'react'
// import Features from './Features';
// import CAPSLOGO from "../assets/capstonelogo2.png"

// const Hero = () => {

//     const [menuOpen, setMenuOpen] = useState(false);
//     return (
//         <>
//             <div className="min-h-screen pb-20">
//                 {/* Navbar */}
//                 <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
//                     <a
//                         href="/"
//                         className="flex items-center gap-3 text-2xl font-bold"
//                     >
//                         <img
//                             src={CAPSLOGO}
//                             alt="Capstone Logo"
//                             className="h-14 w-auto object-contain"
//                         />
//                         <span>CAPSTONE</span>
//                     </a>

//                     <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
//                         <a href="#" className="hover:text-blue-600 transition">Home</a>
//                         <a href="#features" className="hover:text-blue-600 transition">Features</a>
//                         <a href="#testimonials" className="hover:text-blue-600 transition">Testimonials</a>
//                         <a href="#cta" className="hover:text-blue-600 transition">Contact</a>
//                     </div>

//                     <div className="flex gap-2">
//                         <a href="" className="hidden md:block px-6 py-2 bg-blue-500 hover:bg-blue-700 active:scale-95 transition-all rounded-full text-white">
//                             Get started
//                         </a>
//                         <a href="/login" className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900" >
//                             Login
//                         </a>
//                     </div>

//                     <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
//                         <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
//                             <path d="M4 5h16M4 12h16M4 19h16" />
//                         </svg>
//                     </button>
//                 </nav>

//                 {/* Mobile Menu */}
//                 <div className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
//                     <a href="/" className="text-white">Home</a>
//                     <a href="/products" className="text-white">Products</a>
//                     <a href="/stories" className="text-white">Stories</a>
//                     <a href="/pricing" className="text-white">Pricing</a>
//                     <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-blue-600 hover:bg-blue-700 transition text-white rounded-md flex" >
//                         X
//                     </button>
//                 </div>

//                 {/* Hero Section */}
//                 <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
//                     <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-blue-300 blur-[100px] opacity-30"></div>

//                     {/* Avatars + Stars */}
//                     <div className="flex items-center mt-24">
//                         <div className="flex -space-x-3 pr-3">
//                             <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
//                             <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
//                             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
//                             <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
//                             <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]" />
//                         </div>

//                         <div>
//                             <div className="flex ">
//                                 {Array(5).fill(0).map((_, i) => (
//                                     <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-blue-600" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
//                                 ))}
//                             </div>
//                             <p className="text-sm text-gray-700">
//                                 Used by 10,000+ users
//                             </p>
//                         </div>
//                     </div>

//                     {/* Headline + CTA */}
//                     <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
//                         Centralized Platform for Final Year <span className=" bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent text-nowrap">Project </span> Monitoring.
//                     </h1>

//                     <p className="max-w-md text-center text-base my-7">Manage final year projects with structured stages, reviews, and progress tracking.</p>

//                     {/* CTA Buttons */}
//                     <div className="flex items-center gap-4 ">
//                         <a href='/projects' className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-blue-400 flex items-center transition-colors">
//                             Explore Projects
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
//                         </a>
//                         <button className="flex items-center gap-2 border border-slate-400 hover:bg-blue-50 transition rounded-full px-7 h-12 text-slate-700">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video size-5" aria-hidden="true"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
//                             <span>Try demo</span>
//                         </button>
//                     </div>

//                     <p className="py-6 text-slate-600 mt-14">Trusting by leading brands, including</p>

//                     {/* <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4" id="logo-container">
//                 {companiesLogo.map((company, index) => (
//                     <React.Fragment key={index}>
//                         {company.logo}
//                     </React.Fragment>
//                 ))}
//             </div> */}
//                 </div>

//                 <Features />

//             </div>
//             <style>
//                 {`
//             @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

//             * {
//                 font-family: 'Poppins', sans-serif;
//             }
//         `}
//             </style>

//         </>
//     )
// }

// export default Hero

import React, { useState, useEffect, useRef } from 'react'
import CAPSLOGO from "../assets/capstonelogo2.png"


// ─── Icon Components ──────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, className = '', fill = 'none', strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
)

const Star = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? '#2563eb' : 'none'}
    stroke="#2563eb" strokeWidth="2">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: ['M3 3h18v18H3z', 'M9 9h6v6H9z'],
    title: 'Structured Stages',
    desc: 'Guide students through defined milestones — proposal, development, testing, and final submission — with clear checkpoints at every phase.',
    color: '#2563eb',
    tag: 'Project Lifecycle'
  },
  {
    icon: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],
    title: 'Review & Feedback',
    desc: 'Supervisors and panels submit structured reviews linked directly to project stages, keeping feedback organized and actionable.',
    color: '#0ea5e9',
    tag: 'Evaluation'
  },
  {
    icon: ['M22 12h-4l-3 9L9 3l-3 9H2'],
    title: 'Progress Tracking',
    desc: 'Real-time dashboards surface project health, pending submissions, and bottlenecks across every student in your department.',
    color: '#6366f1',
    tag: 'Analytics'
  },
  {
    icon: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
    title: 'Role-Based Access',
    desc: 'Students, supervisors, coordinators, and admins each get a tailored workspace with the right permissions and visibility.',
    color: '#10b981',
    tag: 'Access Control'
  },
  {
    icon: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
    title: 'Document Management',
    desc: 'Centralized file submission per stage. No more email attachments — every document is versioned, labeled, and easy to locate.',
    color: '#f59e0b',
    tag: 'File Handling'
  },
  {
    icon: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
    title: 'Department Reports',
    desc: 'Auto-generated reports on completion rates, grade distributions, and supervisor workloads exported at the click of a button.',
    color: '#ec4899',
    tag: 'Reporting'
  }
]

const steps = [
  { num: '01', title: 'Register & Join', desc: 'Students register and are assigned to their supervisor. Coordinators set up the project cycle with stages and deadlines.' },
  { num: '02', title: 'Submit Proposals', desc: 'Teams submit project proposals through the platform. Supervisors review, comment, and approve or request revisions.' },
  { num: '03', title: 'Track Progress', desc: 'Each stage has its own submission window. Students upload deliverables; supervisors grade and leave structured feedback.' },
  { num: '04', title: 'Final Evaluation', desc: 'Panel presentations are scheduled and scored within the platform. Results are compiled into departmental reports.' },
]

const testimonials = [
  {
    name: 'Dr. Aisha Kamara',
    role: 'FYP Coordinator, UTM',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&q=80',
    text: 'Capstone eliminated the chaos of managing 200+ projects over email. Every submission, review, and grade is in one place — it\'s transformed how our department operates.'
  },
  {
    name: 'Marcus Lim',
    role: 'Final Year Student',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&q=80',
    text: 'I always knew exactly what stage I was at and what was expected of me. The progress tracker kept me motivated and my supervisor\'s feedback was always right there.'
  },
  {
    name: 'Prof. Elena Vasquez',
    role: 'Thesis Supervisor, UPM',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80',
    text: 'Reviewing 15 projects used to take days of email back-and-forth. With Capstone, I finish structured reviews in an afternoon and students get better feedback faster.'
  }
]

const stats = [
  { value: '10K+', label: 'Active Students' },
  { value: '340+', label: 'Universities' },
  { value: '98%', label: 'On-time Submissions' },
  { value: '4.9★', label: 'Average Rating' },
]

// ─── Subcomponents ────────────────────────────────────────────────────────────
const FeatureCard = ({ feature, index }) => (
  <div className="feature-card" style={{ animationDelay: `${index * 80}ms` }}>
    <div className="feature-tag">{feature.tag}</div>
    <div className="feature-icon-wrap" style={{ background: `${feature.color}15`, color: feature.color }}>
      <Icon d={feature.icon} size={22} />
    </div>
    <h3 className="feature-title">{feature.title}</h3>
    <p className="feature-desc">{feature.desc}</p>
    <div className="feature-line" style={{ background: feature.color }} />
  </div>
)

const TestimonialCard = ({ t, active }) => (
  <div className={`testimonial-card ${active ? 'active' : ''}`}>
    <div className="quote-mark">"</div>
    <p className="testimonial-text">{t.text}</p>
    <div className="testimonial-author">
      <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
      <div>
        <div className="testimonial-name">{t.name}</div>
        <div className="testimonial-role">{t.role}</div>
      </div>
    </div>
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  


  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ─── Navbar ─── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="/" className="nav-logo">
          <div className="logo-mark">
            <img src={CAPSLOGO} alt="CAPSTONE" /></div>
          <span className='font-lobster text-blue-600 text-3xl'>CAPSTONE</span>
        </a>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#testimonials">Testimonials</a>
        </div>

        <div className="nav-actions">
          <a href="/login" className="btn-primary">Login</a>
          {/* <a href="" className="btn-primary">Get Started</a> */}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(true)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        {['Home', 'Features', 'How It Works', 'Testimonials'].map(item => (
          <a key={item} href={`#${item === 'Home' ? '' : item.toLowerCase().replace(/ /g, '-')}`}
            onClick={() => setMenuOpen(false)}>{item}</a>
        ))}
        <div className="mobile-actions">
          <a href="/login" className="btn-ghost w-full text-center">Login</a>
          <a href="" className="btn-primary w-full text-center">Get Started</a>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="hero-section">
        {/* Background blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="grid-overlay" />

        <div className="hero-inner">
          {/* Social proof */}
          <div className="social-proof fade-up" style={{ animationDelay: '0ms' }}>
            <div className="avatars">
              {[
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&q=80',
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80',
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80',
                'https://randomuser.me/api/portraits/men/75.jpg',
              ].map((src, i) => <img key={i} src={src} alt="" style={{ zIndex: i + 1 }} />)}
            </div>
            <div className="proof-text">
              <div className="stars">{Array(5).fill(0).map((_, i) => <Star key={i} filled />)}</div>
              <span>Trusted by <strong>10,000+</strong> students & faculty</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="hero-headline fade-up" style={{ animationDelay: '100ms' }}>
            The Complete Platform for<br />
            <span className="headline-accent">Final Year Project</span><br />
            Monitoring
          </h1>

          <p className="hero-sub fade-up" style={{ animationDelay: '200ms' }}>
            Streamline proposals, supervisions, milestone reviews, and evaluations — all in one structured, collaborative workspace built for academic institutions.
          </p>

          {/* CTA */}
          <div className="hero-ctas fade-up" style={{ animationDelay: '300ms' }}>
            <a href="/projects" className="btn-primary btn-lg">
              Explore Projects
              <Icon d={['M5 12h14', 'm12 5 7 7-7 7']} size={18} />
            </a>
            <button className="btn-outline btn-lg">
              <Icon d={['m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5', 'M2 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z']} size={18} />
              Watch Demo
            </button>
          </div>

          {/* Dashboard mockup */}
          <div className="dashboard-preview fade-up" style={{ animationDelay: '450ms' }}>
            <div className="preview-bar">
              <span /><span /><span />
              <div className="preview-bar-title">Capstone Dashboard</div>
            </div>
            <div className="preview-body">
              <div className="preview-sidebar">
                {['Dashboard', 'My Projects', 'Reviews', 'Documents', 'Reports'].map((item, i) => (
                  <div key={i} className={`sidebar-item ${i === 0 ? 'active' : ''}`}>{item}</div>
                ))}
              </div>
              <div className="preview-main">
                <div className="preview-stats-row">
                  {[
                    { label: 'Active Projects', val: '24', color: '#2563eb' },
                    { label: 'Pending Reviews', val: '7', color: '#f59e0b' },
                    { label: 'Submitted Today', val: '12', color: '#10b981' },
                  ].map((s, i) => (
                    <div key={i} className="preview-stat" style={{ borderTop: `3px solid ${s.color}` }}>
                      <div className="preview-stat-val" style={{ color: s.color }}>{s.val}</div>
                      <div className="preview-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="preview-table-label">Recent Submissions</div>
                <div className="preview-table">
                  {[
                    { name: 'AI Traffic Management', stage: 'Proposal', status: 'Approved', color: '#10b981' },
                    { name: 'Blockchain Voting App', stage: 'Development', status: 'In Review', color: '#f59e0b' },
                    { name: 'Medical IoT System', stage: 'Testing', status: 'Pending', color: '#6366f1' },
                    { name: 'NLP Chat Assistant', stage: 'Final', status: 'Graded', color: '#2563eb' },
                  ].map((row, i) => (
                    <div key={i} className="preview-row">
                      <div className="preview-proj-name">{row.name}</div>
                      <div className="preview-stage">{row.stage}</div>
                      <div className="preview-badge" style={{ background: `${row.color}20`, color: row.color }}>{row.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Band ─── */}
      <section className="stats-band">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── Features ─── */}
      <section className="section" id="features">
        <div className="section-inner">
          <div className="section-label">Platform Features</div>
          <h2 className="section-heading">Everything your department needs</h2>
          <p className="section-sub">Built for the full lifecycle of final year project management, from registration to final grading.</p>
          <div className="features-grid">
            {features.map((f, i) => <FeatureCard key={i} feature={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="section section-alt" id="how-it-works">
        <div className="section-inner">
          <div className="section-label">Process</div>
          <h2 className="section-heading">How Capstone works</h2>
          <p className="section-sub">A clear, structured workflow from day one to graduation.</p>
          <div className="steps-container">
            {steps.map((step, i) => (
              <div key={i} className="step-item">
                <div className="step-num-wrap">
                  <div className="step-num">{step.num}</div>
                  {i < steps.length - 1 && <div className="step-connector" />}
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="section" id="testimonials">
        <div className="section-inner">
          <div className="section-label">Social Proof</div>
          <h2 className="section-heading">What our users say</h2>
          <p className="section-sub">Coordinators, supervisors, and students across 340+ institutions rely on Capstone daily.</p>
          <div className="testimonials-track">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} active={i === activeTestimonial} />
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`dot ${i === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="cta-section" id="cta">
        <div className="cta-blob-1" />
        <div className="cta-blob-2" />
        <div className="cta-inner">
          <div className="section-label light">Get Started</div>
          <h2 className="cta-heading">Ready to modernize your FYP management?</h2>
          <p className="cta-sub">Join hundreds of universities already running smoother, more transparent final year project cycles.</p>
          <div className="cta-actions">
            <a href="" className="btn-white btn-lg">
              Start Free Trial
              <Icon d={['M5 12h14', 'm12 5 7 7-7 7']} size={18} />
            </a>
            <a href="/login" className="btn-outline-white btn-lg">Login to Dashboard</a>
          </div>
          <p className="cta-note">No credit card required · Free 30-day trial · Cancel anytime</p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-mark sm">C</div>
            <span className="footer-name">CAPSTONE</span>
            <p className="footer-tagline">The academic project monitoring platform built for clarity, structure, and results.</p>
          </div>
          <div className="footer-links-group">
            <div className="footer-col">
              <div className="footer-col-title">Product</div>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#">Pricing</a>
              <a href="#">Changelog</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Institutions</div>
              <a href="#">Universities</a>
              <a href="#">Polytechnics</a>
              <a href="#">Case Studies</a>
              <a href="#">Documentation</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Company</div>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Capstone. All rights reserved.</span>
          <span>Made for students, by people who were once students.</span>
        </div>
      </footer>

      {/* ─── Global Styles ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue: #2563eb;
          --blue-dark: #1d4ed8;
          --blue-light: #dbeafe;
          --text: #0f172a;
          --text-muted: #64748b;
          --surface: #f8fafc;
          --border: #e2e8f0;
          --white: #ffffff;
          --radius: 16px;
          --shadow: 0 4px 24px rgba(37,99,235,0.08);
          --shadow-lg: 0 20px 60px rgba(37,99,235,0.14);
        }

        body { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); overflow-x: hidden; }
        h1,h2,h3,h4,h5,h6 { font-family: 'Sora', sans-serif; }

        /* ── Navbar ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 40px;
          transition: all .3s ease;
          background: transparent;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 var(--border);
          padding: 14px 40px;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Sora', sans-serif; font-weight: 800; font-size: 18px;
          color: var(--text); text-decoration: none;
        }
        .logo-mark {
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--blue); color: white; padding: 1px;
          font-family: 'Sora', sans-serif; font-weight: 800; font-size: 18px;
          display: flex; align-items: center; justify-content: center;
        }
        .logo-mark.sm { width: 30px; height: 30px; font-size: 14px; border-radius: 8px; }
        .nav-links { display: flex; gap: 32px; }
        .nav-links a {
          font-size: 14px; font-weight: 500; color: var(--text-muted);
          text-decoration: none; transition: color .2s;
        }
        .nav-links a:hover { color: var(--blue); }
        .nav-actions { display: flex; gap: 10px; align-items: center; }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: var(--text); border-radius: 2px; transition: .3s; }
        @media (max-width: 768px) {
          .nav-links, .nav-actions { display: none; }
          .hamburger { display: flex; }
          .navbar { padding: 16px 20px; }
        }

        /* ── Mobile Menu ── */
        .mobile-menu {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(255,255,255,0.97); backdrop-filter: blur(20px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 24px; font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 600;
          transform: translateX(-100%); transition: transform .35s cubic-bezier(.4,0,.2,1);
        }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu a { color: var(--text); text-decoration: none; }
        .mobile-close {
          position: absolute; top: 20px; right: 24px;
          background: none; border: none; font-size: 24px; cursor: pointer; color: var(--text-muted);
        }
        .mobile-actions { display: flex; flex-direction: column; gap: 12px; width: 200px; margin-top: 16px; }

        /* ── Buttons ── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--blue); color: white; padding: 12px 24px;
          border-radius: 100px; font-weight: 600; font-size: 14px;
          text-decoration: none; border: none; cursor: pointer;
          transition: background .2s, transform .15s, box-shadow .2s;
          box-shadow: 0 4px 14px rgba(37,99,235,0.3);
        }
        .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(37,99,235,0.4); }
        .btn-primary:active { transform: scale(0.97); }
        .btn-primary.btn-lg { padding: 14px 28px; font-size: 15px; }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--text-muted); padding: 12px 20px;
          border-radius: 100px; font-weight: 500; font-size: 14px;
          text-decoration: none; border: none; cursor: pointer;
          transition: color .2s, background .2s;
        }
        .btn-ghost:hover { color: var(--text); background: var(--surface); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--text); padding: 12px 24px;
          border-radius: 100px; font-weight: 600; font-size: 14px;
          text-decoration: none; border: 1.5px solid var(--border); cursor: pointer;
          transition: border-color .2s, background .2s, transform .15s;
        }
        .btn-outline:hover { border-color: var(--blue); background: var(--blue-light); transform: translateY(-1px); }
        .btn-outline.btn-lg { padding: 14px 28px; font-size: 15px; }
        .btn-white {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; color: var(--blue); padding: 14px 28px;
          border-radius: 100px; font-weight: 700; font-size: 15px;
          text-decoration: none; border: none; cursor: pointer;
          transition: transform .15s, box-shadow .2s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.18); }
        .btn-outline-white {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: white; padding: 14px 28px;
          border-radius: 100px; font-weight: 600; font-size: 15px;
          text-decoration: none; border: 1.5px solid rgba(255,255,255,0.5); cursor: pointer;
          transition: background .2s, transform .15s;
        }
        .btn-outline-white:hover { background: rgba(255,255,255,0.12); transform: translateY(-1px); }

        /* ── Hero ── */
        .hero-section {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; align-items: center; padding-top: 100px; padding-bottom: 60px;
          background: #fafbff;
        }
        .blob {
          position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none;
        }
        .blob-1 { width: 600px; height: 600px; background: #bfdbfe; opacity: 0.35; top: -100px; left: -150px; }
        .blob-2 { width: 500px; height: 500px; background: #c7d2fe; opacity: 0.25; bottom: -50px; right: -100px; }
        .blob-3 { width: 300px; height: 300px; background: #bae6fd; opacity: 0.2; top: 40%; left: 55%; }
        .grid-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px; opacity: 0.35;
          -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
        }
        .hero-inner {
          position: relative; z-index: 1; max-width: 900px; margin: 0 auto;
          padding: 0 24px; display: flex; flex-direction: column; align-items: center; text-align: center;
        }

        /* ── Social Proof ── */
        .social-proof {
          display: inline-flex; align-items: center; gap: 14px;
          background: rgba(255,255,255,0.8); border: 1px solid var(--border);
          border-radius: 100px; padding: 8px 20px 8px 10px; backdrop-filter: blur(8px);
          margin-bottom: 32px;
        }
        .avatars { display: flex; }
        .avatars img {
          width: 32px; height: 32px; border-radius: 50%;
          border: 2.5px solid white; margin-left: -8px; object-fit: cover;
        }
        .avatars img:first-child { margin-left: 0; }
        .proof-text { display: flex; flex-direction: column; gap: 1px; text-align: left; }
        .stars { display: flex; gap: 1px; }
        .proof-text span { font-size: 12px; color: var(--text-muted); }
        .proof-text strong { color: var(--text); }

        /* ── Headline ── */
        .hero-headline {
          font-size: clamp(38px, 6vw, 68px);
          font-weight: 800; line-height: 1.1; letter-spacing: -2px;
          margin-bottom: 24px;
        }
        .headline-accent {
          background: linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 17px; color: var(--text-muted); max-width: 540px;
          line-height: 1.7; margin-bottom: 36px;
        }
        .hero-ctas { display: flex; gap: 14px; margin-bottom: 60px; flex-wrap: wrap; justify-content: center; }

        /* ── Dashboard Preview ── */
        .dashboard-preview {
          width: 100%; max-width: 780px;
          background: white; border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: 0 30px 80px rgba(37,99,235,0.12), 0 0 0 1px rgba(37,99,235,0.05);
          overflow: hidden;
        }
        .preview-bar {
          display: flex; align-items: center; gap: 7px; padding: 14px 18px;
          border-bottom: 1px solid var(--border); background: #f8fafc;
        }
        .preview-bar span {
          width: 12px; height: 12px; border-radius: 50%;
        }
        .preview-bar span:nth-child(1) { background: #fc5f5f; }
        .preview-bar span:nth-child(2) { background: #fbbf24; }
        .preview-bar span:nth-child(3) { background: #34d399; }
        .preview-bar-title {
          margin-left: 8px; font-size: 12px; font-weight: 600; color: var(--text-muted);
          font-family: 'Sora', sans-serif;
        }
        .preview-body { display: flex; min-height: 300px; }
        .preview-sidebar {
          width: 150px; border-right: 1px solid var(--border);
          padding: 16px 12px; display: flex; flex-direction: column; gap: 4px;
          background: #fafbff;
        }
        .sidebar-item {
          padding: 8px 12px; border-radius: 8px;
          font-size: 12px; font-weight: 500; color: var(--text-muted);
          cursor: pointer; transition: .15s;
        }
        .sidebar-item:hover, .sidebar-item.active { background: var(--blue-light); color: var(--blue); font-weight: 600; }
        .preview-main { flex: 1; padding: 20px; }
        .preview-stats-row { display: flex; gap: 12px; margin-bottom: 20px; }
        .preview-stat {
          flex: 1; background: var(--surface); border-radius: 10px;
          padding: 14px 12px;
        }
        .preview-stat-val { font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700; }
        .preview-stat-label { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
        .preview-table-label { font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .preview-table { display: flex; flex-direction: column; gap: 8px; }
        .preview-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; background: var(--surface); border-radius: 8px;
        }
        .preview-proj-name { flex: 1; font-size: 12px; font-weight: 600; color: var(--text); }
        .preview-stage { font-size: 11px; color: var(--text-muted); width: 80px; text-align: center; }
        .preview-badge { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px; }
        @media (max-width: 600px) { .preview-sidebar { display: none; } .preview-stats-row { flex-direction: column; } }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp .7s ease both; }

        /* ── Stats Band ── */
        .stats-band {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: white; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 40px 60px;
        }
        .stat-item { text-align: center; padding: 0 20px; }
        .stat-item + .stat-item { border-left: 1px solid var(--border); }
        .stat-value { font-family: 'Sora', sans-serif; font-size: 36px; font-weight: 800; color: var(--blue); }
        .stat-label { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
        @media (max-width: 640px) { .stats-band { grid-template-columns: repeat(2, 1fr); padding: 30px 20px; } .stat-item + .stat-item { border-left: none; } }

        /* ── Sections ── */
        .section { padding: 100px 40px; }
        .section-alt { background: var(--surface); }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-label {
          display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--blue); background: var(--blue-light);
          padding: 5px 14px; border-radius: 100px; margin-bottom: 16px;
        }
        .section-label.light { background: rgba(255,255,255,0.2); color: white; }
        .section-heading {
          font-size: clamp(28px, 4vw, 44px); font-weight: 800; letter-spacing: -1.5px;
          margin-bottom: 16px; line-height: 1.1;
        }
        .section-sub { font-size: 17px; color: var(--text-muted); max-width: 520px; line-height: 1.7; margin-bottom: 60px; }

        /* ── Features Grid ── */
        .features-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .features-grid { grid-template-columns: 1fr; } }
        .feature-card {
          background: white; border: 1px solid var(--border); border-radius: var(--radius);
          padding: 28px; position: relative; overflow: hidden;
          transition: transform .25s, box-shadow .25s;
          animation: fadeUp .6s ease both;
        }
        .feature-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
        .feature-tag {
          display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px;
        }
        .feature-icon-wrap {
          width: 46px; height: 46px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .feature-title { font-size: 17px; font-weight: 700; margin-bottom: 10px; }
        .feature-desc { font-size: 14px; color: var(--text-muted); line-height: 1.65; }
        .feature-line {
          position: absolute; bottom: 0; left: 0; height: 3px; width: 0;
          transition: width .4s ease;
          border-radius: 0 0 0 var(--radius);
        }
        .feature-card:hover .feature-line { width: 100%; }

        /* ── Steps ── */
        .steps-container { display: flex; flex-direction: column; gap: 0; }
        .step-item { display: flex; gap: 28px; }
        .step-num-wrap { display: flex; flex-direction: column; align-items: center; }
        .step-num {
          width: 52px; height: 52px; border-radius: 16px;
          background: var(--blue); color: white;
          font-family: 'Sora', sans-serif; font-weight: 800; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; box-shadow: 0 6px 20px rgba(37,99,235,0.3);
        }
        .step-connector { width: 2px; flex: 1; background: var(--border); margin: 8px 0; min-height: 48px; }
        .step-content { padding-bottom: 48px; padding-top: 12px; }
        .step-title { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
        .step-desc { font-size: 15px; color: var(--text-muted); max-width: 500px; line-height: 1.7; }

        /* ── Testimonials ── */
        .testimonials-track {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          margin-bottom: 32px;
        }
        @media (max-width: 800px) { .testimonials-track { grid-template-columns: 1fr; } }
        .testimonial-card {
          background: white; border: 1px solid var(--border); border-radius: var(--radius);
          padding: 32px; position: relative;
          transition: transform .3s, box-shadow .3s, border-color .3s;
          opacity: 0.7;
        }
        .testimonial-card.active { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--blue); opacity: 1; }
        .quote-mark { font-family: 'Sora', sans-serif; font-size: 60px; font-weight: 800; color: var(--blue-light); line-height: 1; margin-bottom: 12px; }
        .testimonial-text { font-size: 15px; color: var(--text); line-height: 1.75; margin-bottom: 24px; }
        .testimonial-author { display: flex; align-items: center; gap: 14px; }
        .testimonial-avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border); }
        .testimonial-name { font-weight: 700; font-size: 15px; }
        .testimonial-role { font-size: 13px; color: var(--text-muted); }
        .testimonial-dots { display: flex; gap: 8px; justify-content: center; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); border: none; cursor: pointer; transition: .2s; }
        .dot.active { background: var(--blue); width: 24px; border-radius: 4px; }

        /* ── CTA Section ── */
        .cta-section {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #7c3aed 100%);
          padding: 100px 40px; text-align: center; color: white;
        }
        .cta-blob-1 { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: rgba(255,255,255,0.07); top: -150px; left: -100px; pointer-events: none; }
        .cta-blob-2 { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: rgba(255,255,255,0.07); bottom: -100px; right: -50px; pointer-events: none; }
        .cta-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .cta-heading { font-size: clamp(28px, 4vw, 48px); font-weight: 800; letter-spacing: -1.5px; margin-bottom: 16px; line-height: 1.1; }
        .cta-sub { font-size: 17px; opacity: 0.85; line-height: 1.7; margin-bottom: 40px; }
        .cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
        .cta-note { font-size: 13px; opacity: 0.65; }

        /* ── Footer ── */
        .footer { background: var(--text); color: rgba(255,255,255,0.7); padding: 70px 60px 30px; }
        .footer-inner { display: flex; gap: 60px; max-width: 1100px; margin: 0 auto 60px; flex-wrap: wrap; }
        .footer-brand { max-width: 240px; }
        .footer-name { font-family: 'Sora', sans-serif; font-weight: 800; color: white; font-size: 17px; margin-left: 10px; }
        .footer-brand .nav-logo { color: white; margin-bottom: 16px; display: flex; align-items: center; }
        .footer-tagline { font-size: 14px; line-height: 1.7; margin-top: 12px; }
        .footer-links-group { display: flex; gap: 60px; flex: 1; flex-wrap: wrap; }
        .footer-col { display: flex; flex-direction: column; gap: 12px; }
        .footer-col-title { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14px; color: white; margin-bottom: 4px; }
        .footer-col a { font-size: 14px; color: rgba(255,255,255,0.6); text-decoration: none; transition: color .2s; }
        .footer-col a:hover { color: white; }
        .footer-bottom {
          max-width: 1100px; margin: 0 auto; padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex; justify-content: space-between; font-size: 13px; flex-wrap: wrap; gap: 8px;
        }
        @media (max-width: 768px) { .footer { padding: 50px 24px 24px; } .footer-inner { flex-direction: column; gap: 40px; } .footer-brand { max-width: 100%; } .section { padding: 70px 20px; } }
      `}</style>
    </>
  )
}

export default Hero