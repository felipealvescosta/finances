import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
  width: 100%;

  padding: 16px 18px;

  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  background-color: ${({theme})=> theme.color.shape};
  color: ${({theme})=> theme.color.text_dark};

  border-radius: 8px;

  margin-bottom: 8px;
`;