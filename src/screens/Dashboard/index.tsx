import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionsCardProps,
} from "../../components/TransactionCard";

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
} from "./styles";

export interface DataListProps extends TransactionsCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTrasanction() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const data = response ? JSON.parse(response) : [];

    const transactions: DataListProps[] = data.map((item: DataListProps) => {
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

    setData(transactions);
  }

  useEffect(() => {
    loadTrasanction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTrasanction();
    },[])
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" />

      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://xesque.rocketseat.dev/users/avatar/profile-89688173-f596-4fd8-ba31-947fc5aa2d4a-1596847074972.jpg",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Felipe</UserName>
            </User>
          </UserInfo>
          <LogoutButton>
            <Icon name={"power"} />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entrada"
          amount="R$ 19.023,00"
          lastTransaction="Recebimento"
        />
        <HighlightCard
          type="down"
          title="Saída"
          amount="R$ 12.023,00"
          lastTransaction="Pagamento"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 1.023,00"
          lastTransaction="Salto"
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
    </Container>
  );
}
