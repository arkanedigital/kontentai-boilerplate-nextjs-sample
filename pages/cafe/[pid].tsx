import { GetServerSideProps, NextPage } from 'next';
import About from "../../PageTypes/About";
import { Cafe } from "../../models";
import { getCafe } from "../../lib/kontentClient";
import Cafes from '../../PageTypes/Cafes';

interface CafePageProps {
  data: Cafe;
}

const CafePage: NextPage<CafePageProps> = ({data}) => {
  const lang = 'en-US';
  return (<pre>{JSON.stringify(data, undefined, 2)}</pre>);
  // return <Cafes data={data} />
}

export default CafePage;

export const getServerSideProps: GetServerSideProps<CafePageProps> = async(context) => {
  const data = await getCafe(context.query.pid);
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