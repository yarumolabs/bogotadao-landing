import React, { Suspense, useRef, useState,useEffect } from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, useGLTF } from "@react-three/drei";
import { DoubleSide } from "three";
import Image1 from "./images/pink-gradient1.png";
import Image2 from "./images/pink-gradient2.png";
import Image3 from "./images/pink-gradient3.png";
import Yarumo3d from "./assets/YarumoLogo1.gltf";
const HeroContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background: linear-gradient(to right, #000, #130166);
  color: #fff;
`;

const HeroImageContainer = styled(Box)`
  width: 50%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
`;

const HeroText = styled(Box)`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const HeroTitle = styled(Typography)`
  font-size: 36px;
  font-weight: bold;
`;

const HeroDescription = styled(Typography)`
  font-size: 18px;
`;

const HeroCTA = styled.button`
  background-color: #16afe9;
  color: #fff;
  /* border: 2px solid #fff; */
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: #1c009d;
    color: #fff;
  }
`;

const Model = () => {
  const ref = useRef();
  const [direction, setDirection] = useState(1);
  const [tiltDirection, setTiltDirection] = useState(1);
  const gltf = useGLTF(Yarumo3d);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    if (isHovered) {
      ref.current.scale.set(1.1, 1.1, 1.9);
    } else {
      ref.current.scale.set(1, 1, 1);
    }
  }, [isHovered]);
  



  // Set initial tilt
  useEffect(() => {
    ref.current.rotation.x = Math.PI / 3;  // Adjust this value to set the initial tilt
  }, []);

  useFrame(() => {
    // This function is called every frame (usually 60 times per second)
    
    // Change the rotation around the Y-axis by a small amount
    // `direction` determines whether the rotation is positive or negative
    // Multiplying by 0.001 slows down the rotation to a reasonable speed
    ref.current.rotation.y += 0.01 * direction;
  
    // Check if the rotation around the Y-axis has exceeded a certain limit (Pi / 0.002 radians, or about 1570 degrees)
    // If it has, change the direction of the rotation to be negative
    if (ref.current.rotation.y > Math.PI / 12) {
      setDirection(-0.05);
    } 
    // Check if the rotation around the Y-axis has gone below a certain limit (-Pi / 0.003 radians, or about -1050 degrees)
    // If it has, change the direction of the rotation to be positive
    else if (ref.current.rotation.y < -Math.PI / 12) {
      setDirection(0.05);
    }
  
    // Change the rotation around the X-axis by a small amount
    // `tiltDirection` determines whether the rotation is positive or negative
    // Multiplying by 0.005 slows down the rotation to a reasonable speed
    ref.current.rotation.x += 0.1 * tiltDirection;
  
    // Check if the rotation around the X-axis has exceeded a certain limit (Pi / 3 radians, or about 60 degrees)
    // If it has, change the direction of the rotation to be negative
    if (ref.current.rotation.x > Math.PI / 3) {
      setTiltDirection(-0.05);
    } 
    // Check if the rotation around the X-axis has gone below a certain limit (-Pi radians, or about -180 degrees)
    // If it has, change the direction of the rotation to be positive
    else if (ref.current.rotation.x < Math.PI / 3.6) {
      setTiltDirection(0.05);
    }
  });

  return (
    <primitive 
      object={gltf.scene} 
      ref={ref} 
      position={[1, 1, 1]}
      onPointerOver={(e) => { 
        e.stopPropagation(); // Prevents this event from being propagated further
        setIsHovered(true);
      }}
      onPointerOut={(e) => { 
        e.stopPropagation();
        setIsHovered(false); 
      }}
    />
  );
  
  
};
// ...

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroImageContainer>
        <Canvas camera={{ position: [10, 10, 45], fov: 5 }}>
          <OrbitControls enablePan enableZoom enableRotate />
          <pointLight position={[5, 5, 15]} />
          <pointLight position={[5, 5, 10]} />
          <pointLight position={[15, 3, 1]} />
          <pointLight position={[-15, -3, -1]} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Canvas>
      </HeroImageContainer>
      <HeroText>
        <HeroTitle variant="h1">Sweat, Play, Earn </HeroTitle>
        <HeroDescription variant="body1">A fitness odyssey that goes beyond the physical. Every challenge conquered, every goal met, immortalized in the blockchain. Shape your health, secure your digital legacy.</HeroDescription>
        <HeroCTA variant="contained">Join</HeroCTA>
      </HeroText>
    </HeroContainer>
  );
};

export default HeroSection;