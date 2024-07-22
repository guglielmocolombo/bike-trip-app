import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import DisplayMapCarousel from './DisplayMapCarousel';
import { Container } from 'react-bootstrap';

function MyCarousel() {

  return (
    <Carousel> 
      <Carousel.Item interval={3500}> 
        <DisplayMapCarousel></DisplayMapCarousel>
      </Carousel.Item> 
      <Carousel.Item interval={3500}> 
      <DisplayMapCarousel></DisplayMapCarousel>
      </Carousel.Item> 
    </Carousel> 
  );
}

export default MyCarousel;