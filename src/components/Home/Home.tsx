import mainVideo from '../../assets/mainVideo.mp4';
import './Home.css';

function Home() {
  return (
    <section>
      <div className='video-container'>
        <h3 className='slogan'>
          Unleash Your Style, Perfect the Fit <br />
          <span style={{ fontFamily: 'cursive' }}>Discover, Embrace, Flaunt.</span>
        </h3>

        <video className='full-screen-video' src={mainVideo} autoPlay muted loop></video>
      </div>
    </section>
  );
}

export default Home;
