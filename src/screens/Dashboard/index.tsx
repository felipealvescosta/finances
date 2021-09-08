import React from "react";
import { StatusBar } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard , TransactionsCardProps} from "../../components/TransactionCard";

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
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from "./styles";

export interface DataListProps extends TransactionsCardProps {
  id: string,
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de Sites",
      amount: "R$ 12.000,00",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
      date: "10/09/2021",
    },
    {
      id: '2',
      type: 'negative',
      title: "Aluguel AP",
      amount: "R$ 330,00",
      category: {
        icon: "coffee",
        name: "Vendas",
      },
      date: "10/09/2021",
    },
    {
      id: '3',
      type: 'positive',
      title: "Desenvolvimento de App",
      amount: "R$ 1.000,00",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
      date: "10/09/2021",
    },
  ];

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
          <Icon name={"power"} />
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
          keyExtractor={item=>item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
         
        />
      </Transactions>
    </Container>
  );
}
