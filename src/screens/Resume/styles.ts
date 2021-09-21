import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background};
`;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.color.primary};

  width: 100%;
  height: ${RFValue(116)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
  color: ${({ theme }) => theme.color.shape};
`;

export const Content = styled.ScrollView``;

export const ChartContent = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`;
export const MonthSelectButton = styled(BorderlessButton)``;

export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(20)}px;
`;
export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;
