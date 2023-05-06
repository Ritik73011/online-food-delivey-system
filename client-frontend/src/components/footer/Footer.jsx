import React from "react";
import "./footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>Company Name</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="col-md-4">
            <h3>Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/foods">Foods</a>
              </li>
              <li>
                <a href="/about-us">About Us</a>
              </li>
              <li>
                <a href="/contact-us">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <i className="fa fa-phone"></i> +91 123 456 789 2
              </li>
              <li>
                <i className="fa fa-envelope"></i> email@example.com
              </li>
              <li>
                <i className="fa fa-map-marker"></i> 123 abcdefg, Anytown INDIA
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copy">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
