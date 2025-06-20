import React from 'react'
import './gallery.css'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { gallery01, gallery02, gallery03, gallery04 } from '../../assets/images';

const images = [gallery01, gallery02, gallery03, gallery04];
const imageNote = ["Coffee and Books", "Baking.. To Serve with Coffee", "Morning Coffee Perfume", "Socializing with Coffee"];

function Gallery() {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 351;
    } else {
      current.scrollLeft += 351;
    }
  };

  return (
    <section className="cafe__gallery" id="gallery">
      <div className="cafe__gallery-content">
        <h1>Photo Gallery</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie rhoncus. Morbi elementum, lectus vel egestas convallis.</p>
        <button type='button'><span className="gradient-text">View More</span></button>
      </div>
      <div className="cafe__gallery-images">
        <div className="cafe__gallery-images_container" ref={scrollRef}>
          {images.map((image, index) => (
            <div className="cafe__gallery-images_card" key={`gallery_image-${index + 1}`}>
              <img src={image} alt="gallery_image" />
              <div className="gallery__image-note">
                <p>{imageNote[index]}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cafe__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </section>
  )
}

export default Gallery