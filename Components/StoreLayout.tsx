import * as React from 'react';
import { useIntl } from 'react-intl';

interface StoreLayoutProps {
  children?: React.ReactNode[];
}

const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="container">
      <div className="container product-page-container">
        <nav className="sub-menu row">
          <div className="store-menu-list row">
            <ul>
              <li>
                <a href={`coffees`}>
                  {formatMessage({ id: 'Store.coffeesLinkTitle' })}
                </a>
              </li>
              <li>
                <a href={`/store/brewers`}>
                  {formatMessage({ id: 'Store.brewersLinkTitle' })}
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {children}
      </div>
    </div>
  );
};

export default StoreLayout;