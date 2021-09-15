import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  width: 100%;

  background-color: ${({theme})=> theme.color.secondary};
  border-radius: 5px;

  align-items: center;
`;
export const Title = styled.Text`
  font-family: ${({theme})=> theme.fonts.regular};
  font-size: ${RFValue(18)}px;

  color: ${({theme})=> theme.color.shape};

  padding: 14px;
`;
