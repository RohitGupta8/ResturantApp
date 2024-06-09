import logo_image from '../../images/logo-image.png';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordPage = () => {

  return (
    <>
      <div className='registrationMainDiv'>
        <div style={{marginLeft: '200px'}}>
          <img src={logo_image} alt='' height='580' width='250' />
        </div>
        <ChangePasswordForm />
      </div>
    </>
  );
};

export default ChangePasswordPage;
