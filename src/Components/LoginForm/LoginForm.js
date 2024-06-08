import { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { MyFormContainer } from './FormStyledComponent';
import { BACKEND_URL } from '../../Constant';

const LoginForm = ({ setLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loginError, setLoginError] = useState('');

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

        setLoginError(''); // Clear login error on input change
    };

    const resetForm = () => {
        setFormData({
            email: '',
            password: ''
        });
        setLoginError(''); // Clear login error on reset
    };

    const validate = () => {
        const newErrors = {};
    
        // More complex email regex pattern
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // Check for required fields
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
    
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
    
        return newErrors;
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Form Submitted', response);
                const data = await response.json();
                console.log('Response Data:', data);

                if (data.token) {
                    console.log('Token:', data.token);
                    resetForm();
                    setLogin(true);
                } else {
                    setLoginError('No token found in response');
                }
            } else {
                setLoginError('Invalid credentials ...');
            }
        }
    };

    return (
        <center>
            <MyFormContainer>
                <div className='signupText'>Sign In</div>
                <Form className="p-3" onSubmit={handleSubmit}>

                    <FloatingLabel controlId="email" label="Email address" className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={submitted && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid" className='feedbackText'>{errors.email}</Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Password" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={submitted && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid" className='feedbackText'>{errors.password}</Form.Control.Feedback>
                    </FloatingLabel>

                    {loginError && (
                        <div className="feedbackText">{loginError}</div>
                    )}

                    <div className='formButton'>
                        <Button variant="warning" type="submit" size="lg">
                            Submit
                        </Button>
                        <Button variant="secondary" size="lg" onClick={resetForm}>
                            Reset
                        </Button>
                    </div>
                </Form>
            </MyFormContainer>
        </center>
    );
}

export default LoginForm;
