import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import HeadCustom from "../../components/headCustom";
import Header from "../../components/header";
import InputText from "../../components/inputText";
import Coffee from "../../components/coffee";
import Post from "../../components/post";
import ThanksModal from "../../components/thanksModal";
import ShareModal from "../../components/shareModal";
import ConfigModal from "../../components/configModal";

import { useTheme } from "../../hooks/useTheme";

import { fetchCoffees, fetchCoffee } from "../../utils/api";
import queryConvert from "../../utils/queryConvert";

import style from "./style.scss";

const API = { fetchCoffees, fetchCoffee };

const Home = props => {
    const { coffees: preFetchedCoffees, showThankYou, query } = props;

    const [coffees, setCoffees] = useState(preFetchedCoffees);
    const [theme, setTheme] = useTheme();
    const [state, setState] = useState(() => {
        let coffeeShare = "";

        if (query.coffee === "coffee" && query.id) {
            coffeeShare = coffees.coffees.find(coffee => {
                if (coffee._id == query.id) {
                    return coffee;
                }
            });
        }

        return {
            isAdmin: false,
            password: "",
            openModal: showThankYou,
            openModalShare: coffeeShare && coffeeShare._id ? true : false,
            openModalConfig: false,
            share: coffeeShare || {},
        };
    });

    useEffect(() => {
        const arQueries = queryConvert();

        setState({
            ...state,
            isAdmin: arQueries.isAdmin,
            password: arQueries.password,
        });
    }, []);

    const loadNewCoffees = async () => {
        const coffees = await API.fetchCoffees();
        setCoffees(coffees);
    };

    const openModalCreateEvent = (status, type) => {
        setState({
            ...state,
            [type]: status,
        });
    };

    const setShare = coffee => {
        setState({
            ...state,
            share: coffee,
            openModalShare: true,
        });
    };

    const {
        isAdmin,
        password,
        openModal,
        openModalShare,
        openModalConfig,
        share,
    } = state;

    return (
        <>
            <HeadCustom share={share} />

            <Header
                countCoffees={coffees.countCoffees}
                isAdmin={isAdmin}
                prefersDark={theme}
                setTheme={setTheme}
                openModalConfig={openModalConfig}
                openModalCreateEvent={openModalCreateEvent}
            />

            <InputText />

            <h3 className={style.titleDescription}>Descripción</h3>
            <Post />

            <h3 className={style.title}>Cafés</h3>
            {coffees.coffees.map((coffee, key) => (
                <Coffee
                    setShare={setShare}
                    isAdmin={isAdmin}
                    password={password}
                    key={key}
                    coffee={coffee}
                    loadNewCoffees={loadNewCoffees}
                />
            ))}

            {!coffees.countCoffees && (
                <div className={style.waitingCoffee}>
                    <span>En espera ☕️</span>
                </div>
            )}

            <ThanksModal
                openModal={openModal}
                openModalCreateEvent={openModalCreateEvent}
            />

            <ShareModal
                share={share}
                openModalShare={openModalShare}
                openModalCreateEvent={openModalCreateEvent}
            />

            <ConfigModal
                openModalConfig={openModalConfig}
                openModalCreateEvent={openModalCreateEvent}
            />
        </>
    );
};

Home.getInitialProps = async ({ query }) => {
    const externalReference = query.external_reference;

    const coffees = await fetchCoffees(query);

    if (externalReference) {
        const { coffeeId } = JSON.parse(externalReference);

        const result = fetchCoffee(coffeeId);

        return {
            coffees,
            showThankYou: result.data.showThankYou,
            query,
        };
    }

    return { coffees, showThankYou: false, query };
};

Home.propTypes = {
    coffees: PropTypes.object,
    showThankYou: PropTypes.bool,
    query: PropTypes.object,
};

export default Home;
