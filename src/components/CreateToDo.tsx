import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';
import { styled } from 'styled-components';

const CreateWrapper = styled.div`
  width: 70%;
  margin-bottom: 1rem;
  form {
    display: flex;
    justify-content: center;
    column-gap: 1.5rem;
  }
  input {
    width: 80%;
    border: 2px solid #ffacac;
    padding: 0.25rem 0.5rem;
    border-radius: 0.4rem;
  }
  button {
    border: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background-color: #ffacac;
    font-size: 1rem;
    color: #fff;
    font-weight: 600;
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };
  return (
    <CreateWrapper>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register('toDo', {
            required: 'Please write a To Do',
          })}
          placeholder='Write a to do'
        />

        <button>+</button>
      </form>
    </CreateWrapper>
  );
}
export default CreateToDo;
