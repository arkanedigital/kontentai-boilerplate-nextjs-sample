import React from 'react';
import RichText from '../Components/RichText';
import Metadata from '../Components/Metadata';
import { useIntl } from 'react-intl';
import { Article as ArticleType } from '../models/content-types/article';

interface ArticleProps {
  data: ArticleType;
}

const Article: React.FC<ArticleProps> = ({ data }) => {
  const { locale: language, formatDate, formatMessage } = useIntl();

  if (!data) {
    return <div className="container" />;
  }

  const makeFormatDate = (value: string): string => {
    return formatDate(value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const title =
    data.elements.title.value.trim().length > 0
      ? data.elements.title.value
      : formatMessage({ id: 'Article.noTitleValue' });

  const imageLink =
    data?.elements.teaserImage.value[0] !== undefined ? (
      <img
        alt={title}
        className="img-responsive"
        src={data.elements.teaserImage.value[0].url}
        title={title}
      />
    ) : (
      <div className="img-responsive placeholder-tile-image">
        {formatMessage({ id: 'Article.noTeaserValue' })}
      </div>
    );

  const postDate = makeFormatDate(data.elements.postDate.value!);

  const bodyCopyElement =
    data.elements.bodyCopy.value !== '<p><br></p>' ? (
      <RichText
        className="article-detail-content"
        element={data.elements.bodyCopy}
      />
    ) : (
      <p className="article-detail-content">
        {formatMessage({ id: 'Article.noBodyCopyValue' })}
      </p>
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
      <article className="article-detail col-lg-9 col-md-12 article-detail-related-box">
        <h2>{title}</h2>
        <div className="article-detail-datetime">{postDate}</div>
        <div className="row">
          <div className="article-detail-image col-md-push-2 col-md-8">
            {imageLink}
          </div>
        </div>
        <div className="row">{bodyCopyElement}</div>
      </article>
    </div>
  );
};

export default Article;
