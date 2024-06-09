import {useState} from 'react';
import {Button, Form, FloatingLabel} from 'react-bootstrap';
import {MyFormContainer} from './FormStyledComponent';
import {BACKEND_URL} from '../../Constant';
import {useAuth} from '../../AuthProvider';

const ProfileForm = () => {
    const {userData} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: userData.email,
        name: userData.name,
        dob: userData.dob,
        sex: userData.sex,
        phone: userData.phone
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update the user data here with an API call or other logic
        setIsEditing(false);
    };

    return (
       
            <MyFormContainer>
                <div className='formHeaderText'>Profile</div>
                <Form className="p-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className='profileLabel'>Email: {userData.email}</label>
                    </div>

                    {isEditing ? (
                        <>
                            <FloatingLabel controlId="name" label="Name" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="dob" label="Date of Birth" className="mb-3">
                                <Form.Control
                                    type="date"
                                    placeholder="Date of Birth"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="sex" label="Sex" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Sex"
                                    value={formData.sex}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                                <Form.Control
                                    type="tel"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>

                            <div className='formButton'>
                                <Button variant="warning" type="submit" size="lg">
                                    Submit
                                </Button>
                                <Button variant="secondary" onClick={() => setIsEditing(false) } size="lg" >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div >
                                <div className="mb-3">
                                    <label className='profileLabel'>Name: {userData.name}</label>
                                </div>
                                <div className="mb-3">
                                    <label className='profileLabel'>Date of Birth: {userData.dob}</label>
                                </div>
                                <div className="mb-3">
                                    <label className='profileLabel'>Sex: {userData.sex}</label>
                                </div>
                                <div className="mb-3">
                                    <label className='profileLabel'>Phone: {userData.phone}</label>
                                </div>

                                <div className='formButton'>
                                    <Button variant="warning" onClick={() => handleEdit()} size="lg">
                                        Edit
                                    </Button>
                                </div>
                            </div>

                        </>
                    )}
                </Form>
            </MyFormContainer>
        // </center>
    );
}

export default ProfileForm;
