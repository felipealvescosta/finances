import React from "react";
import {RFValue} from 'react-native-responsive-fontsize';

import { useAuth } from "../../hooks/auth";

import {SignInSocialButton} from '../../components/SignInSocialButton';
import AppleLogo from "../../assets/apple.svg";
import GoogleLogo from "../../assets/google.svg";
import LogoApp from '../../assets/logo.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const {user} = useAuth();
  console.log(user.name);
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoApp width={RFValue(120)} height={RFValue(68)} />

          <Title>Controle Suas finanças de forma simples!</Title>
        </TitleWrapper>

        <SignInTitle>Faça login com uma das formas abaixo!</SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleLogo}
          />
           <SignInSocialButton 
            title="Entrar com Apple"
            svg={AppleLogo}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
