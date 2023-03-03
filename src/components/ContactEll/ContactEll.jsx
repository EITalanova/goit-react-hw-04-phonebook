import css from './ContactEll.module.css';
import PropTypes from 'prop-types';
import React from 'react';

const ContactEll = ({ contacts, deleteContact }) => {
  return (
    <>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={css.item} key={id}>
            {name}: {number}
            <button className={css.btn} onClick={() => deleteContact(id)}>
              x
            </button>
          </li>
        );
      })}
    </>
  );
};

ContactEll.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactEll;
