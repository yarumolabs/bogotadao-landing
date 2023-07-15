import React from 'react';
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import styled from 'styled-components';
import Miguelito from './images/miguelito.png';
import Member from './images/member.png';

const members = [
  {
    name: 'Miguelito',
    img: Miguelito,
    attributes: 'Product @ Palmera, Solidity, React, Music Production, AI, VR/AR',
    socialLinks: {
      facebook: 'https://www.facebook.com/member1',
      twitter: 'https://www.twitter.com/member1',
      linkedin: 'https://www.linkedin.com/member1',
    },
  },
  // Add similar objects for other members
  {
    name: 'Nicholas',
    img: Member,
    attributes: 'Quant trader, Finance, Python',
    socialLinks: {
      facebook: 'https://www.facebook.com/member1',
      twitter: 'https://www.twitter.com/member1',
      linkedin: 'https://www.linkedin.com/member1',
    },
  },
  {
    name: 'Santiago',
    img: Member,
    attributes: 'Hackathon king. Ecology,Solidity, React, Python',
    socialLinks: {
      facebook: 'https://www.facebook.com/member1',
      twitter: 'https://www.twitter.com/member1',
      linkedin: 'https://www.linkedin.com/member1',
    },
  },
  {
    name: 'Miguel',
    img: Member,
    attributes: 'Petroleos, Solidity, React, Svelte, Podcaster',
    socialLinks: {
      facebook: 'https://www.facebook.com/member1',
      twitter: 'https://www.twitter.com/member1',
      linkedin: 'https://www.linkedin.com/member1',
    },
    
  },

  {
    name: 'Camilo',
    img: Member,
    attributes: 'Music, Art, Djing',
    socialLinks: {
      facebook: 'https://www.facebook.com/member1',
      twitter: 'https://www.twitter.com/member1',
      linkedin: 'https://www.linkedin.com/member1',
    },
    
  },
  {
    name: 'Andrés',
    img: Member,
    attributes: 'Marketing, Community Management',
    socialLinks: {
      facebook: 'https://www.facebook.com/member1',
      twitter: 'https://www.twitter.com/member1',
      linkedin: 'https://www.linkedin.com/member1',
    },
    
  },
];

const Card = styled.div`
  background: #000;
  border-radius: 10px;
  width:250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 2px #fff, 0 0 10px #fff, 0 0 20px #0ba9ca, 0 0 30px #0ba9ca,
    0 0 40px #0ba9ca;
  margin: 20px;
  padding: 20px;
  max-width: 300px;
`;

const CardImage = styled.img`
  width: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const CardText = styled.div`
    color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Name = styled.h2`
  font-size: 22px;
  margin-bottom: 10px;
`;

const Attributes = styled.p`
  font-size: 16px;
  text-align: center;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const SocialIconLink = styled.a`
  color: #fff;
  text-decoration: none;
`;

const MemberCard = ({ member }) => {
  return (
    <Card>
      <CardImage src={member.img} alt={member.name} />
      <CardText>
        <Name>{member.name}</Name>
        <Attributes>{member.attributes}</Attributes>
      </CardText>
      <SocialIcons>
        <SocialIconLink href={member.socialLinks.facebook} target="_blank">
          <FaFacebook />
        </SocialIconLink>
        <SocialIconLink href={member.socialLinks.twitter} target="_blank">
          <FaTwitter />
        </SocialIconLink>
        <SocialIconLink href={member.socialLinks.linkedin} target="_blank">
          <FaLinkedin />
        </SocialIconLink>
      </SocialIcons>
    </Card>
  );
};

const MembersSectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
  background: linear-gradient(to right, #000, #130166);
  padding: 40px;
`;
const MembersSection = () => {
  return (
    <MembersSectionContainer>
      {members.map((member) => (
        <MemberCard key={member.name} member={member} />
      ))}
    </MembersSectionContainer>
  );
};

export default MembersSection;
