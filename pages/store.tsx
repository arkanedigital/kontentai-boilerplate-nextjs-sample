import { getAboutUs, getCafe, getCafes } from "../lib/kontentClient";
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { AboutUs, Cafe } from '../models';
import Home from '../PageTypes/Home';
import About from "../PageTypes/About";
import { Socket } from "dgram";
import Cafes from "../PageTypes/Cafes";
import StoreLayout from "../Components/StoreLayout";

interface CafesPageProps {
  data: Cafe[];
}

const CafesPage: NextPage<CafesPageProps> = ({data}) => {
  const lang = 'en-US';
  // return (<pre>{JSON.stringify(data, undefined, 2)}</pre>);
  return <StoreLayout />;
}

export default CafesPage;

// export const getServerSideProps: GetServerSideProps<AboutPageProps> = async(context) => {
//   const scheme = !!(context.req.socket as any).getPeerCertificate ? 'https://' : 'http://';
//   const host = context.req.headers.host;
//   const path = context.req.url;
//   const url = `${scheme}${host}${path}`;
//   const data = await getAboutUs();
  
//   return {
//     props: {data, url}
//   };
// }

export const getStaticProps: GetStaticProps<CafesPageProps> = async () => {
  const data = await getCafes();
  return {
    props: {data}
  };
}