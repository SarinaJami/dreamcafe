import React from 'react'
import './contact.css'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Cta } from '../../components'

function Contact() {
  return (
    <section className="cafe__contact section-padding" id="contact">
      <div className="cafe__contact-cta">
        <Cta
          title="stories about coffee beans around the world!"
          text="and stay informed with events in dream cafe!"
          placeholder="Your Email Address"
          buttonText="Subscribe"
        />
      </div>
      <div className="cafe__contact-info">
        <div className="cafe__contact-info_location">
          <h2>Location</h2>
          <div className="cafe__contact-info_location-container">
            <HiOutlineLocationMarker className="location_icon"></HiOutlineLocationMarker>
            <p>Tehran, Dream Cafe</p>
          </div>
        </div>
        <div className="cafe__contact-info_hours">
          <h2>Opening Hours</h2>
          <div className="cafe__contact-info_hours-container">
            <div>
              <p>Mon - Fri</p>
              <p>6:30 A.M. - 23:00 P.M.</p>
            </div>
            <div>
              <p>Sat - Sun</p>
              <p>4:00 P.M. - 23:00 P.M.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact