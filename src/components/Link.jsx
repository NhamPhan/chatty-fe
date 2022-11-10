import React from 'react';
import { Link as UILink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Link component
 *
 * @param {import('react-router-dom').Link} props
 * @returns {JSX.Element}
 */
const Link = (props) => {
	return <UILink component={RouterLink} variant="body2" {...props} />;
};

export default Link;
