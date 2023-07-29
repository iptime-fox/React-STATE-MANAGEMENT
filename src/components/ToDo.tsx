import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState, categoryState } from '../atoms';
import { styled } from 'styled-components';
import { Helmet } from 'react-helmet';

const ButtonWrapper = styled.div`
  button {
    border: 1px solid #ff8989;
    border-radius: 20px;
    padding: 0.25rem 0.5rem;
    background-color: #fff;
    color: #ff8989;
    margin-left: 2px;
    font-size: 12px;
    margin-bottom: 2px;
    &:hover {
      background-color: #ff8989;
      color: #fff;
    }
  }
  :last-child {
    border: none;
    background-color: #fff;
    margin-left: none;
    font-size: 14px;
    &:hover {
      background-color: #fff;
    }
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const Delete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>ToDo</title>
      </Helmet>
      <li>
        <span>🧸 {text}</span>
        <ButtonWrapper>
          {category !== Categories.DOING && (
            <button name={Categories.DOING} onClick={onClick}>
              Doing
            </button>
          )}
          {category !== Categories.TO_DO && (
            <button name={Categories.TO_DO} onClick={onClick}>
              To Do
            </button>
          )}
          {category !== Categories.DONE && (
            <button name={Categories.DONE} onClick={onClick}>
              Done
            </button>
          )}
          <button onClick={Delete}>🗑️</button>
        </ButtonWrapper>
      </li>
    </>
  );
}

export default ToDo;
