import Head from "next/head";
import React from "react";
import Navbar from "../Navbar/Navbar";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Head>
        <title>Ghazy EC Store</title>
      </Head>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
