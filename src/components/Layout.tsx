import React, { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './generic/Footer';
import { Stack } from '@chakra-ui/layout';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <Stack maxWidth="768px" marginTop="20" marginX="auto" alignContent="center">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <main>{children}</main>
    <Footer />
  </Stack>
);

export default Layout;
