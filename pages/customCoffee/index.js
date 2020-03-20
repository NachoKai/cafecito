import React, { useState } from "react";
import PropTypes from "prop-types";

import CoffePicker from "../../components/coffeePicker";

import { useTheme } from "../../hooks/useTheme";

import styles from "./style.scss";

import { sendCoffee } from "../../utils/api";
import { cafeConfig } from "../../config";

const { PROFILE_PHOTO } = cafeConfig;
const COFFEE_PRICE = 50;
const API = { sendCoffee };

const ProfileImg = ({ imgSrc }) => (
    <div className={styles.profileImg}>
        <img src={imgSrc} alt="profile-img" />
    </div>
);

const RedirectIcon = ({ url }) => (
    <a href={url} className={styles.redirect}>
        <img src="/imgs/redirect-icon.svg" alt="redirect-icon" />
    </a>
);

const CustomCoffee = ({ title, description, message }) => {
    useTheme();
    const [state, setState] = useState({
        name: "",
        countCoffees: 1,
        loading: false,
    });

    const sendCoffee = async () => {
        const { name, countCoffees } = state;

        setState({
            ...state,
            loading: true,
        });

        const { mercadoPagoLink } = await API.sendCoffee({
            name,
            message,
            countCoffees,
        });

        window.location.href = mercadoPagoLink;
    };

    const setCount = value => {
        setState({
            ...state,
            countCoffees: value < 1 ? 1 : value,
        });
    };

    const handleFormChange = e => {
        setState({
            ...state,
            name: e.target.value,
        });
    };

    const { countCoffees, name } = state;

    return (
        <div className={styles.main}>
            <div className={styles.modalContainer}>
                <ProfileImg imgSrc={PROFILE_PHOTO} />

                <div className={styles.contentContainer}>
                    <RedirectIcon url="/" />

                    <h1 className={styles.title}>{title}</h1>
                    <h3 className={styles.description}>{description}</h3>

                    <CoffePicker
                        countCoffees={countCoffees}
                        setCount={setCount}
                    />

                    <input
                        className={styles.input}
                        placeholder="Nombre o @Twitter (opcional)"
                        value={name}
                        onChange={handleFormChange}
                        type="text"
                    />
                    <button className={styles.submit} onClick={sendCoffee}>
                        Invitame {countCoffees}{" "}
                        {countCoffees > 1 ? "cafés" : "café"} ($
                        {countCoffees * COFFEE_PRICE})
                    </button>
                </div>
            </div>
        </div>
    );
};

CustomCoffee.getInitialProps = async ({ query }) => {
    const title = query.title || "";
    const description = query.description || "";
    const message = query.message || "";

    return { title, description, message };
};

ProfileImg.propTypes = {
    imgSrc: PropTypes.string,
};

RedirectIcon.propTypes = {
    url: PropTypes.string,
};

CustomCoffee.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    message: PropTypes.string,
};

export default CustomCoffee;
