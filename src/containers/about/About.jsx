import React from 'react'
import './about.css'
import about from '../../assets/about.png'


function About() {
  return (
    <section className="cafe__about section-padding" id="about">
      <div className="cafe__about-content">
        <h1>About Us</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie rhoncus. Morbi elementum, lectus vel egestas convallis, mi ligula volutpat nunc, sit amet elementum dui elit non tortor.</p>
      </div>
      <div className="cafe__about-image">
        <img src={about} alt='about' />
      </div>
      <div className="cafe__about-content">
        <h1>Our History</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie rhoncus. Morbi elementum, lectus vel egestas convallis, mi ligula volutpat nunc, sit amet elementum dui elit non tortor.</p>
      </div>
    </section>
  )
}

export default About