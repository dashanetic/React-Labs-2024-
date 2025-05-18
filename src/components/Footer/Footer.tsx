import React from "react";
import styles from "./Footer.module.css";
import restaurantLogo from "../../assets/icons/logo.svg";
import { linkSections, socialIcons, LinkSection, SocialIcon } from "../../data/footerData";

const Footer: React.FC = () => {
  const generateNavigationColumns = (): JSX.Element[] => {
    return linkSections.map((section: LinkSection, sectionIndex: number) => {
      const isTemplateSection = section.title === "TEMPLATE";

      return (
        <div key={`section-${sectionIndex}`} className={styles.linkColumn}>
          <h4 className={styles.linkTitle}>{section.title}</h4>
          {section.links.map((link, linkIndex) =>
            isTemplateSection ? (
              <a
                key={`link-${sectionIndex}-${linkIndex}`}
                href={link.url}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <span
                key={`link-${sectionIndex}-${linkIndex}`}
                className={`${styles.link} ${styles.disabledLink}`}
                style={{ cursor: "default" }}
              >
                {link.label}
              </span>
            )
          )}
        </div>
      );
    });
  };

  const generateSocialMediaLinks = (): JSX.Element[] => {
    return socialIcons.map((platform: SocialIcon, index: number) => (
      <span
        key={`social-${index}`}
        className={styles.socialIcon}
        style={{ cursor: "default" }}
        aria-label={platform.alt}
      >
        <img
          src={platform.icon}
          alt={platform.alt}
          className={styles.iconImage}
          loading="lazy"
        />
      </span>
    ));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.mainContent}>
          <div className={styles.logoSection}>
            <img
              src={restaurantLogo}
              alt="Restaurant Logo"
              className={styles.logo}
              loading="lazy"
            />
            <p className={styles.footerText}>
              Takeaway & Delivery template for small - medium businesses.
            </p>
          </div>

          <div className={styles.linksContainer}>
            {generateNavigationColumns()}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomContent}>
          <div className={styles.builtWith}>
            <span>Built by</span>
            <span
              className={styles.highlightedText}
              style={{ cursor: "default" }}
            >
              Flowbase
            </span>
            <span>· Powered by</span>
            <span
              className={styles.highlightedText}
              style={{ cursor: "default" }}
            >
              Webflow
            </span>
          </div>
          <div className={styles.socialIcons}>{generateSocialMediaLinks()}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;