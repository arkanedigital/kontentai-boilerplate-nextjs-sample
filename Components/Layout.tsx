import * as React from "react";
import { IntlProvider } from "react-intl";
import { localizationObject } from "../Utilities/LocalizationLoader";
import Header from "./Header";

export type SetLanguageType = (newLanguage: string, newUrl?: string) => void;

interface LayoutProps {
  children: React.ReactNode[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [lang, setLang] = React.useState('en-US');

  const setLanguageCode: SetLanguageType = (newLanguage, newUrl) => {
    setLang(newLanguage);
  };

  return (
    <div>
      <IntlProvider locale={lang} messages={localizationObject[lang]}>
        <div className="application-content">
          <Header changeLanguage={setLanguageCode} />
          {children}
        </div>
      </IntlProvider>
    </div>
  );
};

export default Layout;