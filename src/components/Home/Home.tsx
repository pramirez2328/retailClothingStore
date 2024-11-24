import mainVideo from '../../assets/mainVideo.mp4';
import clothes1 from '../../assets/clothes1.jpg';
import clothes2 from '../../assets/clothes2.jpg';
import clothes3 from '../../assets/clothes3.jpg';
import './Home.css';

function Home() {
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
        <div className='section-text-img'>
          <h1 className='section-text'>Where Style Meets Comfort.</h1>
          <img className='section-img' src={clothes1} alt='fancy clotes' />
        </div>
        <div className='section-text-img'>
          <h1 className='section-text'>Where Style Meets Comfort.</h1>
          <img className='section-img' src={clothes2} alt='fancy clotes' />
        </div>
        <div className='section-text-img'>
          <h1 className='section-text'>Where Style Meets Comfort.</h1>
          <img className='section-img' src={clothes3} alt='fancy clotes' />
        </div>
      </section>
    </>
  );
}

export default Home;
