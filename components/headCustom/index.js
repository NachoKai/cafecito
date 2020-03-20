import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";

import { cafeConfig, config } from "../../config";

const { TWITTER, FIRST_NAME, LAST_NAME } = cafeConfig;
const { URL } = config;

const HeadCustom = ({ share }) => (
    <Head>
        <meta
            property="og:url"
            content={`${URL}${
                share && share._id ? "/coffee/" + share._id : ""
            }`}
        />
        <meta
            property="og:title"
            content={`${FIRST_NAME} ${LAST_NAME} | Cafecito`}
        />
        <meta name="og:description" content="" />
        <meta property="og:site_name" content="Cafecito" />

        {share && share._id && (
            <meta
                property="og:image"
                content={`${URL}/static/imagesCoffee/${share._id}.png`}
            />
        )}

        <meta property="og:type" content="website" />
        <meta name="robots" content="noodp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`@${TWITTER}`} />
        <meta
            property="twitter:title"
            content={`${FIRST_NAME} ${LAST_NAME} | Cafecito`}
        />
        <meta name="twitter:creator" content={`@${TWITTER}`} />
        <meta name="twitter:description" content="" />

        {share && share._id && (
            <meta
                name="twitter:image"
                content={`${URL}/static/imagesCoffee/${share._id}.png`}
            />
        )}

        <meta
            itemProp="name"
            content={`${FIRST_NAME} ${LAST_NAME} | Cafecito`}
        />
        <meta itemProp="description" content="" />

        {share && share._id && (
            <meta
                itemProp="image"
                content={`${URL}/static/imagesCoffee/${share._id}.png`}
            />
        )}
    </Head>
);

HeadCustom.propTypes = {
    share: PropTypes.object,
};

export default HeadCustom;
