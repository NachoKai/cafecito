import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { cafeConfig } from "../config";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/style.scss";

import { config as configFA } from "@fortawesome/fontawesome-svg-core";
configFA.autoAddCss = false;

const { FIRST_NAME, LAST_NAME } = cafeConfig;

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>
                    {FIRST_NAME} {LAST_NAME} | Cafecito
                </title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object,
};

export default MyApp;
