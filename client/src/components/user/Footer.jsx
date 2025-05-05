import React from "react";
import "../../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="new_footer_area bg_color">
      <div className="new_footer_top">
        <div className="container">
          <div className="row">
            {/* Get in Touch */}
            <div className="col">
              <div className="f_widget company_widget">
                <h3 className="f-title">Get in Touch</h3>
                <p>
                  Don’t miss any updates of our new templates and extensions.!
                </p>
              </div>
            </div>

            {/* Download */}
            <div className="f_widget">
              <h3 className="f-title">Download</h3>
              <div className="f_list">
                <Link to={"/"}>Home</Link>
                <Link to={"/books"}>Books</Link>
                <Link to={"/about"}>About</Link>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer_bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col text-left">
              <p className="mb-0">
                © CakeCounter Inc. 2019 All rights reserved.
              </p>
            </div>
            <div className="col text-right">
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
