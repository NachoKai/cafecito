import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cafeConfig } from "../../config";

import Modal from "../modal";

import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import style from "./style.scss";

const { SHOW_DATE_COFFEE, PROFILE_PHOTO, TWITTER } = cafeConfig;

const ShareModal = ({ share, openModalShare, openModalCreateEvent }) => {
    const copyLink = () => {
        const linkToGo = `${process.env.URL}/coffee/${share._id}`;

        if (typeof navigator.clipboard == "undefined") {
            const textArea = document.createElement("textarea");
            textArea.value = linkToGo;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            document.execCommand("copy");

            document.body.removeChild(textArea);
            return;
        }

        navigator.clipboard.writeText(linkToGo);
    };

    const shareTwitter = () => {
        const linkToGo = `${process.env.URL}/coffee/${share._id}`;

        window.open(
            `https://twitter.com/intent/tweet?text=${linkToGo}`,
            "targetWindow",
            "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250"
        );
        return false;
    };

    return (
        <Modal
            title="Compartir"
            openModal={openModalShare}
            nameModal="openModalShare"
            openModalCreateEvent={openModalCreateEvent}
        >
            <div className={style.q}>
                <div className={style.name}>
                    {share.name ? share.name : "Anónimo"}
                    <span>
                        {` regaló ${share.countCoffees} ${
                            share.countCoffees > 1 ? "cafés" : "café"
                        }`}
                        {SHOW_DATE_COFFEE &&
                            ` el ${dayjs(share.createdAt).format(
                                "DD-MM-YYYY"
                            )}`}
                    </span>
                </div>
                {share.message && (
                    <span className={style.text}>{share.message}</span>
                )}
            </div>
            <div className={style.profile}>
                <div className={style.profileImg}>
                    <img src={PROFILE_PHOTO} alt="profile" />
                </div>
                <span>{`@${TWITTER}`}</span>
            </div>

            <div className={style.buttonShare}>
                <button
                    className={style.buttonTwitter}
                    onClick={() => shareTwitter()}
                >
                    <FontAwesomeIcon icon={faTwitter} width="14" /> Twitter
                </button>
                <button className={style.buttonCopy} onClick={() => copyLink()}>
                    <FontAwesomeIcon icon={faCopy} width="14" /> Copiar Link
                </button>
            </div>
        </Modal>
    );
};

ShareModal.propTypes = {
    share: PropTypes.object,
    openModalShare: PropTypes.bool,
    openModalCreateEvent: PropTypes.func,
};

export default ShareModal;
