import React from "react";
import PropTypes from "prop-types";

import style from "./styles.scss";

const Qr = ({ base64 }) => (
    <div className={style.qrContainer}>
        <img src={base64} />
    </div>
);

Qr.propTypes = {
    base64: PropTypes.string,
};

export default Qr;
