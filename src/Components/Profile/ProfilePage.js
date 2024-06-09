import { useState } from 'react';
import logo_image from '../../images/logo-image.png';
import DishItem from '../DishItemComponent/DishItem';
import ProfileForm from './ProfileForm';

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <DishItem />
      ) : (
        <div className='registrationMainDiv'>
          <div style={{ marginLeft: '200px' }}>
            <img src={logo_image} alt='' height='580' width='250' />
          </div>
          <ProfileForm setLogin={setLogin} />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
