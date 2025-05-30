import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

import clsx from 'clsx';
import styles from './LoginSignup.module.css';

const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const shakeAnimation = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmitLogin = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        localStorage.setItem('token', 'dummy-token'); // For demo, store dummy token
        window.location.href = '/dashboard';
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (err) {
      alert('Login error');
    }
  };

  const onSubmitSignup = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        alert('Signup successful! Please login.');
        setIsLogin(true);
        reset();
      } else {
        alert(result.message || 'Signup failed');
      }
    } catch (err) {
      alert('Signup error');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className={styles.page}>
      <div className={styles.toggleContainer}>
        <button
          className={clsx(styles.toggleButton, isLogin && styles.active)}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={clsx(styles.toggleButton, !isLogin && styles.active)}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.form
            key="login"
            className={styles.form}
            onSubmit={handleSubmit(onSubmitLogin)}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                className={clsx(errors.email && styles.errorInput)}
              />
              {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                className={clsx(errors.password && styles.errorInput)}
              />
              {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
            </div>
            <div className={styles.forgotPassword}>
              <a href="#">Forgot Password?</a>
            </div>
            <motion.button
              type="submit"
              className={styles.submitButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              Login
            </motion.button>
          </motion.form>
        ) : (
          <motion.form
            key="signup"
            className={styles.form}
            onSubmit={handleSubmit(onSubmitSignup)}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Name"
                {...register('name', { required: 'Name is required' })}
                className={clsx(errors.name && styles.errorInput)}
              />
              {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                className={clsx(errors.email && styles.errorInput)}
              />
              {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required', minLength: 6 })}
                className={clsx(errors.password && styles.errorInput)}
              />
              {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) =>
                    value ===
                    (document.querySelector('input[name="password"]')?.value || '') ||
                    'Passwords do not match',
                })}
                className={clsx(errors.confirmPassword && styles.errorInput)}
              />
              {errors.confirmPassword && (
                <p className={styles.errorMsg}>{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="terms"
                {...register('terms', { required: 'You must accept terms' })}
              />
              <label htmlFor="terms">I accept the Terms & Conditions</label>
            </div>
            {errors.terms && <p className={styles.errorMsg}>{errors.terms.message}</p>}
            <motion.button
              type="submit"
              className={styles.submitButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              Sign Up
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
