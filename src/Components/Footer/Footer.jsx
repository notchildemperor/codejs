import React from 'react';
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <div className="container">
      <footer>
        <section className="ft-main">
          <div className="ft-main-item">
            <h2 className="ft-title">About</h2>
            <ul>
              <li><a href="#">Services</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="ft-main-item">
            <h2 className="ft-title">Resources</h2>
            <ul>
              <li><a href="#">Docs</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">eBooks</a></li>
              <li><a href="#">Webinars</a></li>
            </ul>
          </div>
          <div className="ft-main-item">
            <h2 className="ft-title">Contact</h2>
            <ul>
              <li><a href="#">Help</a></li>
              <li><a href="#">Sales</a></li>
              <li><a href="#">Advertise</a></li>
            </ul>
          </div>
          <div className="ft-main-item">
            <h2 className="ft-title">Stay Updated</h2>
            <p>Subscribe to our newsletter to get our latest news.</p>
            <form>
              <label htmlFor="email">Enter email address</label>
              <input type="email" name="email" className='email-subscribe' placeholder="Enter email address" />
              <input type="submit" value="Subscribe" />
            </form>
          </div>
        </section>
        <section className="ft-social">
          <ul className="ft-social-list">
            <li><a href='https://www.facebook.com/zuck/?locale=id_ID'>< FaFacebook style={{ textDecoration: 'none' }}/></a></li>
            <li><a href='https://twitter.com/elonmusk?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'><FaTwitter style={{textDecoration: 'none'}}/></a></li>
            <li><a href="https://www.instagram.com/dhaniradith_/" ><FaInstagram style={{ textDecoration: 'none' }}/></a></li>
            <li><a href="#"><FaYoutube /></a></li>
          </ul>
        </section>
        <section className="ft-legal">
          <ul className="ft-legal-list">
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li>&copy; 2024 Copyright E-commerce Enjoyer</li>
          </ul>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
