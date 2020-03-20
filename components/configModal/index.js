import React, { useState } from "react";
import PropTypes from "prop-types";

import QrForm from "./QrForm";
import Modal from "../modal";

import style from "./style.scss";

const ConfigModal = ({ openModalConfig, openModalCreateEvent }) => {
    const [view, setView] = useState("main");

    return (
        <Modal
            title="Configuration"
            openModal={openModalConfig}
            nameModal="openModalConfig"
            openModalCreateEvent={openModalCreateEvent}
        >
            {view === "main" && (
                <button
                    className={style.optionButton}
                    onClick={() => {
                        setView("qr");
                    }}
                >
                    {" "}
                    Create custom coffe QR{" "}
                </button>
            )}
            {view === "qr" && <QrForm setView={setView} />}
        </Modal>
    );
};

ConfigModal.propTypes = {
    openModalConfig: PropTypes.bool,
    openModalCreateEvent: PropTypes.func,
};

export default ConfigModal;
