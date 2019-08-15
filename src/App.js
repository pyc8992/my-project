import React from 'react';

function Food({ fav }) {

  return <h1>I like {fav}</h1>;
}

function App() {
  return (
    <div> 
      Hello!!
      {/* 동적으로 Property를 만들어서 하위 컴포넌트로 보낼 수 있음 */}
      {/* JSX = HTML + Javascript */}
      <Food fav="kimchi" />
      <Food fav="ramen" />
      <Food fav="sangiopsal" />
      <Food fav="chukumi" />
    </div>
  );
}

export default App;