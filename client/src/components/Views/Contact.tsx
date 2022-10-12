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
          className="1"
          src={styles.default.resume.slice(4, styles.default.resume.length - 1)}
        />
      </div>
      <div>
        <embed className="2" src={styles.default.resume} />
      </div>
      <div>
        <img className="3" src={styles.default.srcBackground} />
      </div>
    </div>
  );
};

export default Contact;
