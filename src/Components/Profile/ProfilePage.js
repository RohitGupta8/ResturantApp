import logo_image from '../../images/logo-image.png';
import ProfileForm from './ProfileForm';

const ProfilePage = () => {
  return (
    <>
      <div className='registrationMainDiv'>
        <div style={{marginLeft: '200px'}}>
          <img src={logo_image} alt='' height='580' width='250' />
        </div>
        <ProfileForm />
      </div>
    </>
  );
};

export default ProfilePage;
