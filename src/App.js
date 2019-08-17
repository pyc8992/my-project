import React from 'react';

const foodILike = [
  {
    id:0,
    name: "Kimchi",
    image:
      "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg"
  },
  {
    id:1,
    name: "Samgyeopsal",
    image:
      "https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg"
  },
  {
    id:2,
    name: "Bibimbap",
    image:
      "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb"
  },
  {
    id:3,
    name: "Doncasu",
    image:
      "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg"
  },
  {
    id:4,
    name: "Kimbap",
    image:
      "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg"
  }
];

function Food({ name, picture }) {

  return <div>
    <h1>I like {name}</h1>
    <img src={picture} alt={name} />
  </div>
}

function App() {
  return (
    <div> 
      Hello!!
      {/* 동적으로 Property를 만들어서 하위 컴포넌트로 보낼 수 있음 */}
      {/* JSX = HTML + Javascript */}
      {foodILike.map(dish => <Food key={dish.id} name={dish.name} picture={dish.image} />)}
    </div>
  );
}

export default App;