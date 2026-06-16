'use client';

import { validations } from '../../../utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

interface ApiError {
  success: boolean;
  error: string;
  details?: Record<string, string>;
}

const UserForm = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(validations) as any,
    mode: 'onTouched',
  });

  const onSubmit = async (data: any) => {
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_APPLICATION_API_KEY ?? ''}`,
        },
        body: JSON.stringify(data),
      });

      const response: ApiError = await res.json();

      if (res.status === 201 && response.success) {
        setSubmitStatus('success');
        reset();
      } else if (res.status === 400 && response.details) {
        setSubmitStatus('error');
        Object.entries(response.details).forEach(([field, message]) => {
          setError(field, { type: 'server', message });
        });
      } else if (res.status === 401) {
        setSubmitStatus('error');
        setErrorMessage(response.error || 'Unauthorized');
      } else {
        setSubmitStatus('error');
        setErrorMessage(response.error || 'An error occurred');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit form. Please try again.');
    }
  };

  const handleInputChange = (field: string) => {
    clearErrors(field);
    if (submitStatus === 'success') {
      setSubmitStatus('idle');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        User Registration
      </h2>

      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Application submitted successfully!
        </div>
      )}

      {submitStatus === 'error' && errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Enter your name"
          {...register('name', { onChange: () => handleInputChange('name') })}
          className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.name
              ? 'border-red-500 focus:ring-2 focus:ring-red-500'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Enter your email"
          {...register('email', { onChange: () => handleInputChange('email') })}
          className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.email
              ? 'border-red-500 focus:ring-2 focus:ring-red-500'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          placeholder="Enter your age"
          {...register('age', { onChange: () => handleInputChange('age') })}
          className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.age
              ? 'border-red-500 focus:ring-2 focus:ring-red-500'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{String(errors.age.message)}</p>
        )}
      </div>

      <div>
        <select
          {...register('gender', { onChange: () => handleInputChange('gender') })}
          defaultValue=""
          className={`w-full px-4 py-3 border rounded-lg outline-none bg-white transition-all ${errors.gender
              ? 'border-red-500 focus:ring-2 focus:ring-red-500'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{String(errors.gender.message)}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default UserForm;
