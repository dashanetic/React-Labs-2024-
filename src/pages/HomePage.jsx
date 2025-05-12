import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Button from "../components/Button/Button.jsx";
import { AppContext } from "../App.jsx";

import bgShape from "../assets/background/BG_Shape.png";
import heroImage from "../assets/background/home.png";
import trustpilotImage from "../assets/background/trustpilot.svg";

function HomePage() {
  const { navigateTo } = useContext(AppContext);

  const handleExploreMenu = () => {
    navigateTo("menu");
  };

  return (
    <HomeContainer>
      <Header />
      <HeroSection>
        <HeroBanner>
          <HeroLeftSide>
            <MainTitle>
              <TitleLine>Beautiful food</TitleLine>
              <TitleLine>& takeaway,</TitleLine>
              <TitleLine>
                <HighlightText>delivered</HighlightText> to your door.
              </TitleLine>
            </MainTitle>
            <SubtitleText>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&#39;s standard dummy
              text ever since the 1500.
            </SubtitleText>
            <ActionArea>
              <Button onClick={handleExploreMenu} disabled={true}>
                Place an Order
              </Button>
            </ActionArea>
            <RatingArea>
              <ReviewLogo src={trustpilotImage} alt="Review Platform Logo" />
              <ReviewStats>
                <StarRating>
                  <Star filled />
                  <Star filled />
                  <Star filled />
                  <Star filled />
                  <Star filled={false} halfFilled />
                </StarRating>
                <RatingText>from over 2000+ reviews</RatingText>
              </ReviewStats>
            </RatingArea>
          </HeroLeftSide>
          <HeroRightSide>
            <FoodImage src={heroImage} alt="Delicious Food" />
          </HeroRightSide>
        </HeroBanner>
      </HeroSection>
      <Footer />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeroSection = styled.main`
  flex-grow: 1;
  background-image: url(${bgShape});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

const HeroBanner = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const HeroLeftSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  max-width: 550px;
  width: 100%;
`;

const MainTitle = styled.h1`
  font-family: Inter, sans-serif;
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 1.8px;
  margin-bottom: 1.5rem;
  color: #08090a;
  width: 100%;
  padding-right: 20px;
  display: block;
  white-space: pre-wrap;
  word-break: normal;
  word-wrap: normal;

  @media (max-width: 800px) {
    font-size: 40px;
    line-height: 1.2;
    letter-spacing: 1.2px;
  }
`;

const TitleLine = styled.div`
  display: block;
`;

const HighlightText = styled.span`
  color: #35b8be;
`;

const SubtitleText = styled.p`
  color: #546285;
  font-size: 17.6px;
  line-height: 24px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 550px;
`;

const ActionArea = styled.div`
  margin-bottom: 32px;
  display: inline-block;
`;

const RatingArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const ReviewLogo = styled.img`
  width: 100px;
  height: auto;
  margin-inline-end: 16px;
  margin-block-end: 10px;
`;

const ReviewStats = styled.div`
  display: inline-flex;
  font-size: 16px;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const Star = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ filled, halfFilled }) =>
    filled ? "#FFD700" : halfFilled ? "#FFD70080" : "#E0E0E0"};
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  margin-right: 4px;
`;

const RatingText = styled.span`
  color: #546285;
`;

const ScoreText = styled.span`
  color: #35b8be;
  padding-right: 8px;
`;

const HeroRightSide = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 32px;

  @media (max-width: 800px) {
    display: none;
  }
`;

const FoodImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 500px;
`;

export default HomePage;
