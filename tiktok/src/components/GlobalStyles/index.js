import PropTypes from 'prop-types';
import React from 'react';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
  return children;
}

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
