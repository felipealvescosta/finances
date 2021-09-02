import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

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
} from "./styles";

export function Dashboard() {
  return (
    <Container>
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
      </Transactions>
    </Container>
  );
}
