import PropTypes from 'prop-types';
import { Media } from './Media';

export const User = {
	_id: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	account_verified: PropTypes.bool.isRequired,
	verification_code: PropTypes.string.isRequired,
	mobile: PropTypes.string.isRequired,
	first_name: PropTypes.string.isRequired,
	last_name: PropTypes.string.isRequired,
	gender: PropTypes.string.isRequired,
	dob: PropTypes.string.isRequired,
	avatar: PropTypes.shape(Media),
	account_type: PropTypes.number.isRequired,
	social_auth: PropTypes.bool.isRequired,
	social_auth_type: PropTypes.string.isRequired,
	social_id: PropTypes.string.isRequired,
	password_reset: PropTypes.bool.isRequired,
	password_reset_code: PropTypes.string.isRequired,
	reset_code_expiration: PropTypes.string.isRequired,
	verify_code_expiration: PropTypes.string.isRequired,
	change_password: PropTypes.bool.isRequired,
	is_admin: PropTypes.bool.isRequired,
	logo: PropTypes.shape(Media),
	banner: PropTypes.shape(Media),
	deleted: PropTypes.bool,
	createdAt: PropTypes.string.isRequired,
	updatedAt: PropTypes.string.isRequired,
};
