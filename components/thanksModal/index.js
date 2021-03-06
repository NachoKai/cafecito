import React from "react";
import PropTypes from "prop-types";

import Modal from "../modal";

const ThanksModal = ({ openModal, openModalCreateEvent }) => {
    return (
        <Modal
            title="¡Gracias!"
            openModal={openModal}
            nameModal="openModal"
            openModalCreateEvent={openModalCreateEvent}
        >
            OMG! What!? Gracias por haberme ayudado! Lo valoro muchisimo! ❤️.
            Happy coding ✨.
        </Modal>
    );
};

ThanksModal.propTypes = {
    openModal: PropTypes.bool,
    openModalCreateEvent: PropTypes.func,
};

export default ThanksModal;
