import { memo } from 'react';
import Head from 'next/head';

const Layout = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        {/* can be enhance common meta data for reuse page */}
        <title>{ title }</title>
      </Head>
      { children }
      <style jsx global>{`
        @font-face {
          font-family: "Roboto";
          src: url("/font/Roboto/Roboto-Light.ttf") format("truetype");
          font-weight: 300;
        }
        
        @font-face {
          font-family: "Roboto";
          src: url("/font/Roboto/Roboto-Medium.ttf") format("truetype");
          font-weight: 500;
        }
        
        @font-face {
          font-family: "Roboto";
          src: url("/font/Roboto/Roboto-Bold.ttf") format("truetype");
          font-weight: 700;
        }

        * {
          box-sizing: border-box;
          font-family: 'Roboto', sans-serif;
        }

        .container {
          max-width: 768px;
          margin: 0 auto;
          padding: 0 30px;
          @media (min-width: 1024px) {
            max-width: 1024px;
          } 
          @media (min-width: 1200px) {
            max-width: 1200px;
          } 
        }
      `}</style>
    </>
  )
}


export default memo(Layout);
