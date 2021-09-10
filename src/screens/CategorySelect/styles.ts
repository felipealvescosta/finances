import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import theme from '../../global/styles/theme';

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({theme}) => theme.color.background};
`;
export const Header = styled.View`
  width: 100%;
  height: ${RFValue(116)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;

  background-color:  ${({theme}) => theme.color.primary};
`;
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;

  font-family: ${({theme})=> theme.fonts.regular};
  color:  ${({theme}) => theme.color.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({isActive}) => 
    isActive ? theme.color.primary_light :  theme.color.background
  };
`;
export const Icon = styled(Feather)`
 font-size: ${RFValue(20  )}px;

 margin-right: 18px;
`;
export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({theme}) => theme.color.text_dark};
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;

  background-color: ${({theme}) => theme.color.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color:  ${({theme}) => theme.color.secondary};
`;
export const ButtonText = styled.Text`
  color:  ${({theme}) => theme.color.shape};
  font-size: ${RFValue(14)}px;
`;