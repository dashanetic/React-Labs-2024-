import instagramIcon from "../assets/icons/instagram.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import youtubeIcon from "../assets/icons/youtube.svg";

// Типы для навигационных элементов
interface NavigationItem {
  linkText: string;
  destination: string;
  ariaLabel?: string;
  isExternal: boolean;
}

interface NavigationGroup {
  sectionName: string;
  sectionId: string;
  navigationItems: NavigationItem[];
}

interface SocialMediaPlatform {
  iconSource: string;
  platformName: string;
  profileUrl: string;
  analyticsId: string;
}

interface SocialMediaDisplayOptions {
  showLabels: boolean;
  iconSize: 'small' | 'medium' | 'large';
  targetBlank: boolean;
}

interface SocialMedia {
  platforms: SocialMediaPlatform[];
  displayOptions: SocialMediaDisplayOptions;
}

interface CopyrightInfo {
  year: number;
  companyName: string;
  rightsText: string;
}

interface FooterConfiguration {
  navigationGroups: NavigationGroup[];
  socialMedia: SocialMedia;
  copyrightInfo: CopyrightInfo;
}

// Форматы для экспорта
export interface LinkSection {
  title: string;
  links: {
    label: string;
    url: string;
  }[];
}

export interface SocialIcon {
  icon: string;
  alt: string;
  url: string;
}

const footerConfiguration: FooterConfiguration = {
  navigationGroups: [
    {
      sectionName: "COMPANY",
      sectionId: "company-links",
      navigationItems: [
        { linkText: "Home", destination: "/", isExternal: false },
        { linkText: "Order", destination: "/", isExternal: false },
        {
          linkText: "FAQ",
          destination: "/",
          ariaLabel: "Frequently asked questions",
          isExternal: false,
        },
        { linkText: "Contact", destination: "/", isExternal: false },
      ],
    },
    {
      sectionName: "TEMPLATE",
      sectionId: "template-links",
      navigationItems: [
        {
          linkText: "Style Guide",
          destination: "https://www.google.com/",
          isExternal: true,
        },
        {
          linkText: "Changelog",
          destination: "https://www.google.com/",
          isExternal: true,
        },
        {
          linkText: "Licence",
          destination: "https://www.google.com/",
          isExternal: true,
        },
        {
          linkText: "Webflow University",
          destination: "https://www.google.com/",
          isExternal: true,
        },
      ],
    },
    {
      sectionName: "FLOWBASE",
      sectionId: "flowbase-links",
      navigationItems: [
        { linkText: "More Cloneables", destination: "/", isExternal: false },
      ],
    },
  ],

  socialMedia: {
    platforms: [
      {
        iconSource: instagramIcon,
        platformName: "Instagram",
        profileUrl: "/",
        analyticsId: "footer-instagram",
      },
      {
        iconSource: twitterIcon,
        platformName: "Twitter",
        profileUrl: "/",
        analyticsId: "footer-twitter",
      },
      {
        iconSource: youtubeIcon,
        platformName: "YouTube",
        profileUrl: "/",
        analyticsId: "footer-youtube",
      },
    ],
    displayOptions: {
      showLabels: false,
      iconSize: "medium",
      targetBlank: true,
    },
  },

  copyrightInfo: {
    year: new Date().getFullYear(),
    companyName: "FoodDelivery Inc.",
    rightsText: "All Rights Reserved",
  },
};

function adaptNavigationFormat(): LinkSection[] {
  return footerConfiguration.navigationGroups.map((group) => ({
    title: group.sectionName,
    links: group.navigationItems.map((item) => ({
      label: item.linkText,
      url: item.destination,
    })),
  }));
}

function adaptSocialIconsFormat(): SocialIcon[] {
  return footerConfiguration.socialMedia.platforms.map((platform) => ({
    icon: platform.iconSource,
    alt: platform.platformName,
    url: platform.profileUrl,
  }));
}

export const linkSections = adaptNavigationFormat();
export const socialIcons = adaptSocialIconsFormat();