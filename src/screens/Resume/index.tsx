import React, { useState, useCallback } from "react";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { useFocusEffect } from "@react-navigation/native";
import {addMonths, subMonths, format} from 'date-fns';
import {ptBR} from 'date-fns/locale'

import {useAuth} from '../../hooks/auth';

import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContent,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
} from "./styles";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormated: string;
  color: string;
  percentage: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();
  const {user} = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleChangeDate(action: 'previous' | 'next'){
    if(action === 'next'){
      const date = addMonths(selectedDate, 1);
      setSelectedDate(date);
    }else {
      const date = subMonths(selectedDate, 1);
      setSelectedDate(date);
    }
  }

  async function loadData() {
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey);

    const reponseFormated = response ? JSON.parse(response) : [];

    const expensives = reponseFormated.filter(
      (expensive: TransactionData) => expensive.type === "negative" &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear() 
    );

    const expensiveTotal = expensives.reduce(
      (acumulator: number, expensive: TransactionData) => {
        return acumulator + Number(expensive.amount);
      },
      0
    );
    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormated = categorySum.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });

        const percentage = `${((categorySum / expensiveTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormated,
          percentage,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );


  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={()=> handleChangeDate('previous')}>
            <SelectIcon name="chevron-left"/>
          </MonthSelectButton>

          <Month>
            {
              format(selectedDate, 'MMMM, yyyy', {locale: ptBR})
            }
          </Month>

          <MonthSelectButton onPress={()=> handleChangeDate('next')}>
          <SelectIcon name="chevron-right"/>
          </MonthSelectButton>
        </MonthSelect>

        <ChartContent>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.color.shape,
              },
            }}
            labelRadius={45}
            x="percentage"
            y="total"
          />
        </ChartContent>

        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormated}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
