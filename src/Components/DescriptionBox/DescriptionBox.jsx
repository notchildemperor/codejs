import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae tempore dicta id ad commodi qui excepturi ratione minima eum expedita vel, explicabo totam cum, quos labore illum ipsa sunt.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab reprehenderit quis voluptatem delectus perferendis aliquid alias vel dolore autem, nisi cupiditate obcaecati architecto! Sapiente earum iste, dolorem a nesciunt natus!</p>
        </div>
    </div>
  )
}

export default DescriptionBox