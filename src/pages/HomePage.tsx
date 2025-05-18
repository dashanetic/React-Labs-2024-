import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";

import bgShape from "../assets/background/BG_Shape.png";
import foodImage from "../assets/background/home.png";
import trustpilotIcon from "../assets/background/trustpilot.svg";

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <HeroSection>
          <HeroWrapper>
            <ContentBlock>
              <MainTitle>
                <TitleText>
                  Beautiful food &amp; takeaway,{" "}
                  <AccentedText>delivered</AccentedText> to your door.
                </TitleText>
              </MainTitle>
              <SubtitleText>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&#39;s standard dummy
                text ever since the 1500.
              </SubtitleText>
              <ActionArea>
                <Button onClick={() => console.log("Order Placed!")}>
                  Place an Order
                </Button>
              </ActionArea>
              <TrustpilotArea>
                <BrandLogo src={trustpilotIcon} alt="Trustpilot Logo" />
                <ReviewInfo>
                  <RatingValue>4.8 out of 5</RatingValue> based on 2000+ reviews
                </ReviewInfo>
              </TrustpilotArea>
            </ContentBlock>
            <ImageArea>
              <FoodHeroImage src={foodImage} alt="Food and Takeaway" />
            </ImageArea>
          </HeroWrapper>
        </HeroSection>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default HomePage;

const PageContainer = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const HeroSection = styled.section`
  background: url(${bgShape}) no-repeat;
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;
  text-align: left;
  padding: 70px 20px;
  flex: 1;
`;

const HeroWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  align-items: center;

  @media (max-width: 700px) {
    flex-flow: column nowrap;
  }
`;

const ContentBlock = styled.div`
  padding-right: 20px;
  justify-content: center;
  flex-direction: column;
  display: flex;
  flex: 1;
`;

const ImageArea = styled.div`
  padding: 32px;
  justify-content: flex-end;
  display: flex;
  flex: 1;

  @media (max-width: 800px) {
    display: none;
  }
`;

const MainTitle = styled.h1`
  margin-bottom: 16px;
  line-height: 64px;
  font-weight: normal;
  font-size: 64px;

  @media (max-width: 800px) {
    line-height: 48px;
    font-size: 40px;
  }
`;

const TitleText = styled.span`
  color: #08090a;
`;

const AccentedText = styled.span`
  color: #35b8be;
`;

const SubtitleText = styled.p`
  max-width: 600px;
  margin-bottom: 32px;
  line-height: 24px;
  font-size: 20px;
  color: #546285;
`;

const ActionArea = styled.div`
  margin-bottom: 30px;
`;

const TrustpilotArea = styled.div`
  align-items: flex-start;
  flex-direction: column;
  display: flex;
`;

const BrandLogo = styled.img`
  margin-bottom: 10px;
  height: auto;
  width: 100px;
`;

const ReviewInfo = styled.div`
  font-size: 16px;
  display: flex;
`;

const RatingValue = styled.span`
  margin-right: 10px;
  color: #35b8be;
`;

const FoodHeroImage = styled.img`
  object-fit: contain;
  height: auto;
  width: 100%;
`;