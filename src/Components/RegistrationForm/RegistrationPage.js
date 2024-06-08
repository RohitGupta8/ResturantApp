import RegistrationForm from './RegistrationForm'
import logo_image from '../../images/logo-image.png'

const RegistrationPage = () => {
  return (
    <>
     <div className='registrationMainDiv'>
        <div style={{marginLeft:'200px'}}>
            <img src={logo_image} alt='' height='580' width='250' />
        </div>
      <RegistrationForm/>
      </div>
    </>
   
  )
}

export default RegistrationPage
