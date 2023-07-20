export interface Project {
  idx: number;
  name: string;
  link: string;
  github: string;
  description: string;
  screenshots: string[];
  logos: string[];
}

const logos = {
  apache: "/logos/apache.png",
  avalonia: "/logos/avalonia.ico",
  azure: "/logos/azure.png",
  blazor: "/logos/blazor.png",
  csharp: "/logos/csharp.png",
  css: "/logos/css1.png",
  digitalocean: "/logos/digitalocean.png",
  django: "/logos/django.png",
  docker: "/logos/docker1.png",
  dotnet: "/logos/dotnet.png",
  figma: "/logos/figma.png",
  html: "/logos/html.webp",
  java: "/logos/java1.png",
  js: "/logos/js.png",
  maria: "/logos/maria.svg",
  nginx: "/logos/nginx.png",
  objc: "/logos/objc.png",
  php: "/logos/php.webp",
  postgres: "/logos/postgres.png",
  react: "/logos/react.png",
  sqlite: "/logos/sqlite.svg",
  unreal: "/logos/unreal.png",
};

export const projects: Project[] = [
  {
    idx: 0,
    name: "Click & Push",
    link: "",
    github: "",
    description:
      "Click & Push is a company with the mission to make public spaces more accessible. I performed full-stack development in React-Native and Django for their prototype app, Atlas: a mapping app that displays community sourced accessibility information of many kinds. It supports OIDC user authentication, CRUD applications for landmarks, and early versions of a voice command system and notifications. I also managed a private git server and deployment of the backend using Digital Ocean, docker-compose, and NGINX",
    screenshots: ["/cnp/map.jpg", "/cnp/profile.png", "/cnp/voice.png"],
    logos: [
      logos.react,
      logos.django,
      logos.nginx,
      logos.docker,
      logos.digitalocean,
      logos.sqlite,
    ],
  },
  {
    idx: 1,
    name: "MyViva",
    link: "",
    github: "",
    description:
      "MyViva is a wellness company that is focused on improving its user's mental, physical, and nutritional fitness through science backed approaches. I performed full-stack web and mobile development in Unreal, React/React-Native, and Django for their prototype app, YARO: an AI driven wellness buddy that supports text to speech and speech to text to provide a natural feeling interface. I built the Django backend from scratch, and wired up API calls and wrote the native android code for speech synthesis in Java in the frontend unreal mobile app. I also managed various resources with Azure: a Perforce instance and the backend server (composed with docker-compose and NGINX).",
    screenshots: [],
    logos: [
      logos.react,
      logos.django,
      logos.nginx,
      logos.docker,
      logos.unreal,
      logos.java,
      logos.objc,
      logos.azure,
      logos.postgres,
    ],
  },
  {
    idx: 2,
    name: "Elixr",
    github: "https://github.com/cdmoss/ElixrMarket",
    link: "",
    description:
      "Elixr market is a prototype app that I built using ASP.NET Core Razor Pages for the University of Alberta. It was meant to be a store for high quality, peer reviewed XR applications built within an academic setting. It contained prototype implementations of an in-app peer review process, file uploads, group-based user authentication using ASP.NET's built-in auth library, a storefront, and cart.",
    screenshots: ["/elixr/product.PNG", "/elixr/upload.PNG"],
    logos: [
      logos.dotnet,
      logos.csharp,
      logos.html,
      logos.css,
      logos.js,
      logos.sqlite,
      logos.nginx,
      logos.docker,
    ],
  },
  {
    idx: 3,
    name: "TRAD Data Monitor",
    link: "",
    github: "https://github.com/cdmoss/TradDataMonitor-v2",
    description:
      "TRAD Data Monitor was built for a paid student contract orchestrated in partnership with the Medicine Hat College and a local vermiculture business called TRAD Industries. My team of 3 was awarded with the contract after our final project was selected by TRAD in our systems design course. It featured a graphic UI built using Avalonia (an open source, cross-platform WPF.NET alternative), collected various sensor data from Phidget sensors, and supported custom data plot creation",
    screenshots: [],
    logos: [logos.avalonia, logos.dotnet, logos.csharp, logos.sqlite],
  },
  {
    idx: 4,
    name: "HR Manager",
    link: "",
    github: "https://github.com/cdmoss/hrmanager-blazorapp",
    description:
      "HR Manager was a Blazor and Razor web app built for the local food bank in my hometown of Medicine Hat as a volunteer project. It supports user authentication, volunteer signup and information management, and shift scheduling.",
    screenshots: [
      "/foodbank/calendar.PNG",
      "/foodbank/login.PNG",
      "/foodbank/register_1.PNG",
      "/foodbank/register_2.PNG",
      "/foodbank/team_edit.PNG",
      "/foodbank/team.PNG",
      "/foodbank/timesheet.PNG",
    ],
    logos: [logos.blazor, logos.dotnet, logos.csharp, logos.maria],
  },
  {
    idx: 5,
    name: "Bitcoin Info Site",
    link: "https://bitcoin-info.netlify.app",
    github: "https://github.com/cdmoss/btc-info",
    description:
      "Bitcoin Info Site is a simple website built with regular HTML/CSS/JS for my university web design class. It offers various information about Bitcoin, including basic historical and technical information, and common criticisms and endorsements of Bitcoin. It also offers links to various resources.",
    screenshots: ["/btc/main.png", "/btc/history.png"],
    logos: [logos.html, logos.css, logos.js],
  },
  {
    idx: 6,
    name: "Minimalist Website Design",
    link: "https://www.figma.com/proto/glTvMyovhqOCohLZM0mZW8/3520AssignmentOne?scaling=scale-down&page-id=0%3A1&node-id=1-23&starting-point-node-id=1%3A5",
    github: "",
    description:
      "My minimalist website design is a Figma design that describes and demonstrates common elements of minimalist design. It was created for my university web design class (The on-hover animations will not work on mobile devices).",
    screenshots: ["/minimalism.png"],
    logos: [logos.figma],
  },
  {
    idx: 7,
    name: "Business Manager",
    link: "",
    github: "https://github.com/cdmoss/lamp-business-manager",
    description:
      "Business manager is a LAMP stack web app built for my university databases class. It supports very basic cookie based user login and management of customer profiles, inventory, and orders.",
    screenshots: [],
    logos: [
      logos.html,
      logos.css,
      logos.js,
      logos.php,
      logos.maria,
      logos.apache,
    ],
  },
  {
    idx: 8,
    name: "Logic Gate Simulator",
    link: "https://basic-logic-sim.netlify.app",
    github: "https://github.com/cdmoss/logic-simulator-js",
    description:
      "Logic Gate Simulator is a fun little project I built for my university web design course. It simulates a handful of 1 and 2 input simple logic gates (not mobile friendly).",
    screenshots: ["/logicsim/not.png", "/logicsim/or.png"],
    logos: [logos.html, logos.css, logos.js],
  },
];
