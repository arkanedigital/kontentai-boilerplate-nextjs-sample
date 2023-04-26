import React from 'react';
import Metadata from '../Components/Metadata';
import RichText from '../Components/RichText';
import { useIntl } from 'react-intl';
import { AboutUs } from '../models/content-types/about_us';
import { FactAboutUs } from '../models/content-types/fact_about_us';

interface AboutProps {
  data: AboutUs;
  url: string;
}

const About: React.FC<AboutProps> = ({ data, url }) => {
  const { locale: language, formatMessage } = useIntl();

  const factsComponent = (data.elements.facts.linkedItems as FactAboutUs[]).map(
      (fact: FactAboutUs, index: number) => {
        const title =
          fact.elements.title.value.trim().length > 0
            ? fact.elements.title.value
            : formatMessage({ id: 'About.noTitleValue' });

        const descriptionElement =
          fact.elements.description.value !== '<p><br></p>' ? (
            <RichText
              className="text-and-image-text"
              element={fact.elements.description}
            />
          ) : (
            <p className="text-and-image-text">
              {formatMessage({ id: 'About.noDescriptionValue' })}
            </p>
          );

        const imageLink =
          fact.elements.image.value[0] !== undefined ? (
            <img
              alt={title}
              className="img-responsive"
              src={fact.elements.image.value[0].url}
              title={title}
            />
          ) : (
            <div className="img-responsive placeholder-tile-image">
              {formatMessage({ id: 'About.noTeaserValue' })}
            </div>
          );

        if (index % 2 === 0) {
          return (
            <section className="row text-and-image" key={index}>
              <h2 className="col-lg-12">{title}</h2>
              <div className="col-md-6">{descriptionElement}</div>
              <div className="col-md-6">{imageLink}</div>
            </section>
          );
        }

        return (
          <section className="row text-and-image" key={index}>
            <h2 className="col-lg-12">{title}</h2>
            <div className="col-md-6 col-md-push-6">{descriptionElement}</div>
            <div className="col-md-6 col-md-pull-6">{imageLink}</div>
          </section>
        );
      }
    );

  return (
    <div className="container">
      <Metadata
        url={url}
        title={data.elements.metadataMetaTitle}
        description={data.elements.metadataMetaDescription}
        ogTitle={data.elements.metadataOgTitle}
        ogImage={data.elements.metadataOgImage}
        ogDescription={data.elements.metadataOgDescription}
        twitterTitle={data.elements.metadataMetaTitle}
        twitterSite={data.elements.metadataTwitterSite}
        twitterCreator={data.elements.metadataTwitterCreator}
        twitterDescription={data.elements.metadataTwitterDescription}
        twitterImage={data.elements.metadataTwitterImage}
      />
      {factsComponent}
    </div>
  );
};

export default About;
