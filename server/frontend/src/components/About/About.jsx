import React from 'react';
import Header from '../Header/Header';
import person from '../assets/person.png';
import '../assets/style.css';
import '../assets/bootstrap.min.css';

const About = () => {
  return (
    <div>
      <Header />
      <div className="card" style={{ width: '80%', margin: 'auto', marginTop: '5%' }}>
        <div className="banner" name="about-header" style={{ padding: '20px', textAlign: 'center' }}>
          <h2>About Our Dealership Network</h2>
          <p style={{ color: '#555', maxWidth: '800px', margin: 'auto' }}>
            Welcome to Dealerships! We connect drivers across the country with top-rated car dealerships, offering transparent reviews, verified car inventories, and exceptional service nationwide.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto', gap: '20px', padding: '20px' }}>
          <div className="card" style={{ width: '30%' }}>
            <img className="card-img-top" src={person} alt="Sarah Jenkins" />
            <div className="card-body">
              <p className="title" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Sarah Jenkins</p>
              <p style={{ color: 'darkturquoise', fontWeight: 600 }}>Chief Executive Officer</p>
              <p className="card-text">
                Sarah brings over 18 years of automotive management experience, leading national dealer partnerships and customer-first operations.
              </p>
              <p><a href="mailto:sarah.jenkins@dealerships.com">sarah.jenkins@dealerships.com</a></p>
            </div>
          </div>

          <div className="card" style={{ width: '30%' }}>
            <img className="card-img-top" src={person} alt="Marcus Chen" />
            <div className="card-body">
              <p className="title" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Marcus Chen</p>
              <p style={{ color: 'darkturquoise', fontWeight: 600 }}>VP of Dealership Relations</p>
              <p className="card-text">
                Marcus oversees our verified network of over 50 dealerships across 20+ states, ensuring strict quality and customer service standards.
              </p>
              <p><a href="mailto:marcus.chen@dealerships.com">marcus.chen@dealerships.com</a></p>
            </div>
          </div>

          <div className="card" style={{ width: '30%' }}>
            <img className="card-img-top" src={person} alt="Elena Rodriguez" />
            <div className="card-body">
              <p className="title" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Elena Rodriguez</p>
              <p style={{ color: 'darkturquoise', fontWeight: 600 }}>Director of Customer Experience</p>
              <p className="card-text">
                Elena spearheads our customer sentiment analysis systems, helping car buyers make transparent, trustworthy buying decisions.
              </p>
              <p><a href="mailto:elena.rodriguez@dealerships.com">elena.rodriguez@dealerships.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
