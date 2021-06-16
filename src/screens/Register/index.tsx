import React, { useState } from 'react';
import { 
  Keyboard, 
  Modal, 
  TouchableWithoutFeedback,
  Alert
} from 'react-native';

import * as Yup from 'yup';
import uuid from 'react-native-uuid';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useNavigationState } from '@react-navigation/native';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor númerico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório'),

});

export function Register() {
  

  const [trasactionType, setTransactionType] = useState('');
  const [categorieModalOpen, setCategorieModalOpen] = useState(false);



  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategorieModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategorieModalOpen(true);
  }

  async function handleRegister({ name, amount }: FormData) {
    const dataKey = '@gofinances:transactions';

    const newTransaction = {
      id: String(uuid.v4()),
      name,
      amount,
      type: trasactionType,
      category: category.key,
      date: new Date()
    }

    try{
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];

      console.log(dataFormatted)


      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate('Listagem');

  }catch(err){
      console.log(err);
      Alert.alert("Não foi possivel salvar");
    }

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>

        <S.Header>
          <S.Title>
            Cadastro
          </S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <S.TransactionsTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={trasactionType === 'positive'}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={trasactionType === 'negative'}
              />
            </S.TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </S.Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
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
    </TouchableWithoutFeedback>
  );
}