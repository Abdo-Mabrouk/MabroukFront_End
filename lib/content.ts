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
export const THEME_STORAGE_KEY = "mabroukui-theme";
export type Theme = "light" | "dark";

export const projects: Project[] = [
  {
    file: "projects-1.jpeg",
    title: { ar: "رورا باث | الموقع الإلكتروني", en: "Rora Bath | Website" },
    url: "https://rorabath.com/",
  },
  {
    file: "projects-2.jpeg",
    title: { ar: "رورا باث | لوحة التحكم", en: "Rora Bath | Dashboard" },
    url: "https://admin.rorabath.com/",
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
      ar: "أنا عبدالرحمن مبروك، مطوّر واجهات أمامية {{Front-End Developer}} متخصص في {{React.js}} و{{Next.js}}. أبني واجهات ويب تفاعلية وسريعة ومتجاوبة، وأضع تجربة المستخدم وجودة الكود وسهولة الصيانة في مقدمة أولوياتي.",
      en: "I’m Abdelrhman Mabrouk, a Front-End Developer specializing in React.js and Next.js. I build interactive, fast, and responsive web interfaces, with user experience, code quality, and maintainability at the core of everything I ship.",
    },
  },
  {
    id: "experience",
    title: { ar: "خبرتي", en: "My Experience" },
    body: {
      ar: "أعمل منذ مايو 2025 في {{Dr. Code Software Company}}، حيث أطوّر واجهات ويب لمشاريع متنوعة تشمل **منصات التجارة الإلكترونية، ولوحات التحكم، وأنظمة إدارة البيانات**، باستخدام React.js وNext.js وTypeScript.",
      en: "Since May 2025, I’ve been at Dr. Code Software Company, building web interfaces for a range of products, including **e-commerce platforms, admin dashboards, and data management systems**, with React.js, Next.js, and TypeScript.",
    },
  },
  {
    id: "process",
    title: { ar: "طريقة عملي", en: "How I Work" },
    body: {
      ar: "أبدأ بفهم متطلبات المشروع واحتياجات المستخدم، ثم أحوّل التصميمات إلى واجهات عملية ومتجاوبة. أكتب كودًا منظمًا، وأبني مكونات قابلة لإعادة الاستخدام، وأربط الواجهات بالـ APIs، مع الحفاظ على التوازن بين **تجربة المستخدم، وأداء التطبيق، وجودة التنفيذ**.",
      en: "I start by understanding the project requirements and the people who will use it, then turn designs into functional, responsive interfaces. I write clean code, build reusable components, and integrate APIs while balancing **user experience, application performance, and implementation quality**.",
    },
  },
  {
    id: "architecture",
    title: { ar: "هندسة الواجهات", en: "Front-End Architecture" },
    body: {
      ar: "أصمّم واجهات منظمة وقابلة للتوسع باستخدام **{{React}} و{{Next.js}}**؛ أقسّمها إلى مكونات مستقلة، وأدير الحالة بالأدوات الأنسب لكل مشروع، وأُحسّن التعامل مع البيانات بما يضمن سهولة الصيانة والتطوير مستقبلًا.",
      en: "I design structured, scalable interfaces with **React and Next.js**: breaking UIs into independent components, choosing the right state management for each project, and optimizing data flow to support long-term maintainability and growth.",
    },
  },
  {
    id: "technology",
    title: { ar: "شغفي بالتكنولوجيا", en: "My Passion for Technology" },
    body: {
      ar: "أطوّر مهاراتي باستمرار، وأتابع أحدث تقنيات وأدوات تطوير الويب. أستمتع باستكشاف الحلول التي تجعل التطبيقات أسرع وأكثر كفاءة، وتقدّم تجارب رقمية تلبي احتياجات المستخدمين وتحقق أهداف المشاريع.",
      en: "I keep sharpening my skills and stay current with modern web technologies and tools. I enjoy finding solutions that make applications faster and more efficient, and that deliver digital experiences meeting both user needs and business goals.",
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
      href: "https://www.linkedin.com/in/abdelrhman-mabrouk-777b96343",
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
    role: "مطوّر واجهات أمامية",
    lede: "مطوّر واجهات أمامية متخصص في React.js وNext.js. أبني واجهات ويب سريعة ومتجاوبة وقابلة للتوسع، وأربطها بالـ APIs، مع اهتمام حقيقي بالأداء وجودة الكود وتجربة المستخدم.",
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
    lede: "Front-End Developer specializing in React.js and Next.js. I build fast, responsive, and scalable web interfaces, connect them to APIs, and care deeply about performance, code quality, and user experience.",
    stats: {
      years: "Years Experience",
      yearsValue: "+1.5y",
      projects: "Projects",
      sectors: "Sector",
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
    portraitAlt: "Portrait of Abdelrhman Mabrouk",
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
