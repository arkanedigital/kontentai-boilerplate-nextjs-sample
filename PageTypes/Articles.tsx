import React from 'react';
import { useIntl } from 'react-intl';
import { Article, Article as ArticleType } from '../models/content-types/article';

interface ArticlesProps {
  data: Article[];
}

const Articles: React.FC<ArticlesProps> = ({ data }) => {
  const { locale: language, formatDate, formatMessage } = useIntl();
  // const [articles, setArticles] = useState(
  //   initLanguageCodeObjectWithArray<ArticleType>()
  // );

  // useEffect(() => {
  //   spinnerService.show('apiSpinner');

  //   const query = Client.items<ArticleType>()
  //     .type(contentTypes.article.codename)
  //     .orderByDescending('elements.post_date')
  //     .limitParameter(10);

  //   if (language) {
  //     query.languageParameter(language);
  //   }

  //   query.toPromise().then((response) => {
  //     const currentLanguage = language || defaultLanguage;

  //     spinnerService.hide('apiSpinner');
  //     setArticles((data) => ({
  //       ...data,
  //       [currentLanguage]: response.data.items as ArticleType[],
  //     }));
  //   });
  // }, [language]);

  const makeFormatDate = (value: string): string => {
    return formatDate(value, {
      month: 'long',
      day: 'numeric',
    });
  };

  let counter = 0;

  const articlesComponent = data.reduce(
    (result: JSX.Element[], article: ArticleType, index: number) => {
      if (index % 4 === 0) {
        result.push(<div className="clear" key={counter++} />);
      }

      const title =
        article.elements.title.value.trim().length > 0
          ? article.elements.title.value
          : formatMessage({ id: 'Articles.noTitleValue' });

      const postDate = makeFormatDate(article.elements.postDate.value!!);

      const imageLink =
        article.elements.teaserImage.value[0] !== undefined ? (
          <img
            alt={'Article ' + title}
            className="article-tile-image"
            src={article.elements.teaserImage.value[0].url}
            title={'Article ' + title}
          />
        ) : (
          <div className="article-tile-image placeholder-tile-image">
            {formatMessage({ id: 'noTeaserValue' })}
          </div>
        );

      const summary =
        article.elements.summary.value.trim().length > 0
          ? article.elements.summary.value
          : formatMessage({ id: 'noSummaryValue' });

      const link = `/article/${article.system.codename}`;

      result.push(
        <div className="col-md-3" key={counter++}>
          <div className="article-tile">
            {/* @TODO: fix link */}
            <a href={link}>{imageLink}</a>
            <div className="article-tile-date">{postDate}</div>
            <div className="article-tile-content">
              <h2 className="h4">
                {/* @TODO: fix link */}
                <a href={link}>{title}</a>
              </h2>
              <p className="article-tile-text">{summary}</p>
            </div>
          </div>
        </div>
      );

      return result;
    },
    []
  );
  return <div className="container">{articlesComponent}</div>;
};

export default Articles;
