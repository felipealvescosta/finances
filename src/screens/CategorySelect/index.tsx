import React from 'react';

import { Container, Header, Title, } from './styles';

interface Category {
  key: string;
  name: string;
}
interface Props {
  category: string;
  setCategory:  (category: Category) => void;
  closeCategory: () => void;
}

export function  CategorySelect({
  category,
  setCategory,
  closeCategory
}: Props) {
  return (
    <Container>
      <Header>
        <Title>
          Categorias
        </Title>
      </Header>
    </Container>
  );
}
