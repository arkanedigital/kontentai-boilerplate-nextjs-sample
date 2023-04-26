import { getArticles } from "../lib/kontentClient";
import { GetStaticProps, NextPage } from 'next';
import { Article } from '../models';
import Articles from "../PageTypes/Articles";

interface ArticlesPageProps {
  data: Article[];
}

const ArticlesPage: NextPage<ArticlesPageProps> = ({ data }) => {
  const lang = 'en-US';
  // return (<pre>{JSON.stringify(data, undefined, 2)}</pre>);
  return (<Articles data={data} />);
}

export default ArticlesPage;

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async () => {
  const data = await getArticles();
  return {
    props: {data}
  };
}