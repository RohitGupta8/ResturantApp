import {useState, useEffect} from 'react';
import {Button, Form, FloatingLabel, Modal} from 'react-bootstrap';
import {MyFormContainer} from './FormStyledComponent';
import {BACKEND_URL} from '../../Constant';
import {useAuth} from '../../AuthProvider';

const ProfileForm = () => {
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const {userData, setUserData} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: userData.email,
        name: userData.name,
        dob: userData.dob,
        sex: userData.sex,
        phone: userData.phone
    });

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showModal]);

    const resetForm = () => {
        setFormData({
            email: userData.email,
            name: '',
            dob: '',
            sex: '',
            phone: ''
        })
        setIsEditing(false)
        setSubmitted(false);
        setErrors({})
    }

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData({
            ...formData,
            [id]: value
        });

        if (errors[id]) {
            setErrors({
                ...errors,
                [id]: ''
            });
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const res = await fetch(`${BACKEND_URL}/userUpdate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            const data = await res.json();
            setUserData({
                ...userData,
                ...data.data
            });
            setIsEditing(false);
            setModalMessage('Update profile successfully');
        } else {
            setModalMessage('Failed to update profile');

        }
        setShowModal(true);
        setSubmitted(false);
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 6) {
            newErrors.name = 'Name must be more than 6 characters';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone must be a 10-digit number';
        }

        if (!formData.sex) {
            newErrors.sex = 'Sex is required';
        }

        if (!formData.dob) {
            newErrors.dob = 'Date of Birth is required';
        }

        return newErrors;
    };

    return (
        <>
            <MyFormContainer>
                <div className='formHeaderText'>{isEditing ? "Profile Update" : "Profile"}</div>
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
                                    isInvalid={submitted && !!errors.name}
                                />
                                <Form.Control.Feedback type="invalid" className='feedbackText'>{errors.name}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="dob" label="Date of Birth" className="mb-3">
                                <Form.Control
                                    type="date"
                                    placeholder="Date of Birth"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    isInvalid={submitted && !!errors.dob}
                                />
                                <Form.Control.Feedback type="invalid" className='feedbackText'>{errors.dob}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="sex" className="mb-3" label='Sex'>
                                <Form.Select
                                    aria-label="Floating label select example"
                                    value={formData.sex}
                                    onChange={handleChange}
                                    isInvalid={submitted && !!errors.sex}
                                >
                                    <option value="">Not Selected</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" className='feedbackText' >{errors.sex}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                                <Form.Control
                                    type="tel"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    isInvalid={submitted && !!errors.phone}
                                />
                                <Form.Control.Feedback type="invalid" className='feedbackText'>{errors.phone}</Form.Control.Feedback>
                            </FloatingLabel>

                            <div className='formButton'>
                                <Button variant="warning" type="submit" size="lg">
                                    Submit
                                </Button>
                                <Button variant="secondary" onClick={() => resetForm()} size="lg">
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
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
                                    <Button variant="warning" onClick={handleEdit} size="lg">
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </Form>
            </MyFormContainer>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered aria-labelledby="contained-modal-title-vcenter" size='sm'>
                <Modal.Body className='modalOpen'>
                    <h4>Message</h4>
                    <p>{modalMessage}</p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProfileForm;
