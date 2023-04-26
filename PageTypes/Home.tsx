import React from 'react';
import Banner from '../Components/Banner';
import LatestArticles from '../Components/LatestArticles';
import LinkButton from '../Components/LinkButton';

import OurStory from '../Components/OurStory';
import TasteOurCoffee from '../Components/TasteOurCoffee';
import { getAboutUsLink } from '../Utilities/ContentLinks';
import { useIntl } from 'react-intl';
import { Home as HomeType } from '../models/content-types/home';
import { Article, Cafe, FactAboutUs, HeroUnit } from '../models';

interface Home {
  homeData: HomeType;
}

const Home: React.FC<Home> = ({ homeData }) => {
  const { locale: language, formatMessage } = useIntl();
  const homeElements = homeData.elements;
  const aboutUsLink = getAboutUsLink(language);

  return (
    <div className="container">
      {/* <Metadata
        title={homeElements.metadataMetaTitle}
        description={homeElements.metadataMetaDescription}
        ogTitle={homeElements.metadataOgTitle}
        ogImage={homeElements.metadataOgImage}
        ogDescription={homeElements.metadataOgDescription}
        twitterTitle={homeElements.metadataMetaTitle}
        twitterSite={homeElements.metadataTwitterSite}
        twitterCreator={homeElements.metadataTwitterCreator}
        twitterDescription={homeElements.metadataTwitterDescription}
        twitterImage={homeElements.metadataTwitterImage}
      /> */}
      {homeElements.heroUnit &&
        homeElements.heroUnit.linkedItems &&
        homeElements.heroUnit.linkedItems.length && (
          <Banner heroUnit={homeElements.heroUnit.linkedItems[0] as HeroUnit} />
        )}
      {homeElements.articles && (
        <LatestArticles articles={homeElements.articles.linkedItems as Article[]} />
      )}
      <LinkButton
        link={`/${language.toLowerCase()}/articles`}
        text={formatMessage({ id: 'Home.moreArticles' })}
      />
      {homeElements.ourStory &&
        homeElements.ourStory.linkedItems &&
        homeElements.ourStory.linkedItems.length && (
          <>
            <OurStory fact={homeElements.ourStory.linkedItems[0] as FactAboutUs} />
            <LinkButton
              link={`/${language.toLowerCase()}/${aboutUsLink}`}
              text={formatMessage({ id: 'Home.aboutLinkText' })}
            />
          </>
        )}
      {homeElements.cafes && homeElements.cafes.value && (
        <TasteOurCoffee cafes={homeElements.cafes.linkedItems as Cafe[]} />
      )}
      <LinkButton
        link={`/${language.toLowerCase()}/cafes`}
        text={formatMessage({ id: 'Home.cafesLinkText' })}
      />
    </div>
  );
};

export default Home;
