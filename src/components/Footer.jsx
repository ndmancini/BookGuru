import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div>
          <br />
          CUSTOMER SERVICES <br />
          _______________________
          <br />
          <br />
          Contact Us <br /> Phone: 111111
          <br /> bookguru@books.com
        </div>

        <div>
          <br />
          SUSCRIPTIONS <br />
          _______________________
          <br />
          <br />
          BookGuru subscription <br /> My subscription
        </div>
        <div>
          <br />
          FOLLOW US <br />
          _______________________
          <br />
          <br />
          Instagram
          <br />
          Twitter <br />
          <div id="copywright" className="copyright">
            Copywright &copy; BookGuru
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
