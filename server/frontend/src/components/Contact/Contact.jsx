import React from 'react';
import Header from '../Header/Header';
import contactus from '../assets/contactus.png';
import '../assets/style.css';
import '../assets/bootstrap.min.css';

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="card" style={{ width: '80%', margin: 'auto', marginTop: '5%' }}>
        <div className="banner" name="contact-header" style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Contact Dealerships Support</h2>
          <p style={{ color: '#555' }}>
            We are here to assist you with any inquiries regarding dealerships, vehicle listings, or reviews.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto', padding: '20px', gap: '30px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{ width: '45%', textAlign: 'center' }}>
            <img src={contactus} alt="Contact Us" style={{ maxWidth: '85%', height: 'auto', borderRadius: '8px' }} />
          </div>

          <div style={{ width: '50%', fontSize: '1.05rem', lineHeight: '1.8' }}>
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ color: 'darkturquoise', fontWeight: 'bold' }}>Headquarters & Support</h4>
              <hr />
              <p>
                <strong>National Headquarters:</strong><br />
                100 Automotive Way, Suite 400<br />
                Chicago, IL 60601, USA
              </p>

              <p>
                <strong>Customer Inquiries & Feedback:</strong><br />
                Email: <a href="mailto:support@dealerships.com">support@dealerships.com</a><br />
                Phone: +1 (800) 555-CARS (2277)
              </p>

              <p>
                <strong>Dealership Partnership Relations:</strong><br />
                Email: <a href="mailto:dealers@dealerships.com">dealers@dealerships.com</a><br />
                Phone: +1 (800) 555-3325
              </p>

              <p>
                <strong>Hours of Operation:</strong><br />
                Monday – Friday: 8:00 AM – 8:00 PM EST<br />
                Saturday – Sunday: 9:00 AM – 5:00 PM EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
