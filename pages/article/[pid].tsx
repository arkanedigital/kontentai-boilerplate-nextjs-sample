import { GetServerSideProps, NextPage } from 'next';
import { Article as ArticleType } from "../../models";
import { getArticle } from "../../lib/kontentClient";
import Article from '../../PageTypes/Article';

interface ArticlePageProps {
  data: ArticleType;
}

const ArticlePage: NextPage<ArticlePageProps> = ({data}) => {
  const lang = 'en-US';
  // return (<pre>{JSON.stringify(data, undefined, 2)}</pre>);
  return <Article data={data} />
}

export default ArticlePage;

export const getServerSideProps: GetServerSideProps<ArticlePageProps> = async(context) => {
  const data = await getArticle(context.query.pid);
  return {
    props: {data}
  };
}

// export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
//   const data = await getAboutUs();
//   return {
//     props: {data}
//   };
// }