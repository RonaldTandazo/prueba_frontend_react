import { useState, useEffect } from 'react'
import FormService from './services/formService';
import './App.css'

function App() {
  // Estados del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dropdownData, setDropdownData] = useState([]); // state que almacena las opciones
  const [selectedOption, setSelectedOption] = useState(''); // state que almacena la opcion seleccionada
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getOptions = async () => {
      try {
        const data = await FormService.getOptions();
        setDropdownData(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false)
      }
    };

    getOptions()
  }, []);

  if(loading) return <h1>Loading...</h1>

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
      setLoading(true)
      const data = {name, email, option: selectedOption}
      save(data)
    }
  };

  const save = async (data) => {
    try{
      const save = await FormService.storeForm(data)
      alert(save.message)
    }catch(err){
      alert(err.message || "Error while saving data")
    }finally{
      resetFields()
      setLoading(false)
    }
  }

  const resetFields = () => {
    setName('')
    setEmail('')
    setSelectedOption('')
  }

  const handleSelect = (e) => {
    setSelectedOption(e.target.value)
  }

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
          <p>Select an Option</p>
          <select
            id='dropdown'
            value={selectedOption}
            onChange={handleSelect}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value='' disabled>Select an Option</option>
            {dropdownData && dropdownData.map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))}
          </select>
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