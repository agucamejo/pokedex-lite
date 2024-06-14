import { useState, useCallback } from 'react';
import PropTypes from 'prop-types'; 
import Swal from 'sweetalert2'
import { addPokemon } from '../services/pokemonServices';

/**
 * Modal component for adding a new Pokemon.
 * @param {Object} props Component props.
 * @param {number} props.userId The ID of the user adding the Pokemon.
 * @param {function} props.onClose Function to call when closing the modal.
 */

const AddPokemonModal = ({ userId, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    level: '',
    evolutionId: '',
    type: '',
    urlImagen: '',
    abilities: [{ name: '', description: '' }],
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);


  //Handles input changes for abilities where index is index of the ability being changed.
  const handleAbilityChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const newAbilities = [...prevForm.abilities];
      newAbilities[index][name] = value;
      return { ...prevForm, abilities: newAbilities };
    });
  }, []);

  // Adds a new ability field to the form.
  const addAbility = useCallback(() => {
    setForm((prevForm) => ({
      ...prevForm,
      abilities: [...prevForm.abilities, { name: '', description: '' }],
    }));
  }, []);

  // Remove an ability field to the form.
  const removeAbility = useCallback((index) => {
    setForm((prevForm) => ({
      ...prevForm,
      abilities: prevForm.abilities.filter((_, i) => i !== index),
    }));
  }, []);

  //Handles form submission for adding a new Pokemon.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, level, evolutionId, type, urlImagen, abilities } = form;

    // Validate form fields
    if (!name || !level || !evolutionId || !type || !userId || !urlImagen || !abilities.length) {
      alert('Please, complete all the form.');
      return;
    }

    try {
      await addPokemon({
        name,
        lvl: level,
        evolutionId,
        type,
        urlImagen,
        userId,
        abilities
      });

      onClose();
      Swal.fire({
        title: "Good job!",
        text: "Your pokemon was updated",
        icon: "success"
      }).then(() => {
        window.location.reload(); 
      });
    } catch (error) {
      Swal.fire({
        text: "Your pokemon can not be created",
        icon: "warning"
      })
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='name'>
              <label>Name:</label>
              <input type="text" name="name" value={form.name} onChange={handleInputChange} required/>
            </div>
            <div className='type'>
              <label>Type:</label>
              <input type="text" name="type" value={form.type} onChange={handleInputChange} required/>
            </div>
            
          </div>
          <div className='row'>
            <div className='evolution'>
              <label>Evolution:</label>
              <input type="number" name="evolutionId" value={form.evolutionId} onChange={handleInputChange} min="0" required />
            </div>
            <div className='level'>
              <label>Level:</label>
              <input type="number" name="level" value={form.level} onChange={handleInputChange} min="0" required/>
            </div>
          </div>
          <div className='imagen'>
            <label>Image URL:</label>
            <input type="text" name="urlImagen" value={form.urlImagen} onChange={handleInputChange} required/>
          </div>
          <div className='abilities'>
            <h3>Abilities:</h3>
            {form.abilities.map((ability, index) => (
              <div key={index}>
                <input type="text" name="name" value={ability.name} onChange={(e) => handleAbilityChange(index, e)} placeholder='Abilitie name' required />
                <input type="text" name="description" value={ability.description} onChange={(e) => handleAbilityChange(index, e)} placeholder='Abilitie description' required/>
                {form.abilities.length > 1 && (
                  <button type="button" onClick={() => removeAbility(index)} className='btn-delete'>Delete</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addAbility} className='btn-add'>Add abilitie +</button>
          </div>
          <button type="submit">Add Pokemon</button>
        </form>
      </div>
    </div>
  );  
};

AddPokemonModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default AddPokemonModal;