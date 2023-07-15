import React, { Suspense, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { DoubleSide,   } from 'three';
import Image1 from './images/pink-gradient1.png';
import Image2 from './images/pink-gradient2.png';
import Image3 from './images/pink-gradient3.png';

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
  height: auto;
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
  background-color: #16AFE9;
  color: #fff;
  /* border: 2px solid #fff; */
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: #1C009D;
    color: #fff;
  }
`;
const Cube = () => {
  const ref = useRef();
  const { viewport } = useThree();
  const size = Math.max(viewport.width, viewport.height) / 8;
  const textures = useTexture([
    Image1,
    Image2,
    Image3,
  ]);
  
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} scale={[size, size, size]}>
      {textures.map((texture, i) => (
        <meshStandardMaterial attachArray="material" map={texture} side={DoubleSide} key={i} />
      ))}
      <boxGeometry args={[1, 1, 1]} attach="geometry" />
    </mesh>
  );
};

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroImageContainer>
        <Canvas camera={{ position: [10, 10, 15], fov: 5 }}>
          <OrbitControls enablePan enableZoom enableRotate />
          <pointLight position={[5, 5, 15]} />
          <pointLight position={[5, 5, 10]} />
          <pointLight position={[15, 3, 1]} />
          <pointLight position={[-15, -3, -1]} />
          <Suspense fallback={null}>
            <Cube />
          </Suspense>
        </Canvas>
      </HeroImageContainer>
      <HeroText>
        <HeroTitle variant="h1">BogotaDAO</HeroTitle>
        <HeroDescription variant="body1">
        BogotaDAO es una iniciativa creada por seis amigos comprometida con aprovechar la revolución de la blockchain para crear soluciones que trasciendan las fronteras convencionales. En este proyecto lo que importa no es el destino final, sino el emocionante viaje de descubrimiento y creación colectiva.
        </HeroDescription>
        <HeroCTA variant="contained">Join</HeroCTA>
      </HeroText>
    </HeroContainer>
  );
};

export default HeroSection;
