import styles from "./Footer.module.css";
import logoIcon from "@/assets/icons/logo.svg";
import { linkSections, socialIcons } from "@/data/footerData.js";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <div className={styles.mainContent}>
                    <div className={styles.logoSection}>
                        <img src={logoIcon} alt="Logo" className={styles.logo} />
                        <p className={styles.footerText}>
                            Takeaway & Delivery template for small - medium businesses.
                        </p>
                    </div>

                    <div className={styles.linksContainer}>
                        {linkSections.map((section) => (
                            <div key={section.title} className={styles.linkColumn}>
                                <h4 className={styles.linkTitle}>{section.title}</h4>
                                {section.links.map((link) => (
                                    <a key={link.label} href={link.url} className={styles.link}>
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.bottomContent}>
                    <div className={styles.builtWith}>
                        <span>Built by</span>
                        <a href="/" className={styles.highlightedText}>
                            Flowbase
                        </a>
                        <span>· Powered by</span>
                        <a href="/" className={styles.highlightedText}>
                            Webflow
                        </a>
                    </div>
                    <div className={styles.socialIcons}>
                        {socialIcons.map(({ icon, alt, url }) => (
                            <a key={alt} href={url} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                                <img src={icon} alt={alt} className={styles.iconImage} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
