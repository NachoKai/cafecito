import React from "react";
import style from "./style.scss";

const Post = () => (
  <div className={style.postContainer}>
    <div className={style.post}>
      <p>
        Hola! Soy <strong>Nacho Caiafa</strong>.
      </p>
      <p>
        Estoy aprendiendo Javascript gracias a una iniciativa llamada
        <a
          href="https://argentinaprograma.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <strong> r/Argentina Programa</strong>
        </a>
      </p>
      <p>
        <strong>Mi Github: </strong>
        <a href="https://github.com/NachoKai" target="_blank" rel="noreferrer noopener">
          https://github.com/NachoKai
        </a>
      </p>
      <p>
        Tambien me gusta sacar fotos 📷 y las pueden ver en mi
        <strong> Instagram: </strong>
        <a
          href="https://www.instagram.com/nacho.kai/"
          target="_blank"
          rel="noreferrer noopener"
        >
          https://www.instagram.com/nacho.kai/
        </a>
      </p>
      <p>
        Si tenés ganas de darme una mano podés regalarme un café ☕️ y te lo voy a super
        agradecer! ❤️
      </p>
      <p>
        Y si querés podés dejar tu nombre y un mensaje para que quede guardado y sepa
        quien me está ayudando. Saludos!
      </p>
    </div>
  </div>
);

export default Post;
