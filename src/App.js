
import React from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

const updateUser = (user) => ({
  type: 'UPDATE_USER',
  payload: user,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

const initialState = {
  user: {
    name: '',
    age: 0,
    gender: '',
  },
};

const store = createStore(reducer, initialState);

const UserForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateUser({ [name]: value }));
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
        placeholder="Имя"
      />
      <input
        type="number"
        name="age"
        value={user.age}
        onChange={handleInputChange}
        placeholder="Возраст"
      />
      <select
        name="gender"
        value={user.gender}
        onChange={handleInputChange}
      >
        <option value="">Выберите пол</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>
      <div>
        <h2>Данные пользователя:</h2>
        <p>Имя: {user.name}</p>
        <p>Возраст: {user.age}</p>
        <p>Пол: {user.gender}</p>
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <UserForm />
  </Provider>
);

export default App;
