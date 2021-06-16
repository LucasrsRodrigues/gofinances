import React, { useState } from 'react';
import * as S from './styles';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';
import { Modal } from 'react-native';


export function Register() {
  const [trasactionType, setTransactionType] = useState('');
  const [categorieModalOpen, setCategorieModalOpen] = useState(false);
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal(){
    setCategorieModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategorieModalOpen(true);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          Cadastro
        </S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />
          <S.TransactionsTypes>
            <TransactionTypeButton
              title="Income"
              type="up"
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={trasactionType === 'up'}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={trasactionType === 'down'}
            />
          </S.TransactionsTypes>
          
          <CategorySelectButton
            title={category.name} 
            onPress={handleOpenSelectCategoryModal}
          />
        </S.Fields>


        <Button title="Enviar" />
      </S.Form>

      <Modal 
        visible={categorieModalOpen}
      >
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </S.Container>
  );
}