import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  // Estados del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dropdownData, setDropdownData] = useState([]); // state que almacena las opciones
  const [selectedOption, setSelectedOption] = useState(''); // state que almacena la opcion seleccionada
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    // Modifica el codigo para traer las opciones del proyecto de flask usando axios
    setDropdownData(['Option 1', 'Option 2', 'Option 3']);
  }, []);

  // Función para manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) errors.email = "Email is not valid";

    setFormErrors(errors);

    // Si no hay errores, procesamos el formulario
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted successfully');
      console.log({ name, email });
    }
  };

  return (
    <div className="App">
      <h1>Simple Form</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* Nombre */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ width: '100%', padding: '8px' }} 
          />
          {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
        </div>

        {/* Correo */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px' }} 
          />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </div>

        {/* Dropdown */}
        <div style={{ marginBottom: '10px' }}>
          {/* Aqui agrega tu codigo del select usando el tag <select></select>, no valides formErrors  */}
        </div>

        {/* Submit button */}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;