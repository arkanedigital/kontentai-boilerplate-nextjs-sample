import { getAboutUs } from "../lib/kontentClient";
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { AboutUs } from '../models';
import Home from '../PageTypes/Home';
import About from "../PageTypes/About";
import { Socket } from "dgram";

interface AboutPageProps {
  data: AboutUs;
  url: string;
}

const AboutPage: NextPage<AboutPageProps> = (props) => {
  const lang = 'en-US';
  return (<About {...props} />);
}

export default AboutPage;

export const getServerSideProps: GetServerSideProps<AboutPageProps> = async(context) => {
  const scheme = !!(context.req.socket as any).getPeerCertificate ? 'https://' : 'http://';
  const host = context.req.headers.host;
  const path = context.req.url;
  const url = `${scheme}${host}${path}`;
  const data = await getAboutUs();
  
  return {
    props: {data, url}
  };
}

// export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
//   const data = await getAboutUs();
//   return {
//     props: {data}
//   };
// }