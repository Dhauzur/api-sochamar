//actions: actualizo,elimino,obtuvo, registro
//pluralization: un,todos los
//model: el modelo que estamos usando en esa funcion
//filter: sirve para especificar que se realizo una accion con un filtro o variable adicional
// ej: test@test.cl obtuvo todos los lodging con placeId
// con 'variable'
export const infoMessages = (email, action, pluralization, model, filter) => {
	if (filter) {
		return `${email} ${action} ${pluralization} ${model} ${filter}`;
	} else {
		return `${email} ${action} ${pluralization} ${model}`;
	}
};
//action: acción especifica, ej: test@test.cl actualizo su avatar, test@test.cl recupero su contraseña, test@test.cl solicito un cambio de contraseña
export const actionInfo = (email, action) => `${email} ${action}`;
