import { useState, useCallback } from 'react';
import PropTypes from 'prop-types'; 
import { addPokemon } from '../services/pokemonServices';

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

  const handleAbilityChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const newAbilities = [...prevForm.abilities];
      newAbilities[index][name] = value;
      return { ...prevForm, abilities: newAbilities };
    });
  }, []);

  const addAbility = useCallback(() => {
    setForm((prevForm) => ({
      ...prevForm,
      abilities: [...prevForm.abilities, { name: '', description: '' }],
    }));
  }, []);

  const removeAbility = useCallback((index) => {
    setForm((prevForm) => ({
      ...prevForm,
      abilities: prevForm.abilities.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, level, evolutionId, type, urlImagen, abilities } = form;

    if (!name || !level || !evolutionId || !type || !userId || !urlImagen || !abilities.length) {
      alert('Por favor, complete todos los campos.');
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
      window.location.reload();
    } catch (error) {
      alert('Hubo un error al intentar agregar el Pokémon. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Level:</label>
            <input
              type="number"
              name="level"
              value={form.level}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
          <div>
            <label>Evolution:</label>
            <input
              type="number"
              name="evolutionId"
              value={form.evolutionId}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
          <div>
            <label>Type:</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>URL Imagen:</label>
            <input
              type="text"
              name="urlImagen"
              value={form.urlImagen}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <h3>Habilidades:</h3>
            {form.abilities.map((ability, index) => (
              <div key={index}>
                <label>Nombre de Habilidad:</label>
                <input
                  type="text"
                  name="name"
                  value={ability.name}
                  onChange={(e) => handleAbilityChange(index, e)}
                  required
                />
                <label>Descripción de Habilidad:</label>
                <input
                  type="text"
                  name="description"
                  value={ability.description}
                  onChange={(e) => handleAbilityChange(index, e)}
                  required
                />
                {form.abilities.length > 1 && (
                  <button type="button" onClick={() => removeAbility(index)}>Eliminar</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addAbility}>Añadir Habilidad</button>
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