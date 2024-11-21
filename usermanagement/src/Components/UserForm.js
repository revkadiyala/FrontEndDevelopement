import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Validation schema
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
    .max(8, 'Password must not be more than 8 characters')  
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
  confirmpassword: yup.string().required('Confirm Password is required')
  .max(8, 'confirm Password must not be more than 8 characters')  
    .matches(/[A-Z]/, 'confirm Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'confirm Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'confirm Password must contain at least one special character'),
});

function UserForm({ user, onSubmit }) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      password: user ? user.password : '',
      confirmpassword: user ? user.confirmpassword:'',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const updatedUser = user ? { ...user, ...values } : values;
      onSubmit(updatedUser);
      navigate('/users');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="form-error">{formik.errors.name}</div>
        ) : null}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="form-error">{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="form-error">{formik.errors.password}</div>
        ) : null}
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          value={formik.values.confirmpassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
        />
        {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
          <div className="form-error">{formik.errors.confirmpassword}</div>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
