import { memo } from 'react';
import Phone from './components/Phone';

const App = () => {
  return (
    <div className="App">
      <h2>
        <Phone/>
      </h2>
    </div>
  );
};

export default memo(App);