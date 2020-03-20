import React, { useState } from "react";
import style from "./style.scss";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { cafeConfig } from "../../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

import { sendAnswer, deleteCoffee } from "../../utils/api";
const API = { sendAnswer, deleteCoffee };
const { SHOW_DATE_COFFEE } = cafeConfig;

const Coffee = ({ setShare, coffee, loadNewCoffees, password, isAdmin }) => {
    const [isOpenTextInput, setIsOpenTextInput] = useState(false);
    const [answer, setAnswer] = useState("");

    const openTextInput = () => {
        setIsOpenTextInput(true);
        setAnswer(coffee.answer || "");
    };

    const _sendAnswer = async idCoffee => {
        if (!answer.length) {
            return;
        }

        setAnswer("");
        setIsOpenTextInput(false);

        await API.sendAnswer({ idCoffee, answer, password });

        loadNewCoffees();
    };

    const _deleteCoffee = async idCoffee => {
        const confirmDelete = window.confirm(
            `¿Estás seguro que querés borrar el mensaje?`
        );

        if (confirmDelete) {
            await API.deleteCoffee({ idCoffee, password });
        }

        loadNewCoffees();
    };

    return (
        <section className={style.coffeeContainer}>
            <div className={style.coffee}>
                <FontAwesomeIcon
                    icon={faShareAlt}
                    className={style.shareIcon}
                    onClick={() => {
                        setShare(coffee);
                    }}
                    width="20"
                />

                <div className={style.q}>
                    <div className={style.name}>
                        {coffee.name ? coffee.name : "Anónimo"}
                        <span>
                            {` regaló ${coffee.countCoffees} ${
                                coffee.countCoffees > 1 ? "cafés" : "café"
                            }`}
                            {SHOW_DATE_COFFEE &&
                                ` el ${dayjs(coffee.createdAt).format(
                                    "DD-MM-YYYY"
                                )}`}
                        </span>
                    </div>
                    {coffee.message && (
                        <span className={style.text}>{coffee.message}</span>
                    )}
                </div>
                {coffee.answer && (
                    <div className={style.answer}>{coffee.answer}</div>
                )}
                {isAdmin &&
                    (!isOpenTextInput ? (
                        <div className={style.buttons}>
                            <button onClick={openTextInput}>
                                {!coffee.answer ? "Responder" : "Editar"}
                            </button>
                            <button
                                className={style.dangerButton}
                                onClick={() => _deleteCoffee(coffee._id)}
                            >
                                Borrar
                            </button>
                        </div>
                    ) : (
                        <>
                            <textarea
                                placeholder="Respuesta"
                                value={answer}
                                onChange={e => {
                                    setAnswer(e.target.value);
                                }}
                            ></textarea>
                            <button onClick={() => _sendAnswer(coffee._id)}>
                                Enviar
                            </button>
                        </>
                    ))}
            </div>
        </section>
    );
};

Coffee.propTypes = {
    setShare: PropTypes.func,
    coffee: PropTypes.shape({
        answer: PropTypes.string,
        name: PropTypes.string,
        countCoffees: PropTypes.number,
        createdAt: PropTypes.string,
        message: PropTypes.string,
        _id: PropTypes.string,
    }),
    loadNewCoffees: PropTypes.any,
    password: PropTypes.any,
    isAdmin: PropTypes.bool,
};

export default Coffee;
