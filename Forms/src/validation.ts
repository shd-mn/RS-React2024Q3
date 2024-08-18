import * as Yup from 'yup';
const numberRegex = /(?=.*[0-9])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const lowercaseRegex = /(?=.*[a-z])/;
const specialCharRegex = /(?=.*[\W])/;

export const validationSchema = Yup.object()
  .shape({
    name: Yup.string()
      .matches(/^\p{Lu}[\p{Ll}Şş]+$/u, 'Name should start with an uppercase letter')
      .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .required('Age is required'),

    password: Yup.string()
      .matches(numberRegex, 'Password must include at least one number.')
      .matches(uppercaseRegex, 'Password must include at least one uppercase letter.')
      .matches(lowercaseRegex, 'Password must include at least one lowercase letter.')
      .matches(specialCharRegex, 'Password must include at least one special character.')
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
    terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    image: Yup.mixed<File | FileList>()
      .required('Picture is required')
      .test('fileSize', 'File Size is too large', (value) => {
        if (!value || (value instanceof FileList && !value.length) || (value instanceof File && value.name === ''))
          return true;
        const file = value instanceof FileList ? value[0] : value;
        return file.size <= 2 * 1024 * 1024;
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        if (!value || !(value instanceof FileList) || value.length === 0) return true;
        const file = value[0];
        return ['image/jpeg', 'image/png'].includes(file.type);
      }),
  })
  .required();
