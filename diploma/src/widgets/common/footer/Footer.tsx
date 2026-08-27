import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import styles from "./Footer.module.scss";
import { socialLinks } from "./config/socialLinks";
import {
  productLinks,
  generalLinks,
  companyLinks,
  rightLinks,
} from "./config/navLinks";
import { Copyright } from "@shared/assets/icons/documents";

const footerLinkGroups = [
  { title: "Product", links: productLinks },
  { title: "General", links: generalLinks },
  { title: "Company", links: companyLinks },
];

const socialHoverTransition = {
  duration: 0.2,
  ease: "easeOut",
} as const;

const accordionTransition = {
  duration: 0.25,
  ease: "easeInOut",
} as const;

export function Footer() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setOpenAccordion((currentTitle) =>
      currentTitle === title ? null : title,
    );
  };

  return (
    <div
      className={clsx(
        styles.footerWrapper,
        "max-md:!px-4 max-md:!pt-10 max-md:!pb-10 md:max-lg:!px-8 md:max-lg:!pt-16 md:max-lg:!pb-14",
      )}
    >
      <div
        className={clsx(
          styles.contentFooter,
          "max-md:!gap-7 max-md:!rounded-[28px] max-md:!px-5 max-md:!py-8 md:max-lg:!gap-8 md:max-lg:!px-10 md:max-lg:!py-12",
        )}
      >
        <div
          className={clsx(
            styles.infoFooter,
            "max-lg:!grid max-lg:!grid-cols-1 max-lg:!items-start max-lg:!gap-10 md:max-lg:!gap-12",
          )}
        >
          <div
            className={clsx(
              styles.projectInfoBlock,
              "max-lg:!max-w-none max-md:!gap-6 md:max-lg:!gap-8",
            )}
          >
            <h1 className={clsx(styles.footerLogo, "max-md:!text-[28px]")}>
              IMPACTFLOW
            </h1>
            <p>
              Your action today creates tomorrow's world. Every step you take in
              your community builds a foundation for global change
            </p>
            <div
              className={clsx(
                styles.contactsBlockFooter,
                "max-md:!gap-4 md:max-lg:!gap-5",
              )}
            >
              {socialLinks.map(({ Icon, href, label }) => (
                <span
                  key={label}
                  className={styles.footerTooltipWrapper}
                  data-tooltip={label}
                >
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={styles.socialLink}
                    whileHover={{ scale: 1.15 }}
                    transition={socialHoverTransition}
                  >
                    <Icon className={styles.socialIcon} fontSize="inherit" />
                  </motion.a>
                </span>
              ))}
            </div>
          </div>
          <div
            className={clsx(
              styles.navMenuBlockFooter,
              "max-md:!hidden md:max-lg:!grid md:max-lg:!w-full md:max-lg:!grid-cols-3 md:max-lg:!justify-normal md:max-lg:!gap-x-10 md:max-lg:!gap-y-0",
            )}
          >
            {footerLinkGroups.map(({ title, links }) => (
              <div
                key={title}
                className={clsx(styles.navBlockFooter, "md:max-lg:!gap-6")}
              >
                <h1>{title}</h1>
                <div className={styles.navInfo}>
                  {links.map((link) => (
                    <Link
                      key={`${title}-${link.href}-${link.title}`}
                      to={link.href}
                      className={styles.footerNavLink}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className={clsx(styles.footerAccordion, "max-md:!block md:!hidden")}
          >
            {footerLinkGroups.map(({ title, links }) => {
              const isOpen = openAccordion === title;

              return (
                <div key={`accordion-${title}`} className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionButton}
                    aria-expanded={isOpen}
                    aria-controls={`footer-accordion-${title}`}
                    onClick={() => toggleAccordion(title)}
                  >
                    <span>{title}</span>
                    <span className={styles.accordionIcon} aria-hidden="true">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`footer-accordion-${title}`}
                        className={styles.accordionPanel}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={accordionTransition}
                      >
                        <div className={styles.accordionLinks}>
                          {links.map((link) => (
                            <Link
                              key={`accordion-${title}-${link.href}-${link.title}`}
                              to={link.href}
                              className={styles.footerNavLink}
                              onClick={() => setOpenAccordion(null)}
                            >
                              {link.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.divideLineFooter}></div>
        <div
          className={clsx(
            styles.additionalInfoFooter,
            "max-md:!flex max-md:!flex-col max-md:!items-start max-md:!gap-5 md:max-lg:!grid md:max-lg:!grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:max-lg:!items-center md:max-lg:!gap-6",
          )}
        >
          <div className={styles.rightsCompany}>
            <img src={Copyright} alt="companyIssue" />
            <p>2025 ImpactFlow. All rights reserved </p>
          </div>
          <div
            className={clsx(
              styles.basicActionsFooter,
              "max-md:!flex-col max-md:!items-start max-md:!gap-3 md:max-lg:!flex-wrap md:max-lg:!justify-end md:max-lg:!gap-x-5 md:max-lg:!gap-y-3",
            )}
          >
            {rightLinks.map((link) => (
              <Link
                key={`meta-${link.href}-${link.title}`}
                to={link.href}
                className={clsx(
                  styles.footerMetaLink,
                  "max-md:!text-[16px] md:max-lg:!text-[16px]",
                )}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
