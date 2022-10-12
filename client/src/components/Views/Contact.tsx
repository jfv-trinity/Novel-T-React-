import React, { useState } from "react";
import { Helmet } from "react-helmet";
import * as styles from "./Contact.scss";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <style>{`body { background-image: ${styles.default.background}; } `}</style>
      </Helmet>
      <div>
        <embed
          className="resume"
          src={styles.default.resume.slice(4, styles.default.resume.length - 1)}
        />
      </div>
      <div>
        <embed className="resume" src={styles.default.resume} />
      </div>
    </div>
  );
};

export default Contact;
