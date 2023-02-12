import './App.css';
import TodoProvider from './Context/TodoContext';

import Form from './component/Form';
//when use called provider you can't access to the update state so you must create new component if you want to use it
function App() {
  return (
    <TodoProvider>
      {/* all components */}
      <Form />
    </TodoProvider>
  );
}

export default App;
