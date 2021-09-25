import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { useAuth } from "../../hooks/auth";
import { useTheme } from "styled-components";

import { SignInSocialButton } from "../../components/SignInSocialButton";
import AppleLogo from "../../assets/apple.svg";
import GoogleLogo from "../../assets/google.svg";
import LogoApp from "../../assets/logo.svg";

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
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [isLoading, setIsloading] = useState(false);
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsloading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível logar com sua conta Google!");
      setIsloading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsloading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível logar com sua conta Apple!");
      setIsloading(false);
    }
  }

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
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              title="Entrar com Apple"
              svg={AppleLogo}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator color={theme.color.shape} size="large" />
        )}
      </Footer>
    </Container>
  );
}
