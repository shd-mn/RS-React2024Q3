import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/store';
import Head from 'next/head';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import ThemeProvider from '@/context/ThemeProvider';
import Layout from '@/components/Layout';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Head>
        <title>Star Wars Api</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary fallback="Something went wrong!">
            <Layout>
              <Component {...props.pageProps} />
            </Layout>
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </>
  );
}