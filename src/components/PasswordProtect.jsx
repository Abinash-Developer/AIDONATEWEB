import React, { useState } from "react";

const PasswordProtect = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '7077430068') { // Replace with your actual password
      setIsAuthorized(true);
      localStorage.setItem('isAuthorized', true);
    } else {
      alert('Incorrect password');
    }
  };

  if (isAuthorized || localStorage.getItem('isAuthorized')) {
    return children;
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Welcome! Please Enter Your Access Code</h2>
        <p style={styles.subtext}>To continue to the site, please enter the access code provided to you.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Access Code"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Unlock</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: ' #505050',
  },
  formContainer: {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  subtext: {
    margin: '1rem 0',
    color: '#009245',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#009245',
    color: 'white',
    cursor: 'pointer',
  },
};

export default PasswordProtect;
