import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import DisplayMap from './DisplayMap';
import { Container } from 'react-bootstrap';

function MyCarousel() {

  return (
    <Carousel> 
      <Carousel.Item interval={3500}> 
        <DisplayMap></DisplayMap>
      </Carousel.Item> 
      <Carousel.Item interval={3500}> 
      <DisplayMap></DisplayMap>
      </Carousel.Item> 
    </Carousel> 
  );
}

export default MyCarousel;