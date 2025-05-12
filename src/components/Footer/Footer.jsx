import { Component } from "react";
import styles from "./Footer.module.css";
import restaurantLogo from "../../assets/icons/logo.svg";
import { linkSections, socialIcons } from "../../data/footerData.js";

class Footer extends Component {
  generateNavigationColumns = () => {
    return linkSections.map((section, sectionIndex) => {
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

  generateSocialMediaLinks = () => {
    return socialIcons.map((platform, index) => (
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

  render() {
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
              {this.generateNavigationColumns()}
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.bottomContent}>
            <div className={styles.builtWith}>
              <span>Built by</span>
              {/* Заменяем ссылки на span */}
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
            <div className={styles.socialIcons}>
              {this.generateSocialMediaLinks()}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
