import React, { createContext, useState, useEffect } from "react";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import messages from "./strings.json";
import { getLocale } from "./utils";

const cache = createIntlCache();

export const LanguageContext = createContext(); // Export LanguageContext

const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
      const lang = JSON.parse(localStorage.getItem("userSettings"))["lang"];

      if(lang) {
          setLocale(lang);
      } else {
          const locale = getLocale();
          const ls = JSON.parse(localStorage.getItem("userSettings"));
          ls["lang"] = locale;
          localStorage.setItem("userSettings", JSON.stringify(ls));
          setLocale(locale);
      }
  }, []);

  const intl = createIntl(
    {
      locale,
      messages: messages[locale],
    },
    cache
  );

  const switchLanguage = (lang) => {
      try {
          const ls = JSON.parse(localStorage.getItem('userSettings'));
          ls["lang"] = lang;
          localStorage.setItem('userSettings', JSON.stringify(ls));
      } catch (error) {
          console.error(error);
      }

      setLocale(lang);
  };

  return (
    <LanguageContext.Provider value={{ switchLanguage, locale }}>
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
