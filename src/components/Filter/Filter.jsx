import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css'

const Filter = ({ filter, onChange }) => (
  <label className={css.filter}>
    Find contacts by name
    <input className={css.filter__input} type="text" value={filter} onChange={onChange}></input>
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
