import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from "./styles";

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionsType>
            <TransactionTypeButton
              type="up"
              title="income"
              onPress={() => handleTransactionsTypeSelect("up")}
              isActive = {transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="outcome"
              onPress={() => handleTransactionsTypeSelect("down")}
              isActive = {transactionType === 'down'}
            />
          </TransactionsType>
          <CategorySelect title="Categorias" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
