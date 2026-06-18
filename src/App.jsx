import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaExternalLinkAlt,
  FaDownload,
  FaArrowRight,
  FaPaperPlane,
  FaLaptopCode,
  FaCheckCircle,
  FaCode,
  FaLightbulb,
  FaUserAstronaut,
  FaHtml5,
  FaCss3Alt
} from 'react-icons/fa'
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiFirebase,
  SiGit,
  SiFlutter
} from 'react-icons/si'

import picImg from './assets/pic.webp'
import pictImg from './assets/pict.webp'
import heroProfileImg from './assets/Untitled design (2).webp'
import uniletImg from './assets/uniletimg.webp'
import motosImg from './assets/motosimg.webp'
import leoImg from './assets/Leoimg.webp'
import huntingImg from './assets/huntingimg.webp'
import familyImg from './assets/familyimg.webp'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [skillsFilter, setSkillsFilter] = useState('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [copiedText, setCopiedText] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const sectionsRef = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    education: useRef(null),
    achievements: useRef(null),
    contact: useRef(null)
  }

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Mouse Follow Glow Effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Highlight active nav link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      for (const section in sectionsRef) {
        const ref = sectionsRef[section].current
        if (ref) {
          const offsetTop = ref.offsetTop
          const offsetHeight = ref.offsetHeight
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Contact form handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSending(true)
    setSendError('')

    // ── EmailJS credentials ──────────────────────────────────────────
    // 1. Sign up free at https://www.emailjs.com
    // 2. Add an Email Service  → copy the Service ID  below
    // 3. Create an Email Template with variables:
    //      {{from_name}}  {{from_email}}  {{subject}}  {{message}}
    //    and set the template "To Email" to saadshabirmailsi123@gmail.com
    //    → copy the Template ID below
    // 4. Go to Account → API Keys → copy the Public Key below
    // ────────────────────────────────────────────────────────────────
    const SERVICE_ID = 'service_ouez4yk'
    const TEMPLATE_ID = 'template_slz463f'
    const PUBLIC_KEY = 'yDzzHgeXBdx9u14qL'

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || '(No subject)',
      message: formData.message,
    }

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setIsSending(false)
        setFormSubmitted(true)
        setTimeout(() => {
          setFormSubmitted(false)
          setFormData({ name: '', email: '', subject: '', message: '' })
        }, 5000)
      })
      .catch((err) => {
        setIsSending(false)
        setSendError('Something went wrong. Please try again or email me directly.')
        console.error('EmailJS error:', err)
      })
  }

  // Copy to clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(''), 2000)
  }

  const resumeData = {
    name: 'Muhammad Saad',
    role: 'Full Stack Developer',
    email: 'saadshabirmailsi123@gmail.com',
    phone: '0300-0860859',
    location: 'Mailsi, Pakistan',
    githubUrl: 'https://github.com/Saadrao0859',
    about: 'Passionate Full Stack Developer skilled in React, Next.js, JavaScript, HTML, and CSS, Firebase. Focused on creating responsive, user-friendly websites with clean design and efficient code. Eager to learn new technologies and grow in the field of web development.',
    careerObjective: 'To continuously leverage full-stack capabilities, design interactive UI frameworks, improve website loading speeds, and construct modern SaaS applications while preparing for challenging software engineering roles.',
    education: [
      {
        degree: 'BS Computer Science',
        institution: 'The Islamia University of Bahawalpur',
        duration: '2021 – 2025',
        description: "Completed Bachelor's degree in Computer Science with focus on web development, databases, and software design."
      },
      {
        degree: 'Intermediate (ICS)',
        institution: 'Govt. Degree College Mailsi',
        duration: '2020 – 2021',
        description: 'Completed Intermediate in Computer Science with subjects including Computer Science and Mathematics.'
      },
      {
        degree: 'Matriculation (Science)',
        institution: 'Hawks Secondary School System',
        duration: '2018 – 2019',
        description: 'Completed Matriculation in Science with strong foundation in analytical and problem-solving skills.'
      }
    ],
    experience: [
      {
        role: 'Frontend Developer',
        company: 'Hur Tech, Bahawalpur',
        duration: 'Jan 2024 – Jan 2025',
        bullets: [
          'Worked on multiple web projects using React, HTML, CSS, and JavaScript.',
          'Built responsive component structures and styled dashboards for local client projects.'
        ]
      },
      {
        role: 'Full Stack Developer',
        company: 'Aqura Solutions',
        duration: '1 Year Experience',
        bullets: [
          'Developed robust client portals utilizing full-stack solutions and Firebase API wrappers.',
          'Configured responsive dashboards and ensured cross-device layout compatibility.'
        ]
      },
      {
        role: 'Freelance Full Stack Developer',
        company: 'Self-Employed',
        duration: '6 Months Experience',
        bullets: [
          'Focused on creating responsive and user-friendly interfaces.',
          'Collaborated with backend teams for API integration, cloud deployment, and system testing.',
          'Improved website performance, Lighthouse scores, and design system consistency.'
        ]
      }
    ],
    skills: [
      { name: 'React.js', level: 95, category: 'frontend', icon: <SiReact className="text-cyan-400" /> },
      { name: 'Next.js', level: 90, category: 'frontend', icon: <SiNextdotjs className="text-white" /> },
      { name: 'JavaScript (ES6+)', level: 92, category: 'frontend', icon: <SiJavascript className="text-yellow-400" /> },
      { name: 'Tailwind CSS', level: 95, category: 'frontend', icon: <SiTailwindcss className="text-teal-400" /> },
      { name: 'HTML5', level: 98, category: 'frontend', icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS3', level: 94, category: 'frontend', icon: <FaCss3Alt className="text-blue-500" /> },
      { name: 'Responsive Design', level: 96, category: 'frontend', icon: <FaLaptopCode className="text-emerald-400" /> },
      { name: 'UI/UX Implementation', level: 90, category: 'frontend', icon: <FaLightbulb className="text-yellow-300" /> },
      { name: 'Firebase', level: 88, category: 'backend', icon: <SiFirebase className="text-amber-500" /> },
      { name: 'Git & GitHub', level: 92, category: 'backend', icon: <SiGit className="text-red-500" /> },
      { name: 'Problem Solving', level: 88, category: 'backend', icon: <FaCode className="text-indigo-400" /> },
      { name: 'Flutter (Basic)', level: 65, category: 'backend', icon: <SiFlutter className="text-sky-400" /> }
    ],
    projects: [
      {
        title: 'Unilet Advisor',
        tagline: 'Low-Code Platform',
        description: 'A comprehensive low-code advisory platform enabling users to build and manage workflows efficiently. Features an intuitive drag-and-drop interface, dynamic form generation, and robust data management powered by MongoDB.',
        image: uniletImg,
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
        github: 'https://github.com/Saadrao0859',
        demo: '#contact'
      },
      {
        title: 'MotosVinReport',
        tagline: 'Vehicle History Report',
        description: 'A vehicle history reporting platform that delivers detailed VIN-based reports including accident history, ownership records, and mileage verification. Built with a seamless full-stack architecture for real-time data retrieval.',
        image: motosImg,
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
        github: 'https://github.com/Saadrao0859',
        demo: '#contact'
      },
      {
        title: 'Leo Steam Studio',
        tagline: 'Car Wash Booking Website',
        description: 'A modern booking platform for car wash services featuring scheduling workflows, automated reminders, and a polished user experience. Integrates Firebase for real-time availability management and NestJS for backend orchestration.',
        image: leoImg,
        tech: ['Next.js', 'NestJS', 'Workflows', 'Firebase'],
        github: 'https://github.com/Saadrao0859',
        demo: '#contact'
      },
      {
        title: 'Hunting Blogers',
        tagline: 'Blogging Website',
        description: 'A feature-rich blogging platform with dynamic content management, user authentication, SEO-optimized article rendering, and a responsive reading experience designed for content creators and outdoor enthusiasts.',
        image: huntingImg,
        tech: ['Next.js', 'Node.js', 'Express.js', 'MongoDB'],
        github: 'https://github.com/Saadrao0859',
        demo: '#contact'
      },
      {
        title: 'Timeo',
        tagline: 'Family Routine App',
        description: 'A family-focused routine management application that helps households coordinate schedules, assign tasks, and track daily activities. Features real-time sync via Firebase and an intuitive, family-friendly UI.',
        image: familyImg,
        tech: ['React.js', 'Node.js', 'Firebase'],
        github: 'https://github.com/Saadrao0859',
        demo: '#contact'
      }
    ],
    achievements: [
      {
        title: 'Developer of the Quarter',
        issuer: 'Hur Tech Solutions',
        description: 'Awarded for accelerating frontend rendering times by 35% and streamlining codebases through modular React structures.'
      },
      {
        title: 'Academic Milestone',
        issuer: 'The Islamia University of Bahawalpur',
        description: 'Maintained excellent academic standing in the BS Computer Science program with a specialized focus on Database Systems and Modern UI Engineering.'
      },
      {
        title: 'Successful Freelance Implementations',
        issuer: 'Upwork / Fiverr Client Networks',
        description: 'Engineered and delivered custom user-friendly platforms, scoring a perfect success rating for performance, responsive design, and communication.'
      }
    ]
  }

  // Scroll target handler
  const scrollTo = (ref) => {
    setMobileMenuOpen(false)
    if (ref && ref.current) {
      const targetTop = ref.current.getBoundingClientRect().top + window.scrollY - 80
      setTimeout(() => {
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        })
      }, 100)
    }
  }

  // Filter skills
  const filteredSkills = resumeData.skills.filter(skill => {
    if (skillsFilter === 'all') return true
    return skill.category === skillsFilter
  })

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  }

  const cardHoverEffect = {
    hover: {
      y: -6,
      scale: 1.02,
      boxShadow: '0px 12px 30px rgba(0, 210, 255, 0.2)',
      borderColor: 'rgba(0, 210, 255, 0.45)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  return (
    <div className="relative min-h-screen bg-dark-bg text-slate-100 overflow-hidden font-sans selection:bg-neon-blue selection:text-dark-bg">
      {/* Scroll Progress Indicator */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Radial Interactive Background Light */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 210, 255, 0.08), rgba(157, 78, 221, 0.08), transparent 80%)`
        }}
      />

      {/* Floating Background Glow Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none animate-float" />
      <div className="absolute top-[60%] right-[-10%] w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none animate-float-delayed" />
      <div className="absolute bottom-[5%] left-[20%] w-[350px] h-[350px] rounded-full bg-neon-pink/5 blur-[100px] pointer-events-none animate-pulse-slow" />

      {/* Tech Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-30" />

      {/* Sticky Header Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel-heavy border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,210,255,0.4)] group-hover:scale-105 transition-transform duration-300 border border-white/10">
              <img src={picImg} alt="Saad" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-neon-blue bg-clip-text text-transparent group-hover:text-glow-blue transition-all duration-300">
              Muhammad<span className="text-neon-purple">_Saad</span>
            </span>
          </motion.div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center space-x-8">
            {Object.keys(sectionsRef).map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(sectionsRef[section])}
                className={`text-sm font-semibold capitalize transition-all duration-300 cursor-pointer relative py-2 ${activeSection === section
                  ? 'text-neon-blue text-glow-blue'
                  : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                {section}
                {activeSection === section && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Contact CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollTo(sectionsRef.contact)}
              className="neon-border-btn px-5 py-2.5 rounded-xl text-sm font-bold glass-panel border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue shadow-[0_0_15px_rgba(0,210,255,0.05)] cursor-pointer"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-200 hover:text-neon-blue transition-colors focus:outline-none z-50 cursor-pointer"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel-heavy border-b border-white/10"
            >
              <div className="px-6 py-8 flex flex-col space-y-4">
                {Object.keys(sectionsRef).map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollTo(sectionsRef[section])}
                    className={`text-lg font-medium text-left capitalize py-2 border-b border-white/5 ${activeSection === section ? 'text-neon-blue' : 'text-slate-400'
                      }`}
                  >
                    {section}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo(sectionsRef.contact)}
                  className="w-full text-center py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg font-bold rounded-xl shadow-lg mt-4 cursor-pointer"
                >
                  Contact Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 pt-28 space-y-28 md:space-y-40 relative z-10">

        {/* 1. HERO SECTION */}
        <section
          id="hero"
          ref={sectionsRef.hero}
          className="min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between py-12 md:py-24 gap-12"
        >
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neon-blue shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-ping" />
              <span>Available for Full-time Roles & Internships</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-white via-neon-blue to-neon-purple bg-clip-text text-transparent text-glow-blue">
                {resumeData.name}
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-300">
              Professional <span className="text-neon-purple font-mono">{resumeData.role}</span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
              {resumeData.about}
            </p>

            {/* CTAs and Resume Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <button
                onClick={() => scrollTo(sectionsRef.projects)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg font-extrabold rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Work</span>
                <FaArrowRight className="text-sm text-dark-bg" />
              </button>

              <button
                onClick={() => scrollTo(sectionsRef.contact)}
                className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-white/5 border border-white/10 text-white font-bold rounded-xl transition-all duration-300 hover:border-neon-blue/50 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Let's Connect</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-4 glass-panel border border-neon-purple/20 text-neon-purple font-semibold rounded-xl hover:bg-neon-purple/10 transition-all duration-300 hover:border-neon-purple/50 cursor-pointer flex items-center justify-center gap-2"
                title="Print Resume Layout"
              >
                <FaDownload className="text-sm" />
                <span>Print Resume</span>
              </button>
            </div>

            {/* Social Badges */}
            <div className="flex items-center justify-center md:justify-start space-x-6 pt-6">
              <a
                href={resumeData.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-neon-blue hover:scale-110 shadow-md transition-all duration-300"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href={`mailto:${resumeData.email}`}
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-neon-blue hover:scale-110 shadow-md transition-all duration-300"
              >
                <FaEnvelope className="text-2xl" />
              </a>
              <a
                href={`tel:${resumeData.phone}`}
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-neon-blue hover:scale-110 shadow-md transition-all duration-300"
              >
                <FaPhoneAlt className="text-xl" />
              </a>
              <div className="text-xs text-slate-500 font-medium">
                📍 {resumeData.location}
              </div>
            </div>
          </motion.div>

          {/* Right Hero Profile Photo Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-[340px] sm:max-w-[400px] flex items-center justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 group">
              {/* Outer Pulsing Neon Ring */}
              <div className="absolute inset-[-10px] rounded-full bg-gradient-to-tr from-neon-blue via-neon-purple to-neon-pink opacity-50 blur-lg group-hover:opacity-75 group-hover:blur-xl transition-all duration-500 animate-pulse-slow" />

              {/* Rotating Border Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple p-[3px] animate-spin-slow">
                <div className="w-full h-full rounded-full bg-dark-bg" />
              </div>

              {/* Profile image frame */}
              <div className="absolute inset-[8px] rounded-full overflow-hidden border border-white/10 bg-dark-bg">
                <img
                  src={heroProfileImg}
                  alt="Muhammad Saad Profile"
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Floating interactive technology tags */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 -left-4 w-12 h-12 rounded-xl glass-panel flex items-center justify-center shadow-lg border border-neon-blue/20"
              >
                <SiReact className="text-cyan-400 text-2xl" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 -right-2 w-14 h-14 rounded-xl glass-panel flex items-center justify-center shadow-lg border border-neon-purple/20"
              >
                <SiNextdotjs className="text-white text-3xl" />
              </motion.div>

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-12 -left-8 w-12 h-12 rounded-xl glass-panel flex items-center justify-center shadow-lg border border-teal-400/20"
              >
                <SiTailwindcss className="text-teal-400 text-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 2. ABOUT ME SECTION */}
        <section id="about" ref={sectionsRef.about} className="scroll-mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-xs font-extrabold tracking-widest text-neon-blue uppercase">About Me</h2>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Professional Overview</p>
              <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Glass Card with Alternate Image & Quick Info */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-5 flex flex-col items-center justify-center space-y-6"
              >
                <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden glass-card p-3 border border-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 to-neon-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={pictImg}
                    alt="Saad Professional"
                    className="w-full h-full object-cover rounded-xl shadow-inner scale-100 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                {/* Live Stats Container */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-[320px]">
                  <div className="glass-panel p-4 rounded-xl border border-white/5 text-center">
                    <p className="text-2xl font-black text-neon-blue">1.5+</p>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Years Experience</p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/5 text-center">
                    <p className="text-2xl font-black text-neon-purple">22+</p>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Projects Finished</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Bio Details */}
              <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
                <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
                  <div className="flex items-center space-x-3 text-neon-blue">
                    <FaUserAstronaut className="text-2xl" />
                    <h3 className="text-xl font-bold">Full Stack Architect</h3>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    {resumeData.about}
                  </p>

                  <div className="border-t border-white/5 pt-6 space-y-4">
                    <h4 className="text-sm font-bold tracking-wider text-neon-purple uppercase">Career Objective</h4>
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      "{resumeData.careerObjective}"
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="flex items-start space-x-3">
                      <FaCheckCircle className="text-neon-blue mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-slate-200">Interactive User Interfaces</p>
                        <p className="text-xs text-slate-400">Crafting robust UI systems using Tailwind & React.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FaCheckCircle className="text-neon-purple mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-slate-200">Performance Oriented</p>
                        <p className="text-xs text-slate-400">Optimizing web performance and SEO architectures.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FaCheckCircle className="text-neon-blue mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-slate-200">SaaS Product Focus</p>
                        <p className="text-xs text-slate-400">Full stack dashboard and backend integrations.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FaCheckCircle className="text-neon-purple mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-slate-200">Eager Learner</p>
                        <p className="text-xs text-slate-400">Constantly adopting next-generation stack standards.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section id="skills" ref={sectionsRef.skills} className="scroll-mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-xs font-extrabold tracking-widest text-neon-blue uppercase">Professional Stack</h2>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Technical Skills</p>
              <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
            </div>

            {/* Filtration Tabs */}
            <div className="flex justify-center space-x-4">
              {['all', 'frontend', 'backend'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSkillsFilter(category)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300 cursor-pointer ${skillsFilter === category
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg shadow-md'
                    : 'glass-panel border border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                    }`}
                >
                  {category === 'backend' ? 'Backend & Tools' : category}
                </button>
              ))}
            </div>

            {/* Skills Grid Layout */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => {
                  // Circumference = 2 * PI * r = 2 * 3.14159 * 24 = 150.8
                  const circumference = 150.8
                  const offset = circumference - (skill.level / 100) * circumference

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={skill.name}
                      whileHover="hover"
                      variants={cardHoverEffect}
                      className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-48 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />

                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
                          {skill.icon}
                        </div>

                        {/* Circular Progress Indicator */}
                        <div className="relative w-14 h-14">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="28"
                              cy="28"
                              r="24"
                              className="circle-bg"
                              strokeWidth="3.5"
                            />
                            <circle
                              cx="28"
                              cy="28"
                              r="24"
                              className="circle-progress"
                              strokeWidth="3.5"
                              stroke="url(#neonGradient)"
                              strokeDasharray={circumference}
                              strokeDashoffset={offset}
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-200">
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-lg font-black text-slate-100">{skill.name}</p>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                          {skill.category} Development
                        </p>
                      </div>

                      {/* Global Gradient Definition for Circles */}
                      <svg className="hidden">
                        <defs>
                          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00d2ff" />
                            <stop offset="100%" stopColor="#9d4edd" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        {/* 4. PROJECTS SECTION */}
        <section id="projects" ref={sectionsRef.projects} className="scroll-mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-xs font-extrabold tracking-widest text-neon-blue uppercase">Case Studies</h2>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Premium Showcase</p>
              <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resumeData.projects.map((project, idx) => (
                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                  key={project.title}
                  className="glass-card rounded-2xl overflow-hidden border border-white/5 flex flex-col h-full group"
                >
                  {/* Project image display */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-dark-bg/80 border border-white/10 text-xs font-bold text-neon-blue backdrop-blur-md">
                      {project.tagline}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-neon-blue transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* CTA Links */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                        >
                          <FaGithub className="text-lg" />
                          <span>Repository</span>
                        </a>

                        <button
                          onClick={() => scrollTo(sectionsRef.contact)}
                          className="flex items-center space-x-1 text-xs font-bold text-neon-blue hover:text-glow-blue transition-all"
                        >
                          <span>Live Demo</span>
                          <FaExternalLinkAlt className="text-[10px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. EXPERIENCE SECTION */}
        <section id="experience" ref={sectionsRef.experience} className="scroll-mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-xs font-extrabold tracking-widest text-neon-blue uppercase">Career Milestones</h2>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Professional Experience</p>
              <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
            </div>

            {/* Vertical timeline container */}
            <div className="max-w-3xl mx-auto relative pl-6 sm:pl-8 border-l-2 border-white/5 py-2 space-y-12">
              {resumeData.experience.map((exp, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={exp.role + exp.company}
                  className="relative group"
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-4.5 h-4.5 rounded-full bg-dark-bg border-[3px] border-neon-blue group-hover:border-neon-purple transition-colors duration-300 shadow-[0_0_10px_rgba(0,210,255,0.4)]" />

                  {/* Experience Card */}
                  <div className="glass-card p-6 rounded-2xl border border-white/5 group-hover:border-neon-blue/30 transition-all duration-300 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-100 group-hover:text-neon-blue transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-neon-purple">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 self-start sm:self-center">
                        {exp.duration}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-slate-400 text-sm leading-relaxed">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-neon-blue mt-1 shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 6. EDUCATION SECTION */}
        <section id="education" ref={sectionsRef.education} className="scroll-mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-xs font-extrabold tracking-widest text-neon-blue uppercase">Academics</h2>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Education Timeline</p>
              <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
            </div>

            {/* Grid Layout for academic degrees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resumeData.education.map((edu, idx) => (
                <motion.div
                  variants={{ ...itemVariants, ...cardHoverEffect }}
                  whileHover="hover"
                  key={edu.degree}
                  className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-72 relative"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-neon-blue text-2xl">
                      <FaGraduationCap />
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-slate-100">{edu.degree}</h3>
                      <p className="text-xs font-bold text-neon-purple mt-0.5">{edu.institution}</p>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed">
                      {edu.description}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Duration</span>
                    <span className="text-xs font-bold text-slate-300">{edu.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 7. ACHIEVEMENTS SECTION */}
        <section id="achievements" ref={sectionsRef.achievements} className="scroll-mt-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-xs font-extrabold tracking-widest text-neon-blue uppercase">Honors</h2>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Achievements & Highlights</p>
              <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resumeData.achievements.map((ach, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={ach.title}
                  className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 relative group overflow-hidden"
                >
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-neon-purple/5 rounded-full blur-2xl group-hover:bg-neon-purple/15 transition-all duration-500" />

                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple text-2xl">
                      <FaAward />
                    </div>

                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-neon-blue transition-colors duration-300">
                      {ach.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400">{ach.issuer}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 8. CONTACT SECTION */}
        <section id="contact" ref={sectionsRef.contact} className="scroll-mt-24 pb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-xs font-extrabold tracking-widest text-neon-blue uppercase">Get In Touch</h2>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Information</p>
              <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Left Column: Direct Info Links */}
              <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
                <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 space-y-8">
                  <h3 className="text-2xl font-bold text-slate-100">Let's build something beautiful.</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Have an internship opportunity, a freelance project, or just want to chat about code? Feel free to reach out. I will get back to you within 24 hours.
                  </p>

                  <div className="space-y-6">
                    {/* Email Info Card */}
                    <div
                      onClick={() => copyToClipboard(resumeData.email, 'email')}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-neon-blue/30 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-neon-blue text-2xl group-hover:scale-105 transition-transform">
                        <FaEnvelope />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email Address</p>
                        <p className="text-sm font-bold text-slate-200 truncate">{resumeData.email}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase group-hover:text-neon-blue transition-colors">
                        {copiedText === 'email' ? 'Copied!' : 'Copy'}
                      </span>
                    </div>

                    {/* Phone Info Card */}
                    <div
                      onClick={() => copyToClipboard(resumeData.phone, 'phone')}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-neon-purple/30 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple text-xl group-hover:scale-105 transition-transform">
                        <FaPhoneAlt />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Phone number</p>
                        <p className="text-sm font-bold text-slate-200">{resumeData.phone}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase group-hover:text-neon-purple transition-colors">
                        {copiedText === 'phone' ? 'Copied!' : 'Copy'}
                      </span>
                    </div>

                    {/* Location Info Card */}
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Office Location</p>
                        <p className="text-sm font-bold text-slate-200">{resumeData.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Premium Contact Form */}
              <motion.div variants={itemVariants} className="lg:col-span-7">
                <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5">
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleFormSubmit}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Name</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all text-sm"
                              placeholder="Name"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all text-sm"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Subject</label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all text-sm"
                            placeholder="Project Proposal / Question"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Message</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows="5"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all text-sm resize-none"
                            placeholder="Hi Saad, I would love to collaborate..."
                          />
                        </div>

                        {sendError && (
                          <p className="text-red-400 text-xs font-semibold text-center">{sendError}</p>
                        )}

                        <button
                          type="submit"
                          disabled={isSending}
                          className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg font-extrabold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                        >
                          {isSending ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-dark-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <FaPaperPlane className="text-sm text-dark-bg" />
                              <span>Send Message</span>
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-4xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                          <FaCheckCircle />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-100">Message Sent Successfully!</h4>
                        <p className="text-slate-400 text-sm max-w-sm">
                          Thank you for reaching out, {formData.name}. I have received your message and will contact you at {formData.email} shortly.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </section>

      </main>

      {/* Futuristic footer */}
      <footer className="border-t border-white/5 glass-panel-heavy py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            © {new Date().getFullYear()} Muhammad Saad. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs font-semibold text-slate-400">
            <a href="#about" className="hover:text-neon-blue transition-colors">About</a>
            <a href="#skills" className="hover:text-neon-blue transition-colors">Skills</a>
            <a href="#projects" className="hover:text-neon-blue transition-colors">Projects</a>
            <a href={resumeData.githubUrl} target="_blank" rel="noreferrer" className="hover:text-neon-blue transition-colors flex items-center gap-1">
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
