import { useState, useEffect, useRef } from 'react'
import {
  Briefcase, Download, Github, Linkedin, Mail, MapPin, Brain, Code,
  BarChart, Users, Folder, Trophy, GraduationCap, ExternalLink, Sparkles,
  Database, FileText, CheckCircle2, Award, Terminal, Search, ArrowRight,
  TrendingUp, Layers, Check, Phone, Globe
} from 'lucide-react'
import './index.css'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Home') // Tracks current page/button clicked
  const [scrollTop, setScrollTop] = useState(0) // Tracks scroll position of the Skills view
  const contactGlowRef = useRef(null)

  const handleContactMouseMove = (e) => {
    if (contactGlowRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      contactGlowRef.current.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08), transparent 40%)`
    }
  }

  // Scroll Animation for Journey Timeline items
  useEffect(() => {
    if (activeTab === 'About') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          });
        },
        { threshold: 0.05 }
      )

      const items = document.querySelectorAll('.journey-timeline-grid')
      items.forEach((item) => observer.observe(item))

      return () => {
        items.forEach((item) => observer.unobserve(item))
      }
    }
  }, [activeTab])

  // Contact Page split glassmorphic form states
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('')
  const [journeyScrollTop, setJourneyScrollTop] = useState(0)
  const [homeScrollTop, setHomeScrollTop] = useState(0)
  const [contactMessage, setContactMessage] = useState('')
  const [contactIsSent, setContactIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNavClick = (tabName) => {
    setActiveTab(tabName)
    setMobileMenuOpen(false) // Close mobile menu if open
    setScrollTop(0) // Reset scroll position when switching tabs
    setJourneyScrollTop(0) // Reset journey scroll position
  }

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  const handleJourneyScroll = (e) => {
    setJourneyScrollTop(e.currentTarget.scrollTop)
  }

  // Calculate cinematic zoom: Hero content scales up from 1 to 2, and fades out to 0
  const heroScale = 1 + (scrollTop / 220) * 1.0
  const heroOpacity = Math.max(0, 1 - scrollTop / 200)
  const showCards = scrollTop > 120

  // Journey scroll phase calculations (Quotes -> Education -> Certifications -> Internships)
  // Phase 1: Quotes
  const qOpacity = Math.max(0, 1 - journeyScrollTop / 350)
  const qScale = 1 + (journeyScrollTop / 350) * 0.8

  // Phase 2: Education
  let edOpacity = 0
  if (journeyScrollTop >= 350) {
    if (journeyScrollTop < 400) {
      edOpacity = (journeyScrollTop - 350) / 50
    } else {
      edOpacity = 1
    }
  }

  // Header Animation: Fades in at the center, then moves up to the top
  let edHeaderOpacity = 0
  let edHeaderTranslateY = 35 // using vh units
  if (journeyScrollTop >= 350) {
    if (journeyScrollTop < 450) {
      edHeaderOpacity = Math.max(0, Math.min(1, (journeyScrollTop - 350) / 100))
      edHeaderTranslateY = 35
    } else if (journeyScrollTop < 600) {
      edHeaderOpacity = 1
      const progress = (journeyScrollTop - 450) / 150
      edHeaderTranslateY = 35 * (1 - progress)
    } else {
      edHeaderOpacity = 1
      edHeaderTranslateY = 0
    }
  }

  // Timeline Line Animation
  let edLineOpacity = 0
  if (journeyScrollTop >= 600) {
    edLineOpacity = Math.max(0, Math.min(1, (journeyScrollTop - 600) / 100))
  }

  // College Timeline Item
  let edItem1Opacity = 0
  let edItem1Translate = 30
  if (journeyScrollTop >= 650) {
    if (journeyScrollTop < 750) {
      const progress = (journeyScrollTop - 650) / 100
      edItem1Opacity = progress
      edItem1Translate = 30 * (1 - progress)
    } else {
      edItem1Opacity = 1
      edItem1Translate = 0
    }
  }

  // 12th Grade Timeline Item
  let edItem2Opacity = 0
  let edItem2Translate = 30
  if (journeyScrollTop >= 750) {
    if (journeyScrollTop < 850) {
      const progress = (journeyScrollTop - 750) / 100
      edItem2Opacity = progress
      edItem2Translate = 30 * (1 - progress)
    } else {
      edItem2Opacity = 1
      edItem2Translate = 0
    }
  }

  // 10th Grade Timeline Item
  let edItem3Opacity = 0
  let edItem3Translate = 30
  if (journeyScrollTop >= 850) {
    if (journeyScrollTop < 950) {
      const progress = (journeyScrollTop - 850) / 100
      edItem3Opacity = progress
      edItem3Translate = 30 * (1 - progress)
    } else {
      edItem3Opacity = 1
      edItem3Translate = 0
    }
  }

  // Timeline Global Translate Y
  let timelineTranslateY = 0
  if (journeyScrollTop >= 700) {
    timelineTranslateY = -(journeyScrollTop - 700) * 0.9
  }

  // Certifications Section Animation
  let certHeaderOpacity = 0
  let certHeaderTranslateY = 30
  if (journeyScrollTop >= 1150) {
    if (journeyScrollTop < 1250) {
      const progress = (journeyScrollTop - 1150) / 100
      certHeaderOpacity = progress
      certHeaderTranslateY = 30 * (1 - progress)
    } else {
      certHeaderOpacity = 1
      certHeaderTranslateY = 0
    }
  }

  let certCard1Opacity = 0
  let certCard1TranslateY = 30
  if (journeyScrollTop >= 1250) {
    if (journeyScrollTop < 1350) {
      const progress = (journeyScrollTop - 1250) / 100
      certCard1Opacity = progress
      certCard1TranslateY = 30 * (1 - progress)
    } else {
      certCard1Opacity = 1
      certCard1TranslateY = 0
    }
  }

  let certCard2Opacity = 0
  let certCard2TranslateY = 30
  if (journeyScrollTop >= 1350) {
    if (journeyScrollTop < 1450) {
      const progress = (journeyScrollTop - 1350) / 100
      certCard2Opacity = progress
      certCard2TranslateY = 30 * (1 - progress)
    } else {
      certCard2Opacity = 1
      certCard2TranslateY = 0
    }
  }

  let certCard3Opacity = 0
  let certCard3TranslateY = 30
  if (journeyScrollTop >= 1450) {
    if (journeyScrollTop < 1550) {
      const progress = (journeyScrollTop - 1450) / 100
      certCard3Opacity = progress
      certCard3TranslateY = 30 * (1 - progress)
    } else {
      certCard3Opacity = 1
      certCard3TranslateY = 0
    }
  }

  let certCard4Opacity = 0
  let certCard4TranslateY = 30
  if (journeyScrollTop >= 1550) {
    if (journeyScrollTop < 1650) {
      const progress = (journeyScrollTop - 1550) / 100
      certCard4Opacity = progress
      certCard4TranslateY = 30 * (1 - progress)
    } else {
      certCard4Opacity = 1
      certCard4TranslateY = 0
    }
  }

  let certCard5Opacity = 0
  let certCard5TranslateY = 30
  if (journeyScrollTop >= 1650) {
    if (journeyScrollTop < 1750) {
      const progress = (journeyScrollTop - 1650) / 100
      certCard5Opacity = progress
      certCard5TranslateY = 30 * (1 - progress)
    } else {
      certCard5Opacity = 1
      certCard5TranslateY = 0
    }
  }

  // Experience Section Animation
  let expHeaderOpacity = 0
  let expHeaderTranslateY = 30
  if (journeyScrollTop >= 1750) {
    if (journeyScrollTop < 1850) {
      const progress = (journeyScrollTop - 1750) / 100
      expHeaderOpacity = progress
      expHeaderTranslateY = 30 * (1 - progress)
    } else {
      expHeaderOpacity = 1
      expHeaderTranslateY = 0
    }
  }

  let expItem1Opacity = 0
  let expItem1TranslateY = 30
  if (journeyScrollTop >= 1850) {
    if (journeyScrollTop < 1950) {
      const progress = (journeyScrollTop - 1850) / 100
      expItem1Opacity = progress
      expItem1TranslateY = 30 * (1 - progress)
    } else {
      expItem1Opacity = 1
      expItem1TranslateY = 0
    }
  }

  let expItem2Opacity = 0
  let expItem2TranslateY = 30
  if (journeyScrollTop >= 1950) {
    if (journeyScrollTop < 2050) {
      const progress = (journeyScrollTop - 1950) / 100
      expItem2Opacity = progress
      expItem2TranslateY = 30 * (1 - progress)
    } else {
      expItem2Opacity = 1
      expItem2TranslateY = 0
    }
  }

  let expItem3Opacity = 0
  let expItem3TranslateY = 30
  if (journeyScrollTop >= 2050) {
    if (journeyScrollTop < 2150) {
      const progress = (journeyScrollTop - 2050) / 100
      expItem3Opacity = progress
      expItem3TranslateY = 30 * (1 - progress)
    } else {
      expItem3Opacity = 1
      expItem3TranslateY = 0
    }
  }

  let journeyFooterOpacity = 0
  let journeyFooterTranslateY = 30
  if (journeyScrollTop >= 2150) {
    if (journeyScrollTop < 2250) {
      const progress = (journeyScrollTop - 2150) / 100
      journeyFooterOpacity = progress
      journeyFooterTranslateY = 30 * (1 - progress)
    } else {
      journeyFooterOpacity = 1
      journeyFooterTranslateY = 0
    }
  }

  const edScale = 1

  // --- HOME CINEMATIC MATH ---
  const homeProgress = Math.min(1, homeScrollTop / 1000)

  const homeImageScale = 1 - (0.5 * homeProgress)
  const homeImageTranslateY = homeProgress * 500
  const homeImageOpacity = Math.max(0, 1 - (homeProgress * 1.2))
  const homeTickerScale = 1 + (homeProgress * 15)

  const fadeOutProgress = Math.max(0, Math.min(1, (homeScrollTop - 800) / 300))
  const homeMainOpacity = 1 - fadeOutProgress
  const aboutImageOpacity = fadeOutProgress

  const aboutBoxOpacity = Math.max(0, Math.min(1, (homeScrollTop - 1100) / 300))

  const stagger1 = Math.max(0, Math.min(1, (aboutBoxOpacity - 0.0) * 2))
  const stagger2 = Math.max(0, Math.min(1, (aboutBoxOpacity - 0.2) * 2))
  const stagger3 = Math.max(0, Math.min(1, (aboutBoxOpacity - 0.4) * 2))
  const stagger4 = Math.max(0, Math.min(1, (aboutBoxOpacity - 0.6) * 2))

  return (
    <div className={`homepage-wrapper ${activeTab === 'Skills' || activeTab === 'Project' || activeTab === 'Resume' || activeTab === 'Contact' ? 'dark-theme' : ''}`}>
      <header className={`capsule-header ${mobileMenuOpen ? 'expanded' : ''}`}>
        <div className="capsule-nav-container">
          {/* Left Links (Desktop) */}
          <div className="nav-group left-nav">
            <a
              href="#home"
              className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}
              onClick={() => handleNavClick('Home')}
            >
              Home
            </a>
            <a
              href="#about"
              className={`nav-item ${activeTab === 'About' ? 'active' : ''}`}
              onClick={() => handleNavClick('About')}
            >
              Journey
            </a>
            <a
              href="#skills"
              className={`nav-item ${activeTab === 'Skills' ? 'active' : ''}`}
              onClick={() => handleNavClick('Skills')}
            >
              Skills
            </a>
          </div>

          {/* Logo (Center on Desktop) */}
          <div className="nav-logo">
            <div className="logo-circle">
              <img src="/Images/rd logo.png" alt="RD Logo" className="logo-img" />
            </div>
            <span className="logo-text">
              <span className="logo-short">RANJANA</span>
              <span className="logo-long">Ranjana Devi K</span>
            </span>
          </div>

          {/* Right Links (Desktop) */}
          <div className="nav-group right-nav">
            <a
              href="#project"
              className={`nav-item ${activeTab === 'Project' ? 'active' : ''}`}
              onClick={() => handleNavClick('Project')}
            >
              Project
            </a>
            <a
              href="#resume"
              className={`nav-item ${activeTab === 'Resume' ? 'active' : ''}`}
              onClick={() => handleNavClick('Resume')}
            >
              Resume
            </a>
            <a
              href="#contact"
              className={`nav-item ${activeTab === 'Contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('Contact')}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        {/* Mobile Dropdown Links */}
        <div className={`mobile-nav-links ${mobileMenuOpen ? 'show' : ''}`}>
          <a
            href="#home"
            className={`mobile-nav-item ${activeTab === 'Home' ? 'active' : ''}`}
            onClick={() => handleNavClick('Home')}
          >
            Home
          </a>
          <a
            href="#about"
            className={`mobile-nav-item ${activeTab === 'About' ? 'active' : ''}`}
            onClick={() => handleNavClick('About')}
          >
            Journey
          </a>
          <a
            href="#skills"
            className={`mobile-nav-item ${activeTab === 'Skills' ? 'active' : ''}`}
            onClick={() => handleNavClick('Skills')}
          >
            Skills
          </a>
          <a
            href="#project"
            className={`mobile-nav-item ${activeTab === 'Project' ? 'active' : ''}`}
            onClick={() => handleNavClick('Project')}
          >
            Project
          </a>
          <a
            href="#resume"
            className={`mobile-nav-item ${activeTab === 'Resume' ? 'active' : ''}`}
            onClick={() => handleNavClick('Resume')}
          >
            Resume
          </a>
          <a
            href="#contact"
            className={`mobile-nav-item ${activeTab === 'Contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('Contact')}
          >
            Contact
          </a>
        </div>
      </header>

      {/* Global Fixed Vertical Social Links */}
      <div
        className={`vertical-social-sidebar left-social ${activeTab !== 'Home' ? 'hidden' : ''}`}
        style={{ opacity: activeTab === 'Home' ? homeImageOpacity : 0, transition: 'opacity 0.2s ease-out' }}
      >
        <a href="https://github.com/ranjanadevi1802" target="_blank" rel="noopener noreferrer">GITHUB</a>
      </div>
      <div
        className={`vertical-social-sidebar right-social ${activeTab !== 'Home' ? 'hidden' : ''}`}
        style={{ opacity: activeTab === 'Home' ? homeImageOpacity : 0, transition: 'opacity 0.2s ease-out' }}
      >
        <a href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
      </div>

      <main className="main-content">
        <div key={activeTab} className="tab-transition-wrapper">
          {activeTab === 'Skills' ? (
            <div className="skills-view" onScroll={handleScroll}>
              {/* 1. HERO INTRO VIEW */}
              <div
                className="skills-hero-section"
                style={{
                  opacity: heroOpacity,
                  transform: `scale(${heroScale})`,
                  visibility: heroOpacity === 0 ? 'hidden' : 'visible',
                  pointerEvents: 'none'
                }}
              >
                {/* Floating Technology Logo Icons */}
                <div className="floating-tech-container">
                  <img src="/Icons/Python icon.png" alt="Python" className="tech-logo logo-py" />
                  <img src="/Icons/Gemini icon.svg" alt="Gemini AI" className="tech-logo logo-gemini" />
                  <img src="/Icons/Powerbi.webp" alt="Power BI" className="tech-logo logo-bi" />
                  <img src="/Icons/Postgresql icon.jpg" alt="SQL" className="tech-logo logo-sql" />
                  <img src="/Icons/Firebase icon.svg" alt="Firebase" className="tech-logo logo-fb" />
                </div>

                <div className="skills-tagline">
                  Every dataset holds a secret, <br />
                  and every model builds a smarter tomorrow.
                </div>

                <h1 className="skills-main-title">
                  My Technological <br />
                  Arsenal
                </h1>

                <div className="skills-quote">
                  Tools, Frameworks & Core Concepts <br />
                  driving modern Data Science & AI.
                </div>

                <div
                  className="scroll-indicator"
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                  onClick={() => {
                    const container = document.querySelector('.skills-view')
                    if (container) container.scrollTo({ top: 250, behavior: 'smooth' })
                  }}
                >
                  <span>Scroll or Click to explore</span>
                  <div className="indicator-arrow"></div>
                </div>
              </div>

              {/* Spacer to absorb scroll translation before cards grid appears */}
              <div className="skills-scroll-spacer"></div>

              {/* 2. SKILL CARDS GRID SECTION */}
              <div className={`skills-grid-section ${showCards ? 'active-cards' : ''}`}>
                <div className="skills-grid-columns">
                  {/* 1. Data Analytics & Visualization */}
                  <div className="skill-card" style={{ animationDelay: '0s' }}>
                    <div className="card-icons">
                      <img src="/Icons/Powerbi.webp" alt="Power BI" />
                      <img src="/Icons/Python icon.png" alt="Python" />
                    </div>
                    <h3 className="card-title">Data Analytics & Visualization</h3>
                    <p className="card-desc">Analyzing complex datasets, designing dynamic Power BI dashboards with custom DAX calculations, and deriving actionable business insights.</p>
                  </div>

                  {/* 2. Database Management & Systems */}
                  <div className="skill-card" style={{ animationDelay: '0.06s' }}>
                    <div className="card-icons">
                      <img src="/Icons/Mysql icon.png" alt="MySQL" />
                    </div>
                    <h3 className="card-title">Database Management & Systems</h3>
                    <p className="card-desc">Designing relational database schemas with MySQL, query optimization, data normalization, and secure data storage management.</p>
                  </div>

                  {/* 3. Programming Languages */}
                  <div className="skill-card" style={{ animationDelay: '0.12s' }}>
                    <div className="card-icons">
                      <img src="/Icons/Python icon.png" alt="Python" />
                      <img src="/Icons/C icon.svg" alt="C Language" />
                      <img src="/Icons/Js icon.webp" alt="JavaScript" />
                    </div>
                    <h3 className="card-title">Programming Languages</h3>
                    <p className="card-desc">Proficient in Python, C, Java, and SQL for algorithmic problem solving, scientific computing, and writing clean, scalable software.</p>
                  </div>

                  {/* 4. Web & Information Retrieval */}
                  <div className="skill-card" style={{ animationDelay: '0.18s' }}>
                    <div className="card-icons">
                      <img src="/Icons/Python icon.png" alt="Flask" />
                      <img src="/Icons/Html icon.png" alt="HTML" />
                      <img src="/Icons/Css icon.png" alt="CSS" />
                      <img src="/Icons/React.png" alt="React" />
                    </div>
                    <h3 className="card-title">Web & Information Retrieval</h3>
                    <p className="card-desc">Developing lightweight Flask web services, TF-IDF search indexing, cosine similarity ranking, and clean web interfaces.</p>
                  </div>

                  {/* 5. Development Tools & Workflow */}
                  <div className="skill-card" style={{ animationDelay: '0.24s' }}>
                    <div className="card-icons">
                      <img src="/Icons/Vs Code logo.png" alt="VS Code" />
                      <img src="/Icons/Git icon.svg" alt="Git" />
                      <img src="/Icons/Github icon.svg" alt="GitHub" />
                      <img src="/Icons/Postman icon.svg" alt="Postman" />
                      <img src="/Icons/Canva icon.svg" alt="Canva" />
                    </div>
                    <h3 className="card-title">Development Tools & Workflow</h3>
                    <p className="card-desc">Git version control, collaborative GitHub workflows, API verification with Postman, and modern IDE development environments.</p>
                  </div>

                  {/* 6. AI & Predictive Modeling */}
                  <div className="skill-card" style={{ animationDelay: '0.3s' }}>
                    <div className="card-icons">
                      <img src="/Icons/Gemini icon.svg" alt="Gemini AI" />
                      <img src="/Icons/Claude icon.svg" alt="Claude AI" />
                      <img src="/Icons/Chatgpt icon.png" alt="ChatGPT" />
                    </div>
                    <h3 className="card-title">AI & Predictive Modeling</h3>
                    <p className="card-desc">Building machine learning workflows with scikit-learn, statistical modeling, and integrating Google Gemini and Vertex AI for intelligent systems.</p>
                  </div>

                  {/* 7. Computer Science Foundations */}
                  <div className="skill-card" style={{ animationDelay: '0.36s' }}>
                    <div className="card-tags">
                      <span className="card-tag">Data Structures</span>
                      <span className="card-tag">Algorithms</span>
                      <span className="card-tag">LeetCode Problem Solving</span>
                      <span className="card-tag">OOP</span>
                      <span className="card-tag">DBMS</span>
                      <span className="card-tag">Operating Systems</span>
                    </div>
                    <h3 className="card-title">Computer Science Foundations</h3>
                    <p className="card-desc">Rigorous foundation in algorithm design, object-oriented principles, and systems engineering.</p>
                  </div>

                  {/* 8. Scientific & Numerical Research */}
                  <div className="skill-card" style={{ animationDelay: '0.42s' }}>
                    <div className="card-icons">
                      <img src="/Images/iisc.png" alt="IISc" style={{ borderRadius: '50%', objectFit: 'contain' }} />
                    </div>
                    <h3 className="card-title">Scientific & Numerical Research</h3>
                    <p className="card-desc">Algorithm simulations in Python for Numerical Analysis (Newton's method, piecewise interpolation) and QSAR predictive modeling (IISc).</p>
                  </div>

                  {/* 9. Leadership & Community */}
                  <div className="skill-card" style={{ animationDelay: '0.48s' }}>
                    <div className="card-tags">
                      <span className="card-tag">Student Placement Coordinator</span>
                      <span className="card-tag">Hackathon Competitor</span>
                      <span className="card-tag">Tech Wizard Club</span>
                      <span className="card-tag">Git Seminar Lead</span>
                      <span className="card-tag">Analytical Thinking</span>
                    </div>
                    <h3 className="card-title">Leadership & Community</h3>
                    <p className="card-desc">Demonstrated campus leadership as placement coordinator, technical mentor for junior students, and active hackathon member.</p>
                  </div>
                </div>
              </div>

              {/* 3. PROFESSIONAL ENDING FOOTER */}
              <div className="skills-footer">
                <div className="footer-top">
                  <p className="footer-subtitle">That's all for now.</p>
                  <h2 className="footer-title">Have a project or opportunity in mind?<br />Let's connect</h2>
                </div>

                <div className="footer-divider-container">
                  <div className="footer-divider-line"></div>
                  <button className="footer-get-in-touch-btn" onClick={() => handleNavClick('Contact')}>
                    Get in touch
                  </button>
                </div>

                <div className="footer-bottom">
                  <div className="footer-contact-item">
                    <span className="footer-contact-label">Email:</span>
                    <a href="mailto:ranjanadevi.180264@gmail.com" className="footer-contact-value">ranjanadevi.180264@gmail.com</a>
                  </div>
                  <div className="footer-contact-item">
                    <span className="footer-contact-label">Phone:</span>
                    <a href="tel:+919176317764" className="footer-contact-value">(+91) 9176317764</a>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'About' ? (
            <div className="journey-page-container" onScroll={handleJourneyScroll}>
              <div className="journey-scroll-track" style={{ height: '5200px' }}>
                <div className="journey-sticky-viewport">

                  {/* 1. HERO INTRO VIEW */}
                  <div
                    className="journey-sticky-section quotes-section"
                    style={{
                      opacity: qOpacity,
                      transform: `scale(${qScale})`,
                      visibility: qOpacity === 0 ? 'hidden' : 'visible',
                      pointerEvents: qOpacity === 0 ? 'none' : 'auto'
                    }}
                  >
                    <div className="skills-tagline">
                      Every dataset has a story; <br />
                      every model bridges data to decision.
                    </div>

                    <h1 className="skills-main-title">
                      The Journal of an Engineer <br />
                      Driven by Data & AI
                    </h1>

                    <div className="skills-quote">
                      This is the Timeline from <br />
                      Academics to Research & Industry.
                    </div>

                    <div className="scroll-indicator">
                      <span>Scroll to explore</span>
                      <div className="indicator-arrow"></div>
                    </div>
                  </div>

                  {/* 2. EDUCATION TIMELINE MAP */}
                  <div
                    className="journey-sticky-section education-section"
                    style={{
                      opacity: edOpacity,
                      transform: `scale(${edScale})`,
                      visibility: edOpacity === 0 ? 'hidden' : 'visible',
                      pointerEvents: edOpacity === 0 ? 'none' : 'auto'
                    }}
                  >
                    <div
                      className="journey-minimal-content"
                      style={{
                        transform: `translateY(${timelineTranslateY}px)`,
                        transition: 'transform 0.1s ease-out'
                      }}
                    >
                      <h2
                        className="journey-title-minimal"
                        style={{
                          opacity: edHeaderOpacity,
                          transform: `translateY(${edHeaderTranslateY}vh) scale(${0.9 + edHeaderOpacity * 0.1})`,
                          transition: 'opacity 0.1s ease, transform 0.1s ease'
                        }}
                      >
                        Educational Qualification
                      </h2>
                      <div className="journey-timeline-map">
                        <div
                          className="journey-timeline-line"
                          style={{
                            opacity: edLineOpacity,
                            transition: 'opacity 0.1s ease'
                          }}
                        ></div>

                        {/* College */}
                        <div
                          className="journey-timeline-grid"
                          style={{
                            opacity: edItem1Opacity,
                            transform: `translateY(${edItem1Translate}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease'
                          }}
                        >
                          <div className="timeline-badge-group left-align">
                            <span className="timeline-year">2023 - Present (Exp. 2027)</span>
                            <div className="timeline-circle-badge orange-theme">
                              <img src="/Images/wec.jpg" alt="Women's Engineering College" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <div className="timeline-connector-line"></div>
                          </div>
                          <div className="timeline-center-node orange-theme">
                            <div className="timeline-dot-inner"></div>
                          </div>
                          <div className="timeline-text-content right-align">
                            <h3 className="timeline-item-title">Bachelor of Technology in Information Science Engineering</h3>
                            <p className="timeline-item-institution">Women's Engineering College, Puducherry</p>
                            <p className="timeline-item-details">CGPA : 9.12 / 10.00 | Student Placement Coordinator</p>
                          </div>
                        </div>

                        {/* 12th Grade */}
                        <div
                          className="journey-timeline-grid alternate"
                          style={{
                            opacity: edItem2Opacity,
                            transform: `translateY(${edItem2Translate}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease'
                          }}
                        >
                          <div className="timeline-text-content left-align">
                            <h3 className="timeline-item-title">Higher Secondary Education (Class XII - CBSE)</h3>
                            <p className="timeline-item-institution">Aditya Vidyashram, Puducherry</p>
                            <p className="timeline-item-details">Passed out Year: 2023 | Percentage : 81%</p>
                          </div>
                          <div className="timeline-center-node teal-theme">
                            <div className="timeline-dot-inner"></div>
                          </div>
                          <div className="timeline-badge-group right-align">
                            <div className="timeline-connector-line"></div>
                            <div className="timeline-circle-badge teal-theme">
                              <img src="/Images/avrs.jpg" alt="Aditya Vidyashram" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <span className="timeline-year">2022 - 2023</span>
                          </div>
                        </div>

                        {/* 10th Grade */}
                        <div
                          className="journey-timeline-grid"
                          style={{
                            opacity: edItem3Opacity,
                            transform: `translateY(${edItem3Translate}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease'
                          }}
                        >
                          <div className="timeline-badge-group left-align">
                            <span className="timeline-year">2020 - 2021</span>
                            <div className="timeline-circle-badge blue-theme">
                              <img src="/Images/avrs.jpg" alt="Aditya Vidyashram" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <div className="timeline-connector-line"></div>
                          </div>
                          <div className="timeline-center-node blue-theme">
                            <div className="timeline-dot-inner"></div>
                          </div>
                          <div className="timeline-text-content right-align">
                            <h3 className="timeline-item-title">Secondary Education (Class X - CBSE)</h3>
                            <p className="timeline-item-institution">Aditya Vidyashram, Puducherry</p>
                            <p className="timeline-item-details">Passed out Year: 2021 | Percentage : 87%</p>
                          </div>
                        </div>
                      </div>

                      {/* Certifications Section */}
                      <div className="journey-certifications">
                        <h2
                          className="journey-title-minimal"
                          style={{
                            opacity: certHeaderOpacity,
                            transform: `translateY(${certHeaderTranslateY}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease',
                            visibility: certHeaderOpacity === 0 ? 'hidden' : 'visible'
                          }}
                        >
                          Certifications
                        </h2>

                        <div className="cert-cards-container">
                          {/* Card 1 */}
                          <div
                            className="cert-card"
                            style={{
                              opacity: certCard1Opacity,
                              transform: `translateY(${certCard1TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: certCard1Opacity === 0 ? 'hidden' : 'visible'
                            }}
                          >
                            <div className="cert-card-icon">
                              <img src="/Icons/linkedin-learning.svg" alt="LinkedIn Learning" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="cert-card-title">Power BI: Dashboards for Beginners</h3>
                            <p className="cert-card-issuer">LinkedIn Learning (2026)</p>
                            <p className="cert-card-desc">Mastered dynamic business intelligence reporting, data modeling, custom DAX measures, and cross-filtering analytical dashboard views.</p>
                            <a
                              href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/"
                              target="_blank"
                              rel="noreferrer"
                              className="cert-credential-btn"
                            >
                              Show credentials
                            </a>
                          </div>

                          {/* Card 2 */}
                          <div
                            className="cert-card"
                            style={{
                              opacity: certCard2Opacity,
                              transform: `translateY(${certCard2TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: certCard2Opacity === 0 ? 'hidden' : 'visible'
                            }}
                          >
                            <div className="cert-card-icon">
                              <img src="/Icons/Python icon.png" alt="FITA Academy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="cert-card-title">Data Analytics (Python, SQL, Power BI)</h3>
                            <p className="cert-card-issuer">FITA Academy</p>
                            <p className="cert-card-desc">Comprehensive certification in relational SQL database management, Python exploratory data analysis (Pandas & NumPy), and Power BI reporting.</p>
                            <a
                              href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/"
                              target="_blank"
                              rel="noreferrer"
                              className="cert-credential-btn"
                            >
                              Show credentials
                            </a>
                          </div>

                          {/* Card 3 */}
                          <div
                            className="cert-card"
                            style={{
                              opacity: certCard3Opacity,
                              transform: `translateY(${certCard3TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: certCard3Opacity === 0 ? 'hidden' : 'visible'
                            }}
                          >
                            <div className="cert-card-icon">
                              <img src="/Icons/Gemini icon.svg" alt="SAWIT.AI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="cert-card-title">Fundamentals of Generative AI</h3>
                            <p className="cert-card-issuer">SAWIT.AI Learnathon (GUVI, AICTE)</p>
                            <p className="cert-card-desc">Gained foundational mastery of LLM architectures, generative AI paradigms, prompt design, and practical AI workflow development.</p>
                            <a
                              href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/"
                              target="_blank"
                              rel="noreferrer"
                              className="cert-credential-btn"
                            >
                              Show credentials
                            </a>
                          </div>

                          {/* Card 4 */}
                          <div
                            className="cert-card"
                            style={{
                              opacity: certCard4Opacity,
                              transform: `translateY(${certCard4TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: certCard4Opacity === 0 ? 'hidden' : 'visible'
                            }}
                          >
                            <div className="cert-card-icon">
                              <img src="/Icons/nptel.svg" alt="NPTEL" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="cert-card-title">Programming, Data Structures & Algorithms</h3>
                            <p className="cert-card-issuer">NPTEL</p>
                            <p className="cert-card-desc">Rigorous academic curriculum covering algorithmic complexity, sorting, searching, recursion, and core data structure implementations using Python.</p>
                            <a
                              href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/"
                              target="_blank"
                              rel="noreferrer"
                              className="cert-credential-btn"
                            >
                              Show credentials
                            </a>
                          </div>

                          {/* Card 5 */}
                          <div
                            className="cert-card"
                            style={{
                              opacity: certCard5Opacity,
                              transform: `translateY(${certCard5TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: certCard5Opacity === 0 ? 'hidden' : 'visible'
                            }}
                          >
                            <div className="cert-card-icon">
                              <img src="/Icons/guvi.svg" alt="GUVI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="cert-card-title">Python Programming</h3>
                            <p className="cert-card-issuer">GUVI (HCL Group)</p>
                            <p className="cert-card-desc">Demonstrated core and advanced Python proficiency, object-oriented concepts, and computational problem solving.</p>
                            <a
                              href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/"
                              target="_blank"
                              rel="noreferrer"
                              className="cert-credential-btn"
                            >
                              Show credentials
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Experience Section */}
                      <div className="journey-experience" style={{ marginTop: '100px', paddingBottom: '100px', width: '100%' }}>
                        <h2
                          className="journey-title-minimal"
                          style={{
                            opacity: expHeaderOpacity,
                            transform: `translateY(${expHeaderTranslateY}px)`,
                            transition: 'opacity 0.1s ease, transform 0.1s ease',
                            visibility: expHeaderOpacity === 0 ? 'hidden' : 'visible',
                            textAlign: 'center'
                          }}
                        >
                          Experience & Internships
                        </h2>

                        <div className="journey-timeline-map" style={{ marginTop: '60px' }}>
                          <div className="journey-timeline-line" style={{ opacity: expHeaderOpacity }}></div>

                          {/* Experience Item 1: IISc */}
                          <div
                            className="journey-timeline-grid"
                            style={{
                              opacity: expItem1Opacity,
                              transform: `translateY(${expItem1TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: expItem1Opacity === 0 ? 'hidden' : 'visible',
                              marginBottom: '50px'
                            }}
                          >
                            <div className="timeline-text-content left-align">
                              <h3 className="timeline-item-title">Data & Research Intern</h3>
                              <p className="timeline-item-institution">Indian Institute of Science (IISc), Bengaluru</p>
                              <div className="timeline-item-details" style={{ marginTop: '15px' }}>
                                <p style={{ margin: 0, color: 'rgba(18, 18, 18, 0.85)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                  Programmed graphical algorithm simulations in Python for Numerical Analysis (Newton's method, fixed points, piecewise interpolation) under Prof. Thirupathi Gudi to model non-linear functional convergence.
                                </p>
                                <p style={{ margin: '8px 0 0 0', color: 'rgba(18, 18, 18, 0.85)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                  Conducted statistical research and presented QSAR (Quantitative Structure-Activity Relationship) predictive models for drug discovery to Principal Research Scientist Dr. Sathishkumar Ranganathan.
                                </p>
                              </div>
                            </div>
                            <div className="timeline-center-node orange-theme">
                              <div className="timeline-dot-inner"></div>
                            </div>
                            <div className="timeline-badge-group right-align">
                              <div className="timeline-connector-line"></div>
                              <div className="timeline-circle-badge orange-theme">
                                <img src="/Images/iisc.png" alt="IISc" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </div>
                              <span className="timeline-year">June 2026 – July 2026</span>
                            </div>
                          </div>

                          {/* Experience Item 2: Deloitte */}
                          <div
                            className="journey-timeline-grid alternate"
                            style={{
                              opacity: expItem2Opacity,
                              transform: `translateY(${expItem2TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: expItem2Opacity === 0 ? 'hidden' : 'visible',
                              marginBottom: '50px'
                            }}
                          >
                            <div className="timeline-badge-group left-align">
                              <span className="timeline-year">2025 | Remote</span>
                              <div className="timeline-circle-badge teal-theme">
                                <img src="/Images/forage.jpg" alt="Deloitte" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                              </div>
                              <div className="timeline-connector-line"></div>
                            </div>
                            <div className="timeline-center-node teal-theme">
                              <div className="timeline-dot-inner"></div>
                            </div>
                            <div className="timeline-text-content right-align">
                              <h3 className="timeline-item-title">Data Analytics [Virtual Internship]</h3>
                              <p className="timeline-item-institution">Deloitte (Forage Platform)</p>
                              <div className="timeline-item-details" style={{ marginTop: '15px' }}>
                                <p style={{ margin: 0, color: 'rgba(18, 18, 18, 0.85)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                  Cleaned, analysed, and visualised real-world datasets to simulate a client analytics engagement. Built insight dashboards using Python, producing actionable business recommendations across full project lifecycles.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Experience Item 3: Aravind Eye Hospital */}
                          <div
                            className="journey-timeline-grid"
                            style={{
                              opacity: expItem3Opacity,
                              transform: `translateY(${expItem3TranslateY}px)`,
                              transition: 'opacity 0.1s ease, transform 0.1s ease',
                              visibility: expItem3Opacity === 0 ? 'hidden' : 'visible',
                              marginBottom: 0
                            }}
                          >
                            <div className="timeline-text-content left-align">
                              <h3 className="timeline-item-title">Healthcare IT Intern</h3>
                              <p className="timeline-item-institution">Aravind Eye Hospital, Puducherry</p>
                              <div className="timeline-item-details" style={{ marginTop: '15px' }}>
                                <p style={{ margin: 0, color: 'rgba(18, 18, 18, 0.85)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                  Proposed an Aadhaar QR scanning solution to auto-fill patient registration, cutting manual entry time. Mapped healthcare data workflows and identified critical system bottlenecks.
                                </p>
                              </div>
                            </div>
                            <div className="timeline-center-node blue-theme">
                              <div className="timeline-dot-inner"></div>
                            </div>
                            <div className="timeline-badge-group right-align">
                              <div className="timeline-connector-line"></div>
                              <div className="timeline-circle-badge blue-theme">
                                <img src="/Images/aravind.jpg" alt="Aravind Eye Hospital" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                              </div>
                              <span className="timeline-year">Puducherry, India</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. JOURNEY ENDING FOOTER */}
                      <div
                        className="journey-footer"
                        style={{
                          opacity: journeyFooterOpacity,
                          transform: `translateY(${journeyFooterTranslateY}px)`,
                          transition: 'opacity 0.1s ease, transform 0.1s ease',
                          visibility: journeyFooterOpacity === 0 ? 'hidden' : 'visible'
                        }}
                      >
                        <div className="footer-top">
                          <p className="footer-subtitle">THAT'S ALL FOR NOW.</p>
                          <h2 className="footer-title">Got an opportunity in mind?<br />Let's talk</h2>
                        </div>

                        <div className="footer-divider-container">
                          <div className="footer-divider-line"></div>
                          <button className="footer-get-in-touch-btn" onClick={() => handleNavClick('Contact')}>
                            Get in touch
                          </button>
                        </div>

                        <div className="footer-bottom">
                          <div className="footer-contact-item">
                            <span className="footer-contact-label">EMAIL</span>
                            <a href="mailto:ranjanadevi.180264@gmail.com" className="footer-contact-value">ranjanadevi.180264@gmail.com</a>
                          </div>
                          <div className="footer-contact-item">
                            <span className="footer-contact-label">PHONE</span>
                            <a href="tel:+919176317764" className="footer-contact-value">(+91) 9176317764</a>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          ) : activeTab === 'Project' ? (
            <div className="projects-page-container">
              <div className="projects-hero-header">
                <div className="projects-section-tag">
                  <Sparkles size={14} /> Featured Portfolio
                </div>
                <h1 className="projects-main-title">Data Science & AI Engineering</h1>
                <p className="projects-subtitle">
                  Selected predictive modeling, business intelligence dashboards, and intelligent search systems engineered with Python, Power BI, and Google Gemini.
                </p>
              </div>

              <div className="projects-cards-grid">
                {/* Project 1: Credit Card Fraud */}
                <div className="project-card-glass">
                  <div>
                    <div className="project-card-top">
                      <span className="project-category-badge">Data Analytics & Power BI</span>
                      <TrendingUp size={20} color="#38bdf8" />
                    </div>
                    <h3 className="project-card-title">Credit Card Fraud Analysis & Dashboard</h3>
                    <p className="project-card-desc">
                      Processed and analyzed 284,807 transactions, conducting Exploratory Data Analysis in Python to surface critical feature anomalies across PCA dimensions (V12, V14, V17) and transaction volume tiers. Built dynamic Power BI dashboards featuring custom DAX measures and cross-filtering down to 3-transaction precision slices.
                    </p>
                    <div className="project-metrics-list">
                      <div className="project-metric-item">
                        <span className="metric-dot"></span>
                        <span><strong>284,807</strong> transactions processed & anomaly analyzed</span>
                      </div>
                      <div className="project-metric-item">
                        <span className="metric-dot"></span>
                        <span>Targeted 3-transaction precision slices via custom DAX</span>
                      </div>
                      <div className="project-metric-item">
                        <span className="metric-dot"></span>
                        <span>PCA dimension isolation (V12, V14, V17)</span>
                      </div>
                    </div>
                    <div className="project-tags-cloud">
                      <span className="project-tech-pill">Python</span>
                      <span className="project-tech-pill">EDA</span>
                      <span className="project-tech-pill">Power BI</span>
                      <span className="project-tech-pill">DAX</span>
                      <span className="project-tech-pill">PCA</span>
                    </div>
                  </div>
                  <div className="project-actions-row">
                    <a
                      href="https://github.com/ranjanadevi1802/CreditCard-Fraud-Detection"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn-primary"
                    >
                      <Github size={16} /> View Code
                    </a>
                  </div>
                </div>

                {/* Project 2: AgroChain */}
                <div className="project-card-glass">
                  <div>
                    <div className="project-card-top">
                      <span className="project-category-badge project-hackathon-badge">Google Solution Challenge 2026</span>
                      <Brain size={20} color="#fbbf24" />
                    </div>
                    <h3 className="project-card-title">AgroChain — AI Supply Chain Platform</h3>
                    <p className="project-card-desc">
                      Developed an AI-driven supply-chain solution to mitigate market price volatility across agricultural buyer networks, competing globally in the Google Solution Challenge 2026 (Google × Hack2Skill). Integrated Gemini LLM and Firebase architecture to deliver sub-second data synchronization and real-time market price evaluation.
                    </p>
                    <div className="project-metrics-list">
                      <div className="project-metric-item">
                        <span className="metric-dot" style={{ background: '#fbbf24' }}></span>
                        <span>Global AI Hackathon competitor worldwide</span>
                      </div>
                      <div className="project-metric-item">
                        <span className="metric-dot" style={{ background: '#fbbf24' }}></span>
                        <span>Sub-second real-time Firebase synchronization</span>
                      </div>
                      <div className="project-metric-item">
                        <span className="metric-dot" style={{ background: '#fbbf24' }}></span>
                        <span>Google Gemini LLM & Vertex AI market valuation</span>
                      </div>
                    </div>
                    <div className="project-tags-cloud">
                      <span className="project-tech-pill">Google Gemini</span>
                      <span className="project-tech-pill">Vertex AI</span>
                      <span className="project-tech-pill">Flutter</span>
                      <span className="project-tech-pill">Firebase</span>
                      <span className="project-tech-pill">LLM</span>
                    </div>
                  </div>
                  <div className="project-actions-row">
                    <a
                      href="https://github.com/ranjanadevi1802/AgroChain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn-primary"
                    >
                      <Github size={16} /> View Code
                    </a>
                  </div>
                </div>

                {/* Project 3: Support Ticket Search System */}
                <div className="project-card-glass">
                  <div>
                    <div className="project-card-top">
                      <span className="project-category-badge">Information Retrieval & NLP</span>
                      <Search size={20} color="#38bdf8" />
                    </div>
                    <h3 className="project-card-title">Support Ticket Search Engine</h3>
                    <p className="project-card-desc">
                      Architected a Flask-based search engine utilizing TF-IDF vectorization, inverted indexing, and cosine similarity ranking to achieve relevant match retrieval across unstructured ticket datasets. Visualized end-to-end IR pipelines to convert natural language queries into transparent, rank-ordered scoring breakdowns.
                    </p>
                    <div className="project-metrics-list">
                      <div className="project-metric-item">
                        <span className="metric-dot"></span>
                        <span>TF-IDF vector space model & inverted index</span>
                      </div>
                      <div className="project-metric-item">
                        <span className="metric-dot"></span>
                        <span>Cosine similarity ranking across unstructured tickets</span>
                      </div>
                      <div className="project-metric-item">
                        <span className="metric-dot"></span>
                        <span>Transparent rank-ordered pipeline scoring</span>
                      </div>
                    </div>
                    <div className="project-tags-cloud">
                      <span className="project-tech-pill">Python</span>
                      <span className="project-tech-pill">Flask</span>
                      <span className="project-tech-pill">TF-IDF</span>
                      <span className="project-tech-pill">NLP</span>
                      <span className="project-tech-pill">Information Retrieval</span>
                    </div>
                  </div>
                  <div className="project-actions-row">
                    <a
                      href="https://github.com/ranjanadevi1802/support-ticket-search"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn-primary"
                    >
                      <Github size={16} /> View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'Resume' ? (
            <div className="resume-page-container">
              <div className="resume-header-bar">
                <div className="resume-header-info">
                  <h1>Curriculum Vitae</h1>
                  <p>Ranjana Devi K • B.Tech Information Science Engineering (9.12 CGPA)</p>
                </div>
                <div className="resume-action-btns">
                  <a
                    href="/RanjanaDevi_Resume.pdf"
                    download="RanjanaDevi_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-download-btn"
                  >
                    <Download size={18} /> Download Resume
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-outline-btn"
                  >
                    <Linkedin size={18} /> LinkedIn Profile
                  </a>
                  <a
                    href="https://leetcode.com/u/Ranjana_18/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-outline-btn"
                  >
                    <Code size={18} /> LeetCode Profile
                  </a>
                </div>
              </div>

              <div className="resume-sheet-card">
                <div className="resume-two-col-grid">
                  {/* Left Column */}
                  <div className="resume-sidebar-col">
                    <div>
                      <h3 className="resume-section-heading">Contact Information</h3>
                      <div className="resume-contact-item">
                        <Mail size={16} color="#38bdf8" />
                        <a href="mailto:ranjanadevi.180264@gmail.com">ranjanadevi.180264@gmail.com</a>
                      </div>
                      <div className="resume-contact-item">
                        <Phone size={16} color="#38bdf8" />
                        <a href="tel:+919176317764">+91 9176317764</a>
                      </div>
                      <div className="resume-contact-item">
                        <MapPin size={16} color="#38bdf8" />
                        <span>Puducherry, India</span>
                      </div>
                      <div className="resume-contact-item">
                        <Github size={16} color="#38bdf8" />
                        <a href="https://github.com/ranjanadevi1802" target="_blank" rel="noreferrer">github.com/ranjanadevi1802</a>
                      </div>
                      <div className="resume-contact-item">
                        <Linkedin size={16} color="#38bdf8" />
                        <a href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/" target="_blank" rel="noreferrer">linkedin.com/in/ranjana-devi-k</a>
                      </div>
                    </div>

                    <div>
                      <h3 className="resume-section-heading">Technical Skills</h3>
                      <div className="resume-skill-group">
                        <h4>Languages</h4>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>Python, C, Java, SQL</p>
                      </div>
                      <div className="resume-skill-group">
                        <h4>Libraries & Frameworks</h4>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>Flask, Pandas, NumPy, scikit-learn</p>
                      </div>
                      <div className="resume-skill-group">
                        <h4>Tools & Platforms</h4>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>Power BI, DAX, GitHub, VS Code, Firebase, Vertex AI, Canva</p>
                      </div>
                      <div className="resume-skill-group">
                        <h4>Core CS Concepts</h4>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>DSA, OOP, DBMS, Information Retrieval, AI/ML Fundamentals, Agentic AI</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="resume-section-heading">Leadership & Community</h3>
                      <ul className="resume-entry-bullets">
                        <li>Student Placement Coordinator</li>
                        <li>Hackathon and Innovation Club Member</li>
                        <li>Tech Wizard Club Member</li>
                        <li>Conducted workshop on Git & GitHub tools for juniors</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="resume-main-col">
                    <div>
                      <h3 className="resume-section-heading">Summary</h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                        Data Analytics & AI Engineering student with a <strong>9.12 CGPA</strong>, hands-on experience in statistical modeling and machine learning workflows, and a track record of building end-to-end data-driven solutions. Designed and deployed predictive systems including an AI-powered agricultural transparency platform using Google Gemini and Vertex AI, alongside customized vector search engines.
                      </p>
                    </div>

                    <div>
                      <h3 className="resume-section-heading">Internships & Research</h3>
                      <div className="resume-timeline-entry">
                        <div className="resume-entry-header">
                          <span className="resume-entry-title">Indian Institute of Science (IISc)</span>
                          <span className="resume-entry-date">June 2026 – July 2026</span>
                        </div>
                        <div className="resume-entry-sub">Data & Research Intern • Bengaluru, India</div>
                        <ul className="resume-entry-bullets">
                          <li>Programmed graphical algorithm simulations in Python for Numerical Analysis (Newton's method, fixed points, piecewise interpolation) under Prof. Thirupathi Gudi to model non-linear functional convergence.</li>
                          <li>Conducted statistical research and presented QSAR (Quantitative Structure-Activity Relationship) predictive models for drug discovery to Principal Research Scientist Dr. Sathishkumar Ranganathan.</li>
                        </ul>
                      </div>

                      <div className="resume-timeline-entry">
                        <div className="resume-entry-header">
                          <span className="resume-entry-title">Deloitte Virtual Internship</span>
                          <span className="resume-entry-date">2025</span>
                        </div>
                        <div className="resume-entry-sub">Data Analytics • Remote (Forage Platform)</div>
                        <ul className="resume-entry-bullets">
                          <li>Cleaned, analysed, and visualised real-world client datasets to simulate a professional analytics engagement.</li>
                          <li>Built insight dashboards using Python, producing actionable business recommendations and stakeholder-ready reports.</li>
                        </ul>
                      </div>

                      <div className="resume-timeline-entry">
                        <div className="resume-entry-header">
                          <span className="resume-entry-title">Aravind Eye Hospital</span>
                          <span className="resume-entry-date">Puducherry, India</span>
                        </div>
                        <div className="resume-entry-sub">Healthcare IT Intern</div>
                        <ul className="resume-entry-bullets">
                          <li>Proposed an Aadhaar QR scanning solution to auto-fill patient registration, cutting manual entry time.</li>
                          <li>Mapped healthcare data workflows and identified critical bottlenecks in hospital information systems.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="resume-section-heading">Education</h3>
                      <div className="resume-timeline-entry">
                        <div className="resume-entry-header">
                          <span className="resume-entry-title">Women's Engineering College, Puducherry</span>
                          <span className="resume-entry-date">Expected 2027</span>
                        </div>
                        <div className="resume-entry-sub">B.Tech Information Science Engineering • <strong>CGPA: 9.12 / 10.00</strong></div>
                      </div>
                      <div className="resume-timeline-entry">
                        <div className="resume-entry-header">
                          <span className="resume-entry-title">Aditya Vidyashram, Puducherry</span>
                          <span className="resume-entry-date">2022 – 2023</span>
                        </div>
                        <div className="resume-entry-sub">Class XII (CBSE) • <strong>81%</strong></div>
                      </div>
                      <div className="resume-timeline-entry">
                        <div className="resume-entry-header">
                          <span className="resume-entry-title">Aditya Vidyashram, Puducherry</span>
                          <span className="resume-entry-date">2020 – 2021</span>
                        </div>
                        <div className="resume-entry-sub">Class X (CBSE) • <strong>87%</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'Contact' ? (
            <div className="contact-page-container" onMouseMove={handleContactMouseMove}>
              <div className="contact-mouse-glow" ref={contactGlowRef}></div>
              <div className="contact-card-wrapper">
                {/* Left Side: Contact Info Panel */}
                <div className="contact-info-panel">
                  <h2 className="contact-info-title stagger-fade-in" style={{ animationDelay: '0.2s' }}>Let's Connect & Collaborate</h2>
                  <p className="contact-info-desc stagger-fade-in" style={{ animationDelay: '0.3s' }}>
                    Whether you have an internship opportunity, a data science project, or want to discuss machine learning, I'd love to hear from you.
                  </p>

                  <div className="contact-info-block stagger-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="contact-icon-circle">
                      <Mail size={20} />
                    </div>
                    <div className="contact-info-text">
                      <span className="contact-info-label">EMAIL ME</span>
                      <a href="mailto:ranjanadevi.180264@gmail.com" className="contact-info-value">
                        ranjanadevi.180264@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-info-block stagger-fade-in" style={{ animationDelay: '0.45s' }}>
                    <div className="contact-icon-circle">
                      <Phone size={20} />
                    </div>
                    <div className="contact-info-text">
                      <span className="contact-info-label">PHONE</span>
                      <a href="tel:+919176317764" className="contact-info-value">
                        (+91) 9176317764
                      </a>
                    </div>
                  </div>

                  <div className="contact-info-block stagger-fade-in" style={{ animationDelay: '0.48s' }}>
                    <div className="contact-icon-circle">
                      <MapPin size={20} />
                    </div>
                    <div className="contact-info-text">
                      <span className="contact-info-label">LOCATION</span>
                      <span className="contact-info-value">
                        Puducherry, India
                      </span>
                    </div>
                  </div>

                  <div className="contact-follow-block stagger-fade-in" style={{ animationDelay: '0.5s' }}>
                    <span className="contact-follow-label">PROFILES & WORK</span>
                    <div className="contact-social-row">
                      <a href="https://github.com/ranjanadevi1802" target="_blank" rel="noopener noreferrer" className="social-icon-circle" title="GitHub">
                        <Github size={18} />
                      </a>
                      <a href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/" target="_blank" rel="noopener noreferrer" className="social-icon-circle" title="LinkedIn">
                        <Linkedin size={18} />
                      </a>
                      <a href="https://leetcode.com/u/Ranjana_18/" target="_blank" rel="noopener noreferrer" className="social-icon-circle" title="LeetCode">
                        <Code size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Contact Form Panel */}
                <div className="contact-form-panel">
                  {!contactIsSent ? (
                    <form
                      className="contact-split-form"
                      onSubmit={async (e) => {
                        e.preventDefault()
                        if (contactName.trim() && contactEmail.trim() && contactSubject.trim() && contactMessage.trim()) {
                          setIsSubmitting(true)
                          try {
                            const res = await fetch("https://api.web3forms.com/submit", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                              },
                              body: JSON.stringify({
                                access_key: "f70dde7f-73c2-4b1d-a8a6-dda22bc21ca8",
                                name: contactName,
                                email: contactEmail,
                                subject: contactSubject,
                                message: contactMessage,
                              }),
                            })
                            const result = await res.json()
                            if (result.success) {
                              setContactIsSent(true)
                            } else {
                              // Fallback direct mailto if key is expired/unregistered
                              window.location.href = `mailto:ranjanadevi.180264@gmail.com?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent("From: " + contactName + " (" + contactEmail + ")\n\n" + contactMessage)}`
                              setContactIsSent(true)
                            }
                          } catch (error) {
                            console.error(error)
                            window.location.href = `mailto:ranjanadevi.180264@gmail.com?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent("From: " + contactName + " (" + contactEmail + ")\n\n" + contactMessage)}`
                            setContactIsSent(true)
                          } finally {
                            setIsSubmitting(false)
                          }
                        }
                      }}
                    >
                      <div className="form-row-half">
                        <div className="form-group stagger-fade-in" style={{ animationDelay: '0.3s' }}>
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-input-field"
                            placeholder="Your Name"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group stagger-fade-in" style={{ animationDelay: '0.4s' }}>
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-input-field"
                            placeholder="your.email@example.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group full-width stagger-fade-in" style={{ animationDelay: '0.5s' }}>
                        <label className="form-label">Subject</label>
                        <input
                          type="text"
                          className="form-input-field"
                          placeholder="Internship / Project Discussion"
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group full-width stagger-fade-in" style={{ animationDelay: '0.6s' }}>
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-input-field form-textarea-field"
                          placeholder="Tell me about your opportunity or project..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <button type="submit" className="contact-submit-btn stagger-fade-in" style={{ animationDelay: '0.7s' }} disabled={isSubmitting}>
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        {!isSubmitting && (
                          <svg viewBox="0 0 24 24" className="icon-svg-plane">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
                          </svg>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="contact-success-view">
                      <div className="success-icon-badge">
                        <CheckCircle2 size={36} color="#38bdf8" />
                      </div>
                      <h3 className="success-title">Message Transmitted!</h3>
                      <p className="success-desc">
                        Thank you, <strong>{contactName}</strong>! Your message regarding <em>"{contactSubject}"</em> has been received. I will respond to <strong>{contactEmail}</strong> as soon as possible.
                      </p>
                      <button
                        className="success-reset-btn"
                        onClick={() => {
                          setContactName('')
                          setContactEmail('')
                          setContactSubject('')
                          setContactMessage('')
                          setContactIsSent(false)
                        }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="home-scroll-track" onScroll={(e) => setHomeScrollTop(e.target.scrollTop)}>
              <div className="home-sticky-viewport">

                {/* The Cinematic Container */}
                <div className="center-container" style={{ opacity: homeMainOpacity, transition: 'opacity 0.2s ease-out' }}>
                  <div className="background-ticker-container" style={{ transform: `scale(${homeTickerScale})`, transformOrigin: 'center center', marginTop: '-12vh', transition: 'transform 0.2s ease-out' }}>
                    <div className="background-ticker ticker-left">
                      <div className="ticker-track">
                        <span className="ticker-item color-white">DATA ANALYST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">AI ENGINEER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">MACHINE LEARNING</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">DATA SCIENTIST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">RESEARCHER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">DATA ANALYST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">AI ENGINEER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">MACHINE LEARNING</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">DATA SCIENTIST</span>
                        <span className="ticker-bullet">•</span>
                      </div>
                    </div>
                    <div className="background-ticker ticker-right">
                      <div className="ticker-track">
                        <span className="ticker-item color-black">DATA ANALYST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">AI ENGINEER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">MACHINE LEARNING</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">DATA SCIENTIST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">RESEARCHER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">DATA ANALYST</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">AI ENGINEER</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-white">MACHINE LEARNING</span>
                        <span className="ticker-bullet">•</span>
                        <span className="ticker-item color-black">DATA SCIENTIST</span>
                        <span className="ticker-bullet">•</span>
                      </div>
                    </div>
                  </div>

                  <div className="animate-fade-in-up" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'absolute', bottom: 0, zIndex: 10 }}>
                    <img
                      src="/Images/home.png"
                      alt="Ranjana Devi K"
                      className="centered-image"
                      style={{
                        opacity: homeImageOpacity,
                        transform: `scale(${homeImageScale}) translateY(${homeImageTranslateY}px)`,
                        transformOrigin: 'bottom center',
                        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </div>

                {/* The About Canvas (3-Column Layout) */}
                <div
                  className="about-split-layout"
                  style={{
                    opacity: aboutImageOpacity,
                    pointerEvents: aboutImageOpacity > 0 ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease-out',
                    transform: `translateY(${50 * (1 - aboutImageOpacity)}px)`
                  }}
                >
                  {/* LEFT COLUMN */}
                  <div className="about-content-left">
                    <div className="about-section-label" style={{ opacity: stagger1, transform: `translateY(${20 * (1 - stagger1)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      ABOUT ME <span className="label-line"></span>
                    </div>

                    <h1 className="about-name-title" style={{ opacity: stagger1, transform: `translateY(${20 * (1 - stagger1)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>Ranjana<br />Devi K</h1>

                    <h3 className="about-subtitle" style={{ opacity: stagger2, transform: `translateY(${20 * (1 - stagger2)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>AI Engineer • Data Analytics Specialist • ML Researcher</h3>

                    <p className="about-description" style={{ opacity: stagger2, transform: `translateY(${20 * (1 - stagger2)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      Data Analytics & AI Engineering student with a 9.12 CGPA, hands-on experience in statistical modeling and machine learning workflows, and a track record of building end-to-end data-driven solutions. Experienced in deploying predictive systems with Google Gemini, Vertex AI, custom vector search engines, and exploratory data analysis.
                    </p>

                    <div className="about-action-row" style={{ opacity: stagger3, transform: `translateY(${20 * (1 - stagger3)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      <button className="btn-dark" onClick={() => handleNavClick('Project')}>
                        <Briefcase size={18} /> View Projects
                      </button>
                    </div>

                    <div className="about-divider" style={{ opacity: stagger3, transition: 'opacity 0.2s' }}></div>

                    <div className="about-connect-label" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>Connect with me</div>

                    <div className="about-social-row" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      <a href="https://github.com/ranjanadevi1802" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub"><Github size={20} /></a>
                      <a href="https://www.linkedin.com/in/ranjana-devi-k-b972013a9/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn"><Linkedin size={20} /></a>
                      <a href="https://leetcode.com/u/Ranjana_18/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LeetCode"><Code size={20} /></a>
                      <a href="mailto:ranjanadevi.180264@gmail.com" className="social-icon-btn" title="Email"><Mail size={20} /></a>

                      <div className="status-pill">
                        <span className="status-dot"></span> Available for Internship
                      </div>
                    </div>
                  </div>

                  {/* CENTER COLUMN (Portrait) */}
                  <div className="about-image-center">
                    <img src="/Images/about.png" alt="Ranjana Devi K" className="about-portrait-bw" />
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="about-content-right">
                    <div className="about-section-label" style={{ opacity: stagger1, transform: `translateY(${20 * (1 - stagger1)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      WHAT I DO <span className="label-line"></span>
                    </div>

                    <div className="what-i-do-stack">
                      <div className="neumorphic-card row-card" style={{ opacity: stagger2, transform: `translateY(${20 * (1 - stagger2)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><Brain size={20} /></div>
                        <div className="card-text">
                          <h4>AI & Machine Learning</h4>
                          <p>Building predictive models, GenAI systems, and Gemini/Vertex AI integrations.</p>
                        </div>
                      </div>
                      <div className="neumorphic-card row-card" style={{ opacity: stagger2, transform: `translateY(${20 * (1 - stagger2)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><BarChart size={20} /></div>
                        <div className="card-text">
                          <h4>Data Analytics & Power BI</h4>
                          <p>Dynamic Power BI dashboards, DAX queries, and exploratory data analysis.</p>
                        </div>
                      </div>
                      <div className="neumorphic-card row-card" style={{ opacity: stagger3, transform: `translateY(${20 * (1 - stagger3)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><Code size={20} /></div>
                        <div className="card-text">
                          <h4>Statistical Research</h4>
                          <p>Numerical algorithm simulations and QSAR predictive modeling at IISc.</p>
                        </div>
                      </div>
                      <div className="neumorphic-card row-card" style={{ opacity: stagger3, transform: `translateY(${20 * (1 - stagger3)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><Database size={20} /></div>
                        <div className="card-text">
                          <h4>Information Retrieval</h4>
                          <p>Vector search engines, TF-IDF ranking, inverted indexing, and DBMS.</p>
                        </div>
                      </div>
                    </div>

                    <div className="about-section-label" style={{ marginTop: '25px', opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                      AT A GLANCE <span className="label-line"></span>
                    </div>

                    <div className="glance-grid">
                      <div className="neumorphic-card grid-card" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><Award size={18} /></div>
                        <div className="card-text">
                          <h4>9.12</h4>
                          <p>CGPA</p>
                        </div>
                      </div>
                      <div className="neumorphic-card grid-card" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><BarChart size={18} /></div>
                        <div className="card-text">
                          <h4>284k+</h4>
                          <p>Records Analyzed</p>
                        </div>
                      </div>
                      <div className="neumorphic-card grid-card" style={{ opacity: stagger4, transform: `translateY(${20 * (1 - stagger4)}px)`, transition: 'opacity 0.2s, transform 0.2s' }}>
                        <div className="card-icon-wrapper"><GraduationCap size={18} /></div>
                        <div className="card-text">
                          <h4>B.Tech ISE</h4>
                          <p>2027 Passout</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
