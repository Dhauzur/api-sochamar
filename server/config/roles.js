import AccessControl from 'accesscontrol';
const accessControl = new AccessControl();

const roles = () => {
	accessControl
		.grant('person')

		.readOwn('profile')
		.updateOwn('profile')

		.createOwn('person')
		.readOwn('person')
		.updateOwn('person');

	accessControl
		.grant('admin')
		.extend('person')

		.readAny('profile')
		.deleteAny('profile')

		.readAny('lodging')
		.createAny('lodging')
		.deleteAny('lodging')
		.updateAny('lodging')

		.readAny('person')
		.createAny('person')
		.deleteAny('person')
		.updateAny('person');
	return accessControl;
};

export default roles();
