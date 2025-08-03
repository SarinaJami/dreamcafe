import React, { useEffect, useState, useRef, act } from 'react'
import './gallery.css'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { gallery01, gallery02, gallery03, gallery04 } from '../../assets/images';

const images = [gallery01, gallery02, gallery03, gallery04];
const imageNote = ["Coffee and Books", "Baking.. To Serve with Coffee", "Morning Coffee Perfume", "Socializing with Coffee"];

const galleryImages = images.map((image, index) => ({
  id: index,
  image: image,
  note: imageNote[index],
}))

function Gallery() {
  const scrollRef = useRef(null);
  const cardRefs = useRef({})
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false);
  const [leftBorderWidth, setLeftBorderWidth] = useState('1px')
  const [rightBorderWidth, setRightBorderWidth] = useState('1px')
  const [scrollOffset, setScrollOffset] = useState(351)
  const [activeNoteId, setActiveNoteId] = useState(null)

  // Reduce scroll offset for mobile devices
  const handleScrollOffset = () => {
    if (window.innerWidth <= 650) {
      setScrollOffset(241)
    }
    else {
      setScrollOffset(351)
    }
  }
  // A utility to detect touch device
  const isTouchDevice = () => {
    return /iPhone|iPad|iPod|Android|webOS|BlackBerry/i.test(navigator.userAgent)
  }
  // Add hover effect for desktop
  const handleMouseEnter = (id) => setActiveNoteId(id);
  const handleMouseLeave = () => setActiveNoteId(null);
  // Add click effect for mobile
  useEffect(() => {
    // const handleFocusImage = (id) => {
    //   scrollRef.current.scrollLeft = (2 * id - 1) * 175;
    // }
    const handleCardClick = (e) => {
      let clickedInside = false;

      Object.entries(cardRefs.current).forEach(([id, ref]) => {
        if (ref && ref.contains(e.target)) {
          const noteId = Number(id);
          setActiveNoteId((prev) => (prev === noteId ? null : noteId));
          clickedInside = true;
        }
      })

      if (!clickedInside) {
        setActiveNoteId(null);
      }
    }
    if (isTouchDevice()) {
      document.addEventListener("click", handleCardClick);
      return () => document.removeEventListener("click", handleCardClick);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleScrollOffset)
    return () => window.removeEventListener('resize', handleScrollOffset)
  })

  useEffect(() => {
    const el = scrollRef.current;
    const handleScrollPosition = () => {
      setAtStart(el.scrollLeft === 0);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
    }
    if (el) {
      el.addEventListener('scroll', handleScrollPosition)
    }
    return () => el && el.removeEventListener('scroll', handleScrollPosition)
  })

  const scrollLeft = () => {
    if (scrollRef.current && !atStart) {
      scrollRef.current.scrollBy({ left: -scrollOffset, behavior: 'smooth' })
      setLeftBorderWidth('2px')
      setTimeout(() => {
        setLeftBorderWidth('1px')
      }, 200);
    }
  }

  const scrollRight = () => {
    if (scrollRef.current && !atEnd) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' })
      setRightBorderWidth('2px')
      setTimeout(() => {
        setRightBorderWidth('1px')
      }, 200);
    }
  }

  return (
    <section className="cafe__gallery" id="gallery">
      <div className="cafe__gallery-content">
        <h1>Photo Gallery</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie rhoncus. Morbi elementum, lectus vel egestas convallis.</p>
        {/* <button type='button'><span className="gradient-text">View More</span></button> */}
      </div>
      <div className="cafe__gallery-images">
        <div className="cafe__gallery-images_container" ref={scrollRef}>
          {galleryImages.map((item) => (
            <div className="cafe__gallery-images_card" key={`gallery_image-${item.id + 1}`}>
              <div className="cafe__gallery-card_container" ref={(el) => (cardRefs.current[item.id] = el)}
                onMouseEnter={!isTouchDevice() ? () => handleMouseEnter(item.id) : undefined}
                onMouseLeave={!isTouchDevice() ? handleMouseLeave : undefined}
              >
                <img src={item.image} alt="gallery_image"
                  className={(activeNoteId === item.id) ? 'blur-bg' : 'normal-bg'} />
                <div className={`gallery__image-note ${(activeNoteId === item.id) ? 'show-note' : 'hide-note'}`}>
                  <p>{item.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cafe__gallery-images_arrows">
          <BsArrowLeftShort
            style={{
              color: atStart ? '#716f6f' : '#000',
              borderColor: atStart ? '#716f6f' : '#000',
              borderWidth: leftBorderWidth
            }}
            className="gallery__arrow-icon" onClick={scrollLeft} />
          <BsArrowRightShort
            style={{
              color: atEnd ? '#716f6f' : '#000',
              borderColor: atEnd ? '#716f6f' : '#000',
              borderWidth: rightBorderWidth
            }} className="gallery__arrow-icon" onClick={scrollRight} />
        </div>
      </div>
    </section>
  )
}

export default Gallery