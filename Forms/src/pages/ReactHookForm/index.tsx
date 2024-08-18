import { yupResolver } from '@hookform/resolvers/yup';
import SectionHeader from '../../components/SectionHeader/Index';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validationSchema } from '../../validation';
import InputWrapper from '../../components/Form/InputWrapper';
import RadioWrapper from '../../components/Form/RadioWrapper';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserData } from '../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  name: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  terms?: boolean;
  image: File | FileList;
};

function ReactHookForm() {
  const countries = useSelector((state: RootState) => state.main.countries);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema), mode: 'all' });

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = {
      ...data,
      formTitle: 'React Hook Form',
      image: imageBase64,
    };
    dispatch(addUserData(formData));
    navigate('/');
  };
  return (
    <div className="container">
      <SectionHeader title="React Hook Form" desc="This form created using React hook form and Yup" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper label="Name" htmlFor="name" error={errors.name?.message}>
          <input type="text" id="name" {...register('name')} placeholder="John" />
        </InputWrapper>

        <InputWrapper label="Email" htmlFor="email" error={errors.email?.message}>
          <input type="email" id="email" {...register('email')} placeholder="john@acme.com" />
        </InputWrapper>

        <InputWrapper label="Password" htmlFor="password" error={errors.password?.message}>
          <input type="password" id="password" {...register('password')} placeholder="*****" />
        </InputWrapper>

        <InputWrapper label="Confirm Password" htmlFor="confirmPassword" error={errors.confirmPassword?.message}>
          <input type="password" id="confirmPassword" {...register('confirmPassword')} placeholder="*****" />
        </InputWrapper>

        <div className="input-box">
          <InputWrapper label="Age" htmlFor="age" error={errors.age?.message}>
            <input type="number" id="age" {...register('age')} placeholder="Enter your age" />
          </InputWrapper>

          <RadioWrapper label="Gender" error={errors.gender?.message}>
            <label htmlFor="male">
              male
              <input type="radio" id="male" {...register('gender')} value="male" />
            </label>
            <label htmlFor="female">
              female
              <input type="radio" id="female" {...register('gender')} value="female" />
            </label>
          </RadioWrapper>
        </div>

        <InputWrapper label="Country" htmlFor="country" error={errors.country?.message}>
          <select id="country" {...register('country')} className="form-select">
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </InputWrapper>

        <InputWrapper label="Upload Picture" htmlFor="image" error={errors.image?.message}>
          <input
            type="file"
            accept={'.jpeg,.jpg,.png'}
            id="image"
            {...register('image')}
            onChange={handleImageChange}
          />
        </InputWrapper>

        <label htmlFor="terms" className="terms">
          <input type="checkbox" id="terms" {...register('terms')} />
          <span>
            I have read and agree to the
            <button>Terms & Conditions</button>
          </span>
          {errors?.terms && <p className="error-message">{errors.terms.message}</p>}
        </label>

        <input type="submit" className="submit-btn" disabled={!isValid} />
      </form>
    </div>
  );
}

export default ReactHookForm;
