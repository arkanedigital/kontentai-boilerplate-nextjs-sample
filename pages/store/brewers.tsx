import { GetStaticProps, NextPage } from 'next';
import { Brewer } from "../../models";
import { getBrewers, getTaxonomy } from "../../lib/kontentClient";
import { ITaxonomyTerms } from '@kontent-ai/delivery-sdk';
import BrewerStoreContainer from '../../Components/BrewerStoreContainer';

interface BrewerPageProps {
  data: Brewer[];
  manufacturers: ITaxonomyTerms[];
  productStatuses: ITaxonomyTerms[];
}

const BrewerPage: NextPage<BrewerPageProps> = (props) => {
  const lang = 'en-US';
  // return (<pre>{JSON.stringify(data, undefined, 2)}</pre>);
  return <BrewerStoreContainer {...props} />;
}

export default BrewerPage;

export const getStaticProps: GetStaticProps<BrewerPageProps> = async () => {
  const data = await getBrewers();
  const manufacturers = await getTaxonomy('manufacturer');
  const productStatuses = await getTaxonomy('product_status');
  return {
    props: {data, manufacturers, productStatuses}
  };
}