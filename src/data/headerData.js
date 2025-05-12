const navigationConfig = {
  mainItems: [
    { label: "Home", href: "/", icon: "home", isExternal: false },
    { label: "Menu", href: "/", icon: "menu", isActive: true },
    { label: "Company", href: "/", icon: "building", hasSubmenu: false },
    { label: "Login", href: "/", icon: "user", isHighlighted: false },
  ],

  mobileSettings: {
    breakpoint: 768,
    animation: "slide",
    closeOnRouteChange: true,
  },
};

export const navItems = navigationConfig.mainItems;
