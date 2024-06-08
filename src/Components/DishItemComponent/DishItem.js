import { useState, useEffect, useCallback } from "react";
import DishesCardComponent from "../DishesCardComponent/DishesCardComponent";
import { Data } from '../../Data';
import { MainContainer } from './DishItemStyledComponent';
import NavBar from "../NavBar/NavBar";

const DishItem = () => {
  const [radioValue, setRadioValue] = useState('All');
  const [filteredDishes, setFilteredDishes] = useState(Data);
  const [category, setCategory] = useState('All');

  const filterDishes = useCallback(() => {
    let filtered = Data;

    if (category !== 'All') {
      filtered = filtered.filter(dish => dish.category === category);
    }

    if (radioValue !== 'All') {
      filtered = filtered.filter(dish => dish.type === radioValue);
    }

    setFilteredDishes(filtered);
  }, [category, radioValue]);

  useEffect(() => {
    filterDishes();
    // eslint-disable-next-line
  }, [filterDishes]);

  return (
    <>
      <NavBar setCategory={setCategory} setRadioValue={setRadioValue} radioValue={radioValue} />
      <div className="main_div">
        <MainContainer>
          {filteredDishes.map((dish, index) => (
            <DishesCardComponent key={index} value={dish} />
          ))}
        </MainContainer>
      </div>
    </>
  );
}

export default DishItem;
