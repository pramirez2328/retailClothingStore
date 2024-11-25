import React, { useEffect, useState, useRef } from 'react';
import mainVideo from '../../assets/mainVideo.mp4';
import clothes1 from '../../assets/clothes1.jpg';
import clothes2 from '../../assets/clothes2.jpg';
import clothes3 from '../../assets/clothes3.jpg';
import './Home.css';

const Home: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState([false, false, false]);
  const sectionRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const handleScroll = () => {
    const newVisibleSections = sectionRefs.map((ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();

        return rect.top <= 550;
      }
      return false;
    });
    setVisibleSections(newVisibleSections);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section id='video-container'>
        <h3 className='slogan'>
          Unleash Your Style, Perfect the Fit <br />
          <span style={{ fontFamily: 'cursive' }}>Discover, Embrace, Flaunt.</span>
        </h3>

        <video className='full-screen-video' src={mainVideo} autoPlay muted loop></video>
      </section>

      <section>
        <div
          className={`section-text-img scroll-container ${visibleSections[0] ? 'visible' : ''}`}
          ref={sectionRefs[0]}
        >
          <h1 className='section-text'>Fashion is about trends, but style is about individuality.</h1>
          <img className='section-img' src={clothes1} alt='fancy clothes' />
        </div>
        <div
          className={`section-text-img scroll-container ${visibleSections[1] ? 'visible' : ''}`}
          ref={sectionRefs[1]}
        >
          <h1 className='section-text'>Fashion fades; style is eternal.</h1>
          <img className='section-img' src={clothes2} alt='fancy clothes' />
        </div>
        <div
          className={`section-text-img scroll-container ${visibleSections[2] ? 'visible' : ''}`}
          ref={sectionRefs[2]}
        >
          <h1 className='section-text'>Style is a way to say who you are without having to speak.</h1>
          <img className='section-img' src={clothes3} alt='fancy clothes' />
        </div>
      </section>
    </>
  );
};

export default Home;
