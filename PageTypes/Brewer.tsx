import React from 'react';
import Metadata from '../Components/Metadata';
import RichText from '../Components/RichText';
import { useIntl } from 'react-intl';
import { Brewer as BrewerType } from '../models/content-types/brewer';

interface BrewerProps {
  data: BrewerType;
}

const Brewer: React.FC<BrewerProps> = ({ data }) => {
  const { locale: language, formatMessage } = useIntl();

  if (!data) {
    return <div className="container" />;
  }

  const name =
    data.elements.productName.value.trim().length > 0
      ? data.elements.productName.value
      : formatMessage({ id: 'Brewer.noNameValue' });

  const imageLink =
    data.elements.image.value[0] !== undefined ? (
      <img
        alt={name}
        src={data.elements.image.value[0].url}
        title={name}
      />
    ) : (
      <div className="placeholder-tile-image">
        {formatMessage({ id: 'noTeaserValue' })}
      </div>
    );

  const descriptionElement =
    data.elements.longDescription.value !== '<p><br></p>' ? (
      <RichText element={data.elements.longDescription} />
    ) : (
      <p>{formatMessage({ id: 'noDescriptionValue' })}</p>
    );

  return (
    <div className="container">
      <Metadata
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
      <article className="product-detail">
        <div className="row">
          <div className="col-md-12">
            <header>
              <h2>{name}</h2>
            </header>
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-7 col-md-6">
            <figure className="image">{imageLink}</figure>
            <div className="description">{descriptionElement}</div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Brewer;
