import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import styled from 'styled-components';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { OrbitControls, useGLTF } from "@react-three/drei";

import Yarumo3d2 from "./assets/YarumoLogo2.gltf";
import Yarumo3d3 from "./assets/YarumoLogo3.gltf";
import Yarumo3d4 from "./assets/YarumoLogo4.gltf";

const CarouselContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; // To position the arrows absolutely.
  //background-color: #f5f5f5;
  height: 500px;
`;

const ModelSlide = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  width: 50%;
  height: 100%;
`;

const ModelTitle = styled(Typography)`
  color: #333;
  font-size: 24px;
  margin-top: 10px;
`;

const ModelDescription = styled(Typography)`
  color: #333;
  font-size: 16px;
  margin-top: 10px;
`;

const LeftArrow = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const RightArrow = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const models = [
  {
    title: 'Model 1',
    description: 'Description 1',
    modelPath: Yarumo3d2,
  },
  {
    title: 'Model 2',
    description: 'Description 2',
    modelPath: Yarumo3d3,
  },
  {
    title: 'Model 3',
    description: 'Description 2',
    modelPath: Yarumo3d4,
  },
  // Add more models here
];

const Model = ({ modelPath }) => {
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const gltf = useGLTF(modelPath);

  // React to hover state
  useEffect(() => {
    if (isHovered) {
      ref.current.scale.set(1.1, 1.1, 1.9);
    } else {
      ref.current.scale.set(1, 1, 1);
    }
  }, [isHovered]);

  // Set initial tilt (if you want this behavior, if not you can remove it)
  useEffect(() => {
    ref.current.rotation.x = Math.PI / 3;
  }, []);

  // ... (you can also add the useFrame logic from the reference code if required)

  return (
    <primitive 
      object={gltf.scene} 
      ref={ref} 
      onPointerOver={(e) => { 
        e.stopPropagation(); 
        setIsHovered(true);
      }}
      onPointerOut={(e) => { 
        e.stopPropagation();
        setIsHovered(false); 
      }}
    />
  );
};
;




const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? models.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === models.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <CarouselContainer>
      <LeftArrow onClick={handlePrevSlide}>
        <FaChevronLeft />
      </LeftArrow>
      <ModelSlide>
        <Canvas key={currentSlide}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <Suspense fallback={null}>
            <Model modelPath={models[currentSlide].modelPath} />
          </Suspense>
        </Canvas>
        <ModelTitle variant="h2">{models[currentSlide].title}</ModelTitle>
        <ModelDescription variant="body1">
          {models[currentSlide].description}
        </ModelDescription>
      </ModelSlide>
      <RightArrow onClick={handleNextSlide}>
        <FaChevronRight />
      </RightArrow>
    </CarouselContainer>
  );
};

export default Carousel;
