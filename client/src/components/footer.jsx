import React from 'react';
import '../styles/footer.css';

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
                <p>Don’t miss any updates of our new templates and extensions.!</p>
                <form action="#" className="f_subscribe_two" method="post">
                  <input type="text" name="EMAIL" className="form-control memail" placeholder="Email" />
                  <button className="btn btn_get btn_get_two" type="submit">Subscribe</button>
                </form>
              </div>
            </div>

            {/* Download */}
            <div className="col">
              <div className="f_widget about-widget">
                <h3 className="f-title">Download</h3>
                <ul className="f_list">
                  <li><a href="#">Company</a></li>
                  <li><a href="#">Android App</a></li>
                  <li><a href="#">iOS App</a></li>
                  <li><a href="#">Desktop</a></li>
                  <li><a href="#">Projects</a></li>
                  <li><a href="#">My tasks</a></li>
                </ul>
              </div>
            </div>

            {/* Help */}
            <div className="col">
              <div className="f_widget about-widget">
                <h3 className="f-title">Help</h3>
                <ul className="f_list">
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Reporting</a></li>
                  <li><a href="#">Documentation</a></li>
                  <li><a href="#">Support Policy</a></li>
                  <li><a href="#">Privacy</a></li>
                </ul>
              </div>
            </div>

            {/* Social */}
            <div className="col">
              <div className="f_widget social-widget">
                <h3 className="f-title">Team Solutions</h3>
                <div className="f_social_icon">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-pinterest"></i></a>
                </div>
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
              <p className="mb-0">© CakeCounter Inc. 2019 All rights reserved.</p>
            </div>
            <div className="col text-right">
              <p>Made with <i className="icon_heart"></i> in <a href="http://cakecounter.com" target="_blank" rel="noreferrer">CakeCounter</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
