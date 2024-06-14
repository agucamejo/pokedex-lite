import PropTypes from 'prop-types';
import { useState } from 'react';
import Swal from 'sweetalert2'
import { updatePokemon } from '../services/pokemonServices';

/**
 * Component for editing details of a Pokemon.
 * @param {Object} props Component props.
 * @param {Object} props.pokemon The Pokemon object to edit.
 * @param {function} props.onClose Function to call when closing the modal.
 * @returns {JSX.Element} JSX element representing the edit form for Pokemon details.
 */

const EditPokemon = ({ pokemon, onClose }) => {
  const [formData, setFormData] = useState({
    name: pokemon.name,
    lvl: pokemon.lvl,
    evolutionId: pokemon.evolutionId,
    types: pokemon.types.join(', '),
    urlImagen: pokemon.urlImagen,
    abilities: pokemon.abilities.length > 0 ? pokemon.abilities.map(ability => ({ ...ability })) : [{ name: '', description: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  //Handles input changes for abilities where index is index of the ability being edited.
  const handleAbilityChange = (index, e) => {
    const { name, value } = e.target;
    const abilities = [...formData.abilities];
    abilities[index][name] = value;
    setFormData({
      ...formData,
      abilities
    });
  };

  // Adds a new ability field to the form.
  const handleAddAbility = () => {
    setFormData({
      ...formData,
      abilities: [...formData.abilities, { name: '', description: '' }]
    });
  };

  // Remove a new ability field to the form.
  const handleRemoveAbility = (index) => {
    const abilities = [...formData.abilities];
    abilities.splice(index, 1);
    setFormData({
      ...formData,
      abilities
    });
  };

  //Handles form submission to update the Pokemon.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await updatePokemon({
        ...formData,
        id: pokemon.id,
        types: formData.types
      });

      if (success) {
        onClose();
        Swal.fire({
          title: "Good job!",
          text: "Your pokemon was updated",
          icon: "success"
        }).then(() => {
          window.location.reload(); 
        });
      } else {
        Swal.fire({
          text: "Your pokemon can not be updated",
          icon: "warning"
        })
      }
    } catch (error) {
      Swal.fire({
        text: "Your pokemon can not be updated",
        icon: "warning"
      })
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Edit Pokemon</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Level:</label>
            <input type="number" name="lvl" value={formData.lvl} onChange={handleChange} required/>
          </div>
          <div>
            <label>Evolution:</label>
            <input type="number" name="evolutionId" value={formData.evolutionId} onChange={handleChange} required/>
          </div>
          <div>
            <label>Type:</label>
            <input type="text" name="types" value={formData.types} onChange={handleChange} required />
          </div>
          <div>
            <label>Image URL:</label>
            <input type="text" name="urlImagen" value={formData.urlImagen} onChange={handleChange} required />
          </div>
          <h3>Abilities:</h3>
          {formData.abilities.map((ability, index) => (
            <div key={index}>
              <input type="text" name="name" value={ability.name} onChange={(e) => handleAbilityChange(index, e)} placeholder='Ability name' required/>
              <input type="text" name="description" value={ability.description} onChange={(e) => handleAbilityChange(index, e)} placeholder='Ability description' required />
              {formData.abilities.length > 1 && (
                  <button type="button" onClick={() => handleRemoveAbility(index)} className='btn-delete'>Delete</button>
              )}
              
            </div>
          ))}
          <button type="button" onClick={handleAddAbility} className='btn-add'>Add ability +</button>
          <button type="submit">Send edit</button>
        </form>
      </div>
    </div>
  );
};

EditPokemon.propTypes = {
  pokemon: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditPokemon;