import { NavItem } from "./types";
import { NAV_ITEMS } from "./config";

export const pageIndex = (item: NavItem) => NAV_ITEMS.indexOf(item);

export const logos = {
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
