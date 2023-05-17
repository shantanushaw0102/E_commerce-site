import { createContext, ReactNode, useEffect, useState } from 'react';

function Test() {
  let [loading, setLoading] = useState(true);
  const [categories, setCategorise] = useState();
  const getCategories = async () => {
    const responce = await fetch('http://127.0.0.1:8000/products/api/getCategories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await responce.json();
    if (responce.status === 200) {
      setLoading(false);
      setCategorise(data);
    } else {
      console.log('something went wrong');
    }
  };

  const createCategoriesElement = () => {
    if (categories) {
      const len = categories.length;
      const arr = Array(len).fill(false);
      /* for (let i = 0; i < len; i += 1) {
        console.log(categories[i].parent);
        if (categories[i].parent == null) {
          if (!arr[i]) {
            console.log(categories[i]);
            arr[i] = true;
          }
          for (let j = 0; j < len; j += 1) {
            if (categories[j].parent === categories[i].id) {
              if (!arr[j]) {
                console.log(categories[j]);
                arr[j] = true;
              }
            }
          }
        }
      } */
      const output = categories.map((element, index) => {
        return (
          <div key={`${element.id}`}>
            <h6>{`${element.parent}`}</h6>
          </div>
        );
      });
      console.log(output);
    }
  };

  useEffect(() => {
    if (loading) {
      getCategories();
    } else {
      createCategoriesElement();
    }
  }, [categories, loading]);

  return <div>lol</div>;
}

export default Test;
