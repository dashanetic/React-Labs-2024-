import instagramIcon from "../assets/icons/instagram.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import youtubeIcon from "../assets/icons/youtube.svg";

const footerConfiguration = {
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
        { linkText: "Style Guide", destination: "/", isExternal: false },
        { linkText: "Changelog", destination: "/", isExternal: false },
        { linkText: "Licence", destination: "/", isExternal: false },
        { linkText: "Webflow University", destination: "/", isExternal: true },
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

function adaptNavigationFormat() {
  return footerConfiguration.navigationGroups.map((group) => ({
    title: group.sectionName,
    links: group.navigationItems.map((item) => ({
      label: item.linkText,
      url: item.destination,
    })),
  }));
}

function adaptSocialIconsFormat() {
  return footerConfiguration.socialMedia.platforms.map((platform) => ({
    icon: platform.iconSource,
    alt: platform.platformName,
    url: platform.profileUrl,
  }));
}

export const linkSections = adaptNavigationFormat();
export const socialIcons = adaptSocialIconsFormat();
