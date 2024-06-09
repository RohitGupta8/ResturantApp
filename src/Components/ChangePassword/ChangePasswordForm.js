import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel, Modal } from 'react-bootstrap';
import { MyFormContainer } from './FormStyledComponent';
import { BACKEND_URL } from '../../Constant';
import { useAuth } from '../../AuthProvider';

const ChangePasswordForm = () => {
    const { userData } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        email: userData.email,
        dob: userData.dob,
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showModal]);

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

    const validate = () => {
        const newErrors = {};
        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'New password must be at least 6 characters long';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const resetForm = () => {
        setFormData({
            email: userData.email,
            dob: userData.dob,
            newPassword: '',
            confirmPassword: ''
        });
        setSubmitted(false);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/forget`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setModalMessage('Password changed successfully');
                resetForm();
            } else {
                setModalMessage('Invalid request or error occurred');
            }
        } catch (error) {
            setModalMessage('An error occurred. Please try again.');
        }

        setShowModal(true);
    };

    return (
        <center>
            <MyFormContainer>
                <div className='formHeaderText'>Change Password</div>
                <Form className="p-3" onSubmit={handleSubmit}>
                    <FloatingLabel controlId="newPassword" label="New Password" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            isInvalid={submitted && !!errors.newPassword}
                        />
                        <Form.Control.Feedback type="invalid" className='feedbackText'>
                            {errors.newPassword}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            isInvalid={submitted && !!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid" className='feedbackText'>
                            {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <div className='formButton'>
                        <Button variant="warning" type="submit" size="lg">
                            Submit
                        </Button>
                    </div>
                </Form>
            </MyFormContainer>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered aria-labelledby="contained-modal-title-vcenter" size='sm'>
                <Modal.Body className='modalOpen'>
                    <h4>Message</h4>
                    <p>{modalMessage}</p>
                </Modal.Body>
            </Modal>
        </center>
    );
};

export default ChangePasswordForm;
