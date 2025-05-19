interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
  isActive?: boolean;
  hasSubmenu?: boolean;
  isHighlighted?: boolean;
}

interface MobileSettings {
  breakpoint: number;
  animation: "slide" | "fade" | "none";
  closeOnRouteChange: boolean;
}

interface NavigationConfig {
  mainItems: NavigationItem[];
  mobileSettings: MobileSettings;
}

const navigationConfig: NavigationConfig = {
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

export const navItems: NavigationItem[] = navigationConfig.mainItems;
