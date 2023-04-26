import { GetServerSideProps, NextPage } from 'next';
import { Brewer as BrewerType } from "../../models";
import { getBrewer } from "../../lib/kontentClient";
import Brewer from '../../PageTypes/Brewer';

interface BrewerPageProps {
  data: BrewerType;
}

const BrewerPage: NextPage<BrewerPageProps> = ({data}) => {
  const lang = 'en-US';
  // return (<pre>{JSON.stringify(data, undefined, 2)}</pre>);
  return <Brewer data={data} />
}

export default BrewerPage;

export const getServerSideProps: GetServerSideProps<BrewerPageProps> = async(context) => {
  const data = await getBrewer(context.query.pid);
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