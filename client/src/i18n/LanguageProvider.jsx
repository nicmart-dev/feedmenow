import React, { createContext, useState, useEffect } from "react";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import messages from "./strings.json";
import { getLocale } from "./utils";

const cache = createIntlCache();

export const LanguageContext = createContext(); // Export LanguageContext

const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  const intl = createIntl(
    {
      locale,
      messages: messages[locale],
    },
    cache
  );

  const switchLanguage = (lang) => {
      console.log("Switch Language function");
    setLocale(lang);
  };

  return (
    <LanguageContext.Provider value={{ switchLanguage, locale }}>
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
