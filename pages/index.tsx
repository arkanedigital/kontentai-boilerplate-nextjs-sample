import { getCafe, getHome } from "../lib/kontentClient";
import { GetStaticProps, NextPage } from 'next';
import { Home as HomeType } from '../models';
import Layout from "../Components/Layout";
import Home from '../PageTypes/Home';

const Index: NextPage<IndexProps> = ({ homeData }) => {
  const lang = 'en-US';

  return (<Home homeData={homeData} />);
}

export default Index

interface IndexProps {
  homeData: HomeType;
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const homeData = await getHome();

  // @TODO: look into circlular ref issue with linkedItems[3]
  homeData.elements.articles.linkedItems = homeData.elements.articles.linkedItems.slice(0, 3); 
  return {
    props: {homeData}
  };
}