import React, { useState } from "react";
import PropTypes from "prop-types";

import Qr from "../qr";

import { getCustomCoffeeQR } from "../../utils/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft as arrowLeft } from "@fortawesome/free-solid-svg-icons";

import style from "./style.scss";

const API = { getCustomCoffeeQR };

const QrForm = ({ setView }) => {
    const [qr, setQr] = useState("");
    const [form, setForm] = useState({
        title: "",
        description: "",
        message: "",
    });

    const handleChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value,
        });
    };

    const getCustomCoffeeQR = async () => {
        const { qr } = await API.getCustomCoffeeQR({
            title,
            description,
            message,
        });

        setQr(qr);
    };

    const { title, description, message } = form;

    return (
        <div>
            <FontAwesomeIcon
                icon={arrowLeft}
                className={style.arrowLeft}
                onClick={() => {
                    setView("main");
                }}
                width="18"
            />
            <h3 className={style.configTitle}>Create custom coffee</h3>

            {qr.length === 0 ? (
                <>
                    <input
                        name="title"
                        className={style.input}
                        onChange={handleChange}
                        value={title}
                        placeholder="Titulo"
                        type="text"
                    />
                    <input
                        name="description"
                        className={style.input}
                        onChange={handleChange}
                        value={description}
                        placeholder="Descripcion"
                        type="text"
                    />
                    <input
                        name="message"
                        className={style.input}
                        onChange={handleChange}
                        value={message}
                        placeholder="Mensaje (aparecerá en tu home)"
                        type="text"
                    />
                    <button
                        className={style.buttonSubmit}
                        onClick={getCustomCoffeeQR}
                    >
                        {" "}
                        Generate QR{" "}
                    </button>
                </>
            ) : (
                <Qr base64={qr} />
            )}
        </div>
    );
};

QrForm.propTypes = {
    setView: PropTypes.func,
};

export default QrForm;
