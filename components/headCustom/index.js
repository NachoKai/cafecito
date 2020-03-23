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
        <link
            href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA+vr6ABk1XgDW1tYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzMzAAAAAAAxEREwAAAAAxERERMzAAAxEREREREwADERERERMRMAMRERERExEwAxEiIiETETADEiIiIhETAAAxERERMzAAAAMzMzMAAAAAAAAAAAAAAAAAAAIgAAAAAAAAIAAAAAAAAAACAAAAAAAAAAAgAAAAAAAAAgAAAADwfwAA4D8AAMAHAACAAwAAgAEAAIABAACAAQAAgAMAAMAHAADgPwAA//8AAP5/AAD9/wAA/v8AAP9/AAD+/wAA"
            rel="icon"
            type="image/x-icon"
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noodp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`@${TWITTER}`} />
        <meta
            property="twitter:title"
            content={`${FIRST_NAME} ${LAST_NAME} | Cafecito`}
        />
        <meta
            name="description"
            content="Cafecito es un proyecto hecho en Next.JS con Express.JS y MongoDB para recibir cafés a modo de donaciones."
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
        <meta
            itemProp="description"
            content="Cafecito es un proyecto hecho en Next.JS con Express.JS y MongoDB para recibir cafés a modo de donaciones."
        />

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
