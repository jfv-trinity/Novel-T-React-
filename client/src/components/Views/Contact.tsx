import React, { useState } from "react";
import { Helmet } from "react-helmet";
import * as styles from "./Contact.scss";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <style>{`body { background-image: ${styles.default.background}; } `}</style>
      </Helmet>
      <embed
        className="resume"
        src={styles.default.resume.slice(4, styles.default.resume.length - 1)}
      />
      <embed className="resume" src={styles.default.resume} />
    </div>
  );
};

export default Contact;
