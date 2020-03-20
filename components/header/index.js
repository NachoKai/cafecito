import React from "react";
import PropTypes from "prop-types";
import { Follow } from "react-twitter-widgets";

import { cafeConfig } from "../../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as moonSolid } from "@fortawesome/free-solid-svg-icons";
import { faMoon as moonRegular } from "@fortawesome/free-regular-svg-icons";
import { faCog as gearSolid } from "@fortawesome/free-solid-svg-icons";

import style from "./style.scss";

const { TWITTER, PROFILE_PHOTO } = cafeConfig;

const Header = ({ countCoffees, prefersDark, isAdmin, ...props }) => {
    const { setTheme, openModalCreateEvent } = props;

    return (
        <header className={style.headerContainer}>
            <div className={style.header}>
                <div className={style.profileImg}>
                    <img src={PROFILE_PHOTO} alt="" />
                </div>
                <div className={style.informationContainer}>
                    <div className={style.name}>{`@${TWITTER}`}</div>
                    {isAdmin && (
                        <FontAwesomeIcon
                            icon={gearSolid}
                            className={style.gear}
                            onClick={() => {
                                openModalCreateEvent(true, "openModalConfig");
                            }}
                            width="18"
                        />
                    )}
                    <div className={style.countCoffees}>
                        {countCoffees} cafecitos ☕️
                    </div>
                </div>

                <FontAwesomeIcon
                    key={Math.random()}
                    icon={prefersDark === "dark" ? moonSolid : moonRegular}
                    className={style.darkMode}
                    onClick={() => {
                        setTheme(prefersDark === "dark" ? "light" : "dark");
                    }}
                    width="22"
                />
            </div>

            <div className={style.twitter}>
                <Follow username={TWITTER} />
            </div>
        </header>
    );
};

Header.propTypes = {
    isAdmin: PropTypes.bool,
    countCoffees: PropTypes.number,
    prefersDark: PropTypes.string,
    setTheme: PropTypes.func,
    openModalCreateEvent: PropTypes.func,
};

export default Header;
