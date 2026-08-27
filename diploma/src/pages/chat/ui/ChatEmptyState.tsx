import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import styles from "./ChatPage.module.scss";

const typeDelay = 70;
const deleteDelay = 36;
const fullPhrasePause = 1300;
const emptyPhrasePause = 360;

const readPhraseList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter(
        (phrase): phrase is string =>
          typeof phrase === "string" && phrase.trim().length > 0,
      )
    : [];

export const ChatEmptyState = () => {
  const { t, i18n } = useTranslation("chat");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const phrases = useMemo(() => {
    const localized = readPhraseList(
      t("states.emptySelection.phrases", { returnObjects: true }),
    );
    return localized.length
      ? localized
      : [t("states.emptySelection.subtitle")];
  }, [t, i18n.resolvedLanguage]);
  const phraseKey = phrases.join("\u0001");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setPhraseIndex(0);
    setText(prefersReducedMotion ? (phrases[0] ?? "") : "");
    setIsDeleting(false);
  }, [phraseKey, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !phrases.length) return;

    const currentPhrase = phrases[phraseIndex % phrases.length] ?? "";
    let delay = isDeleting ? deleteDelay : typeDelay;

    if (!isDeleting && text === currentPhrase) {
      delay = fullPhrasePause;
    }

    if (isDeleting && text === "") {
      delay = emptyPhrasePause;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setPhraseIndex((currentIndex) => (currentIndex + 1) % phrases.length);
        return;
      }

      const nextLength = isDeleting ? text.length - 1 : text.length + 1;
      setText(currentPhrase.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, phraseIndex, phrases, prefersReducedMotion, text]);

  return (
    <div className={styles.emptyChatState}>
      <div className={styles.typewriterBubble} aria-hidden="true">
        <span className={styles.typewriterText}>{text || "\u00A0"}</span>
        {!prefersReducedMotion && <span className={styles.typewriterCursor} />}
      </div>
      <h2>{t("states.emptySelection.title")}</h2>
      <p>{t("states.emptySelection.subtitle")}</p>
    </div>
  );
};
