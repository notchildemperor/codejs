import React from 'react';
import Photo1 from '../Assets/1.png';
import Photo2 from '../Assets/2.png';
import Photo3 from '../Assets/3.png';
import './Slideshow.css';

const Slideshow = () => {
  return (
    <div className="maincontainer">
      <div className='container'>
        <div className='wrapper'>
          <img className='gambar' src={Photo1} alt="Slide 1"/>
          <img className='gambar' src={Photo2} alt="Slide 2"/>
          <img className='gambar' src={Photo3} alt="Slide 3"/>
          <img className='gambar' src={Photo1} alt="Slide 4"/>
          <img className='gambar' src={Photo2} alt="Slide 5"/>
          <img className='gambar' src={Photo3} alt="Slide 6"/>
          <img className='gambar' src={Photo1} alt="Slide 4"/>
          <img className='gambar' src={Photo2} alt="Slide 5"/>
          <img className='gambar' src={Photo3} alt="Slide 6"/>
          <img className='gambar' src={Photo1} alt="Slide 1"/>
          <img className='gambar' src={Photo2} alt="Slide 2"/>
          <img className='gambar' src={Photo3} alt="Slide 3"/>
        </div>
      </div>
    </div>
  );
}

export default Slideshow;
