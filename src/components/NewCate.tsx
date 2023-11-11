import { useRecoilState } from 'recoil';
import { categoryState, IToDo, newCateState } from '../atoms';
import { useForm } from 'react-hook-form';

interface IForm {
  newCate: string;
}

function NewCate() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [category1, setCategory1] = useRecoilState(newCateState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ newCate }: IForm) => {
    setCategory1((prev) => {
      const newCates = { ...prev, [newCate]: [] };

      return newCates;
    });
    setValue('newCate', '');
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register('newCate', { required: true })}
        type='text'
        placeholder='Create new categories'
      />
    </form>
  );
}

export default NewCate;
