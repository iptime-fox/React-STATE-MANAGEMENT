import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Categories, IToDo, categoryState, toDoSelector } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import { styled } from 'styled-components';
import { Helmet } from 'react-helmet';
import NewCate from './NewCate';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const ToDoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: auto;
`;

const Header = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin: 5rem 0 2.5rem;
`;

const SelectWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  width: 70%;

  margin-bottom: 1.5rem;
  justify-content: center;
  select {
    width: 7rem;
    background-color: #ffacac;
    color: #fff;
    border: none;
    border-radius: 0.4rem;
    padding: 0.25rem;
    text-align: center;
    font-size: 1rem;
  }
  input {
    width: 200px;
    border: none;
    border-bottom: 2px solid #ffacac;
    padding: 0.25rem 0.5rem;
  }
`;

const LiWrapper = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  padding: 0.875rem;
  width: 70%;

  border-radius: 0.5rem;
  li {
    border-bottom: 1.5px solid #ffacac;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
  }
`;

interface IForm {
  category: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Container>
      <Helmet>
        <title>ToDo</title>
      </Helmet>
      <ToDoWrapper>
        <Header>🧸 TO DO LIST 🧸</Header>

        <SelectWrapper>
          <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>Todo</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </select>
          <NewCate />
        </SelectWrapper>
        <CreateToDo />
        <LiWrapper>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </LiWrapper>
      </ToDoWrapper>
    </Container>
  );
}

export default ToDoList;
