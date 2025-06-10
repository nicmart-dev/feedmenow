import React, { createContext, useState, useEffect } from "react";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import messages from "./strings.json";
import { getLocale } from "./utils";

const cache = createIntlCache();

export const LanguageContext = createContext(); // Export LanguageContext

const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
      try {
          setLocale(JSON.parse(localStorage.getItem('userSettings'))["lang"]);
      } catch (error) {
          setLocale(getLocale());
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
          const localJSON = JSON.parse(localStorage.getItem('userSettings'));
          localJSON["lang"] = lang;
          localStorage.setItem('userSettings', JSON.stringify(localJSON));
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
