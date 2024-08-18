import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addUserData } from '../../redux/features/userSlice';
import { validationSchema } from '../../validation';
import SectionHeader from '../../components/SectionHeader/Index';
import InputWrapper from '../../components/Form/InputWrapper';
import RadioWrapper from '../../components/Form/RadioWrapper';
import * as Yup from 'yup';

function UncontrolledForm() {
  const countries = useSelector((state: RootState) => state.main.countries);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const refs = {
    name: useRef<HTMLInputElement | null>(null),
    email: useRef<HTMLInputElement | null>(null),
    age: useRef<HTMLInputElement | null>(null),
    password: useRef<HTMLInputElement | null>(null),
    confirmPassword: useRef<HTMLInputElement | null>(null),
    male: useRef<HTMLInputElement | null>(null),
    female: useRef<HTMLInputElement | null>(null),
    country: useRef<HTMLSelectElement | null>(null),
    image: useRef<HTMLInputElement | null>(null),
    terms: useRef<HTMLInputElement | null>(null),
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setImageBase64(result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImageBase64(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const age = refs.age.current?.value ? Number(refs.age.current.value) : 0;
    const imageFile = refs.image.current?.files ? refs.image.current.files[0] : null;
    const data = {
      name: refs.name.current?.value || '',
      email: refs.email.current?.value || '',
      age,
      password: refs.password.current?.value || '',
      confirmPassword: refs.confirmPassword.current?.value || '',
      gender: refs.male.current?.checked ? 'male' : refs.female.current?.checked ? 'female' : '',

      country: refs.country.current?.value || '',
      image: imageFile,
      terms: refs.terms.current?.checked || false,
    };

    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});

      const formData = {
        ...data,
        formTitle: 'React Uncontrolled Form',
        image: imageBase64,
      };

      dispatch(addUserData(formData));
      navigate('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            console.log(error.message);
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="container">
      <SectionHeader
        title="React Uncontrolled Form"
        desc="This form created using uncontrolled components approach and Yup"
      />
      <form className="form" onSubmit={handleSubmit}>
        <InputWrapper label="Name" htmlFor="name" error={errors.name}>
          <input ref={refs.name} type="text" id="name" name="name" placeholder="John" />
        </InputWrapper>

        <InputWrapper label="Email" htmlFor="email" error={errors.email}>
          <input ref={refs.email} id="email" name="email" type="email" placeholder="john@acme.com" />
        </InputWrapper>

        <InputWrapper label="Password" htmlFor="password" error={errors.password}>
          <input ref={refs.password} type="password" id="password" name="password" placeholder="*****" />
        </InputWrapper>

        <InputWrapper label="Confirm Password" htmlFor="confirmPassword" error={errors.confirmPassword}>
          <input
            ref={refs.confirmPassword}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="*****"
          />
        </InputWrapper>

        <div className="input-box">
          <InputWrapper label="Age" htmlFor="age" error={errors.age}>
            <input ref={refs.age} type="number" id="age" name="age" placeholder="Enter your age" />
          </InputWrapper>

          <RadioWrapper label="Gender" error={errors.gender}>
            <label htmlFor="male">
              Male
              <input ref={refs.male} type="radio" id="male" name="gender" value="male" />
            </label>
            <label htmlFor="female">
              Female
              <input ref={refs.female} type="radio" id="female" name="gender" value="female" />
            </label>
          </RadioWrapper>
        </div>

        <InputWrapper label="Country" htmlFor="country" error={errors.country}>
          <select ref={refs.country} name="country" id="country" className="form-select">
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </InputWrapper>

        <InputWrapper label="Upload Picture" htmlFor="image" error={errors.image}>
          <input ref={refs.image} type="file" id="image" accept={'.jpeg,.jpg,.png'} onChange={handleImageChange} />
        </InputWrapper>

        <label htmlFor="terms" className="terms">
          <input ref={refs.terms} type="checkbox" id="terms" name="terms" />
          <span>
            I have read and agree to the
            <button type="button">Terms & Conditions</button>
          </span>
          {errors?.terms && <p className="error-message">{errors.terms}</p>}
        </label>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
