import { useEffect, useState } from "react";

export const useTypewriter = (words: readonly string[]) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex] ?? "";
    let delay = isDeleting ? 45 : 80;

    if (!isDeleting && text === currentWord) {
      delay = 1800;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
        return;
      }

      const nextLength = isDeleting ? text.length - 1 : text.length + 1;
      setText(currentWord.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, text, wordIndex, words]);

  return text;
};
