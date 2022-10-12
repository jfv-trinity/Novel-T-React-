import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./Contact.scss";
import pdf from "../../static/myResume.pdf";
import background from "../../static/images/resume-background.jpg";

const Contact = () => {
  return (
    <div>
      <Helmet>
        {/* <style>{`body { background-image: ${background}; } `}</style> */}
        <style>{`body { background-image: ${`url(${background});`} `}</style>
      </Helmet>
      <embed className="resume" src={pdf} />
    </div>
  );
};

export default Contact;
