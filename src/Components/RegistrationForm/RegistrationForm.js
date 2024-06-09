import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel, Modal } from 'react-bootstrap';
import { MyFormContainer } from './FormStyledComponent';
import { BACKEND_URL } from '../../Constant';
const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        sex: '',
        dob: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });

        if (errors[e.target.id]) {
            setErrors({
                ...errors,
                [e.target.id]: ''
            });
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            phone: '',
            sex: '',
            dob: '',
            email: '',
            password: ''
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be a 10-digit number';
        if (!formData.sex) newErrors.sex = 'Sex is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const res = await fetch(`${BACKEND_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.status === 201) {
                setModalMessage('Successfully registered...........');
                resetForm();
            } else {
                setModalMessage('Registration failed................');
            }
            setShowModal(true);
        }
    };

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showModal]);

    return (
        <center>
            <MyFormContainer>
                <div className='formHeaderText'>Sign up</div>
                <Form className="p-3" onSubmit={handleSubmit}>
                    <FloatingLabel controlId="name" label="Full Name" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={submitted && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid" className='feedbackText' >{errors.name}</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            isInvalid={submitted && !!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid" className='feedbackText' >{errors.phone}</Form.Control.Feedback>
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

                    <FloatingLabel controlId="dob" label="Date of Birth" className="mb-3">
                        <Form.Control
                            type="date"
                            placeholder="Date of Birth"
                            value={formData.dob}
                            onChange={handleChange}
                            isInvalid={submitted && !!errors.dob}
                        />
                        <Form.Control.Feedback type="invalid" className='feedbackText' >{errors.dob}</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="email" label="Email address" className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={submitted && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid" className='feedbackText' >{errors.email}</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Password" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={submitted && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid" className='feedbackText' >{errors.password}</Form.Control.Feedback>
                    </FloatingLabel>
                    <div className='formButton'>
                        <Button variant="warning" type="submit" size="lg">
                            Submit
                        </Button>
                        <Button variant="secondary" size="lg" onClick={() => resetForm()}>
                            Reset
                        </Button>
                    </div>
                </Form>
            </MyFormContainer>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered aria-labelledby="contained-modal-title-vcenter" size='sm' >
                <Modal.Body className='modalOpen'>
                    <h4>Message</h4>
                    <p>{modalMessage}</p>                    
                </Modal.Body>
            </Modal>
        </center>
    );
}

export default RegistrationForm;
