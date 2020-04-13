export const infoMessages = (email, action, pluralization, model, filter) => {
	if (filter) {
		return `${email} ${action} ${pluralization} ${model} ${filter}`;
	} else {
		return `${email} ${action} ${pluralization} ${model}`;
	}
};

export const actionInfo = (email, action) => `${email} ${action}`;
