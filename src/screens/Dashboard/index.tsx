import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { StatusBar, ActivityIndicator } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionsCardProps,
} from "../../components/TransactionCard";

import {useAuth} from '../../hooks/auth';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  LogoutButton,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadContainer,
} from "./styles";

export interface DataListProps extends TransactionsCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransactions: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();
  const {signOut, user} = useAuth();

  function getLastTransaction(
    colletion: DataListProps[],
    type: "positive" | "negative"
  ) {
    const lastTransactions = new Date(
      Math.max.apply(
        Math,
        colletion
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString(
      "pt-bt",
      { month: "long" }
    )}`;
  }

  async function clearItem() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    await AsyncStorage.removeItem(dataKey);
  }

  async function loadTrasanction() {
    const dataKey =  `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);

    const data = response ? JSON.parse(response) : [];

    let entriesSum = 0;
    let expensiveTotal = 0;

    const transactions: DataListProps[] = data.map((item: DataListProps) => {
      if (item.type === "positive") {
        entriesSum += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      const date = Intl.DateTimeFormat("pt-BT", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      };
    });

    const total = entriesSum - expensiveTotal;

    setData(transactions);

    const lastTransactionEntries = getLastTransaction(data, "positive");
    const lastTransactionExpensive = getLastTransaction(data, "negative");

    setHighlightData({
      entries: {
        amount: entriesSum.toLocaleString("pt-bt", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: `Última entrada no dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-bt", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: `Última saída no dia ${lastTransactionExpensive}`,
      },
      total: {
        amount: total.toLocaleString("pt-bt", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: "",
      },
    });

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTrasanction();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.color.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <StatusBar barStyle="light-content" />
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name={"power"} />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entrada"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransactions}
            />
            <HighlightCard
              type="down"
              title="Saída"
              amount={highlightData.expensive.amount}
              lastTransaction={highlightData.expensive.lastTransactions}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction="Saldo"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
