export type Lang = "ar" | "en";
export type TabId = "about" | "experience" | "work";
export type Localized<T> = Record<Lang, T>;
export type RichString = string;

export interface Project {
  file: string;
  title: Localized<string>;
  url: string;
}

export interface ExperienceItem {
  id: string;
  period: Localized<RichString>;
  country: Localized<string>;
  role: string;
  company: string;
  points: Localized<RichString[]>;
}

export interface AboutSection {
  id: string;
  title: Localized<RichString>;
  body: Localized<RichString>;
  belief?: boolean;
}

export const STORAGE_KEY = "mabroukui-language";

export const projects: Project[] = [
  {
    file: "projects-1.jpeg",
    title: { ar: " رورا باث | ويب سايت", en: "Rora Bath |  Website" },
    url: "https://rorabath.com/",
  },
  {
    file: "projects-2.jpeg",
    title: { ar: " رورا باث | لوحه التحكم", en: "Rora Bath | Dashboard" },
    url: "https://admin.rorabath.com/",
  },
  {
    file: "projects-3.jpg",
    title: { ar: " رورا باث | لوحه التحكم", en: "Rora Bath | Dashboard" },
    url: "https://admin-jothour-hloul.doctor-code.net/",
  },
  {
    file: "projects-4.jpeg",
    title: { ar: "Sun Pyramids", en: "Sun Pyramids" },
    url: "https://tourism-app-dusky.vercel.app/",
  },
  {
    file: "projects-5.webp",
    title: { ar: "ميدان التخزين", en: "Midan Storage" },
    url: "https://storage-field.vercel.app/",
  },
  {
    file: "projects-7.webp",
    title: { ar: "منصتي التعليمية", en: "My Learning Platform" },
    url: "https://social-app-zjsx.vercel.app/",
  },
  {
    file: "projects-6.webp",
    title: { ar: "جمعية طريق السلام", en: "Path of Peace Association" },
    url: "https://nahw-alaislam.vercel.app/",
  },
];

export const experience: ExperienceItem[] = [
  {
    id: "dr-code",
    period: { ar: "05/2025 – الآن", en: "05/2025 – Present" },
    country: { ar: "مصر", en: "Egypt" },
    role: "Front-End Developer",
    company: "Dr. Code Software Company",
    points: {
      ar: [
        "تطوير واجهات ويب تفاعلية ومتجاوبة باستخدام React.js وNext.js مع التركيز على تجربة المستخدم.",
        "إنشاء وإعادة استخدام مكونات React قابلة للتوسع لتحسين تنظيم الكود وسهولة صيانته.",
        "التكامل مع REST APIs لربط واجهات المستخدم بالبيانات والخدمات الخلفية.",
        "تطوير واجهات تدعم اللغات المتعددة واتجاهي العرض RTL وLTR لتحسين تجربة المستخدم.",
        "تحسين أداء الواجهات وجودة الكود مع الالتزام بتصميمات UI وتحقيق تجربة متناسقة على مختلف أحجام الشاشات.",
      ],
      en: [
        "Developing interactive and responsive web interfaces using React.js and Next.js, with a focus on user experience.",
        "Building reusable and scalable React components to improve code organization and maintainability.",
        "Integrating REST APIs to connect user interfaces with backend data and services.",
        "Developing multilingual interfaces with RTL and LTR support to enhance the user experience.",
        "Improving interface performance and code quality while implementing UI designs consistently across different screen sizes.",
      ],
    },
  },
];

export const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Redux Toolkit",
  "React Query",
  "React Hook Form",
  "Tailwind CSS",
  "Shadcn UI",
  "Responsive Design",
  "Lucide React",
  "REST APIs",
  "Axios",
  "SignalR",
  "Git",
  "GitHub",
  "NPM",
  "Reusable Components",
  "Custom Hooks",
  "Component Architecture",
  "Performance Optimization",
] as const;

export const software = [
  { name: "Figma", icon: "/assets/icons/software/figma.svg" },
  { name: "VSCode", icon: "/assets/icons/software/Vs Code.jpeg" },
  { name: "Cursor", icon: "/assets/icons/software/CursorLogo.jpeg" },
  { name: "Postmn", icon: "/assets/icons/software/PostManLogo.jpeg" },
  { name: "Get", icon: "/assets/icons/software/GetLogo.jpeg" },
  { name: "CloudeCode", icon: "/assets/icons/software/CloudeCode.jpeg" },
  { name: "Vercal", icon: "/assets/icons/software/VercalLogo.jpeg" },
] as const;

export const aboutSections: AboutSection[] = [
  {
    id: "who",
    title: { ar: "من أنا؟", en: "Who Am I?" },
    body: {
      ar: "أنا عبدو مبروك، مطور واجهات أمامية {{Front-End Developer}} متخصص في {{React.js}} و{{Next.js}}. أركز على بناء واجهات ويب تفاعلية، سريعة ومتجاوبة، مع الاهتمام بتجربة المستخدم وجودة الكود وقابلية التطوير والصيانة.",
      en: "I’m Abdo Mabrouk, a Front-End Developer specializing in React.js and Next.js. I focus on building interactive, fast, and responsive web interfaces while prioritizing user experience, code quality, scalability, and maintainability.",
    },
  },
  {
    id: "experience",
    title: { ar: "خبرتي", en: "My Experience" },
    body: {
      ar: "أعمل في {{Dr. Code Software Company}} منذ مايو 2025، وأساهم في تطوير واجهات ويب لمشاريع متنوعة، تشمل **منصات التجارة الإلكترونية، لوحات التحكم، وأنظمة إدارة البيانات**، باستخدام تقنيات حديثة مثل React.js وNext.js وTypeScript.",
      en: "I’ve been working at Dr. Code Software Company since May 2025, contributing to web interfaces for various projects, including **e-commerce platforms, dashboards, and data management systems**, using modern technologies such as React.js, Next.js, and TypeScript.",
    },
  },
  {
    id: "process",
    title: { ar: "طريقة عملي", en: "How I Work" },
    body: {
      ar: "أبدأ بفهم متطلبات المشروع واحتياجات المستخدم، ثم أحول التصميمات إلى واجهات عملية ومتجاوبة. أهتم بكتابة كود منظم، وبناء مكونات قابلة لإعادة الاستخدام، وربط الواجهات بالـ APIs، مع تحقيق التوازن بين **تجربة المستخدم، أداء التطبيق، وجودة التنفيذ**.",
      en: "I start by understanding project requirements and user needs, then turn designs into functional and responsive interfaces. I focus on writing clean code, building reusable components, and integrating APIs while balancing **user experience, application performance, and implementation quality**.",
    },
  },
  {
    id: "architecture",
    title: { ar: "بناء الواجهات", en: "Frontend Architecture" },
    body: {
      ar: "أهتم ببناء واجهات منظمة وقابلة للتوسع باستخدام **{{React}} و{{Next.js}}**، مع تقسيم الواجهات إلى مكونات مستقلة، وإدارة الحالة باستخدام الأدوات المناسبة، وتحسين التعامل مع البيانات لضمان سهولة الصيانة والتطوير مستقبلًا.",
      en: "I focus on building structured and scalable interfaces using **React and Next.js**, breaking UIs into independent components, managing state with suitable tools, and optimizing data handling to support long-term maintainability and growth.",
    },
  },
  {
    id: "technology",
    title: { ar: "شغفي بالتكنولوجيا", en: "My Passion for Technology" },
    body: {
      ar: "أحرص على تطوير مهاراتي باستمرار ومتابعة التقنيات والأدوات الحديثة في تطوير الويب. أهتم باستكشاف الحلول التي تساعد على بناء تطبيقات أسرع وأكثر كفاءة، وتقديم تجارب رقمية تلبي احتياجات المستخدمين وأهداف المشاريع.",
      en: "I’m committed to continuously improving my skills and exploring modern web development technologies and tools. I enjoy discovering solutions that help build faster, more efficient applications and deliver digital experiences that meet user needs and project goals.",
    },
  },
  {
    id: "belief",
    belief: true,
    title: { ar: "ما أؤمن به", en: "What I Believe" },
    body: {
      ar: "**الكود الجيد لا يقتصر على جعل الواجهة تعمل، بل يجعلها واضحة، سريعة، سهلة الصيانة، وقابلة للتطوير.**",
      en: "**Good code does more than make an interface work. It makes it clear, fast, maintainable, and ready to scale.**",
    },
  },
];

export const links = {
  whatsapp: "https://wa.me/201122737895",
  cv: "https://drive.google.com/file/d/1IT2CD_h5OyNVIElnJqZcAlQQ-br6cX5b/view?usp=drive_link",
  email: "abdomabroukdev@gmail.com",
  socials: [
    // { name: "Behance", href: "https://www.behance.net/a7medmabrok0", icon: "/assets/icons/behance.svg" },
    {
      name: "LinkedIn",
      href: "www.linkedin.com/in/abdelrhman-mabrouk-777b96343",
      icon: "/assets/icons/linkedin.svg",
    },
    {
      name: "github",
      href: "https://github.com/Abdo-Mabrouk",
      icon: "/assets/icons/github.svg",
    },
    {
      name: "vercel",
      href: "https://vercel.com/abdelrhman-mabrouks-projects",
      icon: "/assets/icons/vercel.svg",
    },
    {
      name: "facebook",
      href: "https://facebook.com/abd.el.rhman.mabrouk.560055",
      icon: "/assets/icons/facebook.svg",
    },
    // { name: "X", href: "https://x.com/a7medmabrok0", icon: "/assets/icons/x.svg" },
    {
      name: "Instagram",
      href: "https://www.instagram.com/a7medmabrok0/",
      icon: "/assets/icons/instagram.svg",
    },
  ],
} as const;

export interface UiStrings {
  tabs: Record<TabId, string>;
  available: string;
  name: string;
  role: string;
  lede: string;
  stats: {
    years: string;
    yearsValue: string;
    projects: string;
    sectors: string;
  };
  message: string;
  cv: string;
  languageButton: string;
  languageButtonShort: string;
  languageAria: string;
  mainNavAria: string;
  mobileNavAria: string;
  profileAria: string;
  mainPanelAria: string;
  portraitAlt: string;
  statsAria: string;
  workScrollAria: string;
  socialsAria: string;
  toolsAria: string;
  closeProject: string;
  viewProject: (title: string) => string;
  experienceTitle: string;
  aboutTitle: string;
  aboutIntro: string;
  skillsTitle: string;
  toolsTitle: string;
}

export const ui: Localized<UiStrings> = {
  ar: {
    tabs: { about: "عنــي", experience: "الخبرات", work: "معرض الأعمال" },
    available: "متاح للعمل",
    name: "عبدالرحمن مبروك",
    role: "مصمم واجهة اماميه",
    lede: "متخصص في تطوير واجهات الويب والتطبيقات الرقمية باستخدام React.js وNext.js. أركز على بناء واجهات تفاعلية وقابلة للتوسع، وتطوير تجارب مستخدم سلسة ومتجاوبة، وربط الأنظمة بالـ APIs، مع الاهتمام بالأداء وجودة الكود وتحقيق التوازن بين احتياجات المستخدم وأهداف المشروع وقابلية التنفيذ.",
    stats: {
      years: "سنوات خبرة",
      yearsValue: "+1.5",
      projects: "مشروع",
      sectors: "قطاع",
    },
    message: "إرسال رسالة",
    cv: "تنزيل السيرة الذاتية",
    languageButton: "English",
    languageButtonShort: "En",
    languageAria: "Switch to English",
    mainNavAria: "التنقل الرئيسي",
    mobileNavAria: "التنقل الرئيسي للموبايل",
    profileAria: "الملف الشخصي",
    mainPanelAria: "محتوى الموقع",
    portraitAlt: "بورتريه عبدالرحمن مبروك",
    statsAria: "إحصاءات العمل",
    workScrollAria: "الأعمال، مرر لعرض المشاريع",
    socialsAria: "روابط التواصل",
    toolsAria: "البرامج التي أستخدمها",
    closeProject: "إغلاق العرض",
    viewProject: (title) => `عرض مشروع ${title}`,
    experienceTitle: "الخبرات",
    aboutTitle: "عني",
    aboutIntro: "أحوّل تعقيد المنتجات الرقمية إلى تجارب واضحة وسهلة الاستخدام.",
    skillsTitle: "المهارات",
    toolsTitle: "البرامج التي أستخدمها",
  },
  en: {
    tabs: { about: "About Me", experience: "Experience", work: "Portfolio" },
    available: "Available for work",
    name: "Abdelrhman Mabrouk",
    role: "Front-End Developer",
    lede: "Specialized in developing modern web interfaces and digital applications using React.js and Next.js. I focus on building interactive, scalable interfaces, creating seamless and responsive user experiences, integrating systems with APIs, and maintaining high performance and code quality while balancing user needs, project goals, and technical feasibility.",
    stats: {
      years: "Experience",
      yearsValue: "+1.5y",
      projects: "Projects",
      sectors: "Industry",
    },
    message: "Send Message",
    cv: "Download CV",
    languageButton: "العربية",
    languageButtonShort: "ع",
    languageAria: "Switch to Arabic",
    mainNavAria: "Main navigation",
    mobileNavAria: "Mobile navigation",
    profileAria: "Profile",
    mainPanelAria: "Site content",
    portraitAlt: "Portrait of Ahmed Mabrouk",
    statsAria: "Work statistics",
    workScrollAria: "Portfolio projects; scroll to browse",
    socialsAria: "Social links",
    toolsAria: "Tools I use",
    closeProject: "Close project",
    viewProject: (title) => `View project ${title}`,
    experienceTitle: "Experience",
    aboutTitle: "About Me",
    aboutIntro:
      "I turn the complexity of digital products into clear, easy-to-use experiences.",
    skillsTitle: "Skills",
    toolsTitle: "Tools I Use",
  },
};
