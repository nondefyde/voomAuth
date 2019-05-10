export const arrayToById = (array) => {
	return array.reduce((accumulator, currentObject) => {
		const {_id} = currentObject;
		accumulator[_id] = currentObject;
		return accumulator;
	}, {});
};
export const byIdToByCreatedAt = (object) => {
	// @ts-ignore
	return Object.values(object).sort((prev, curr) => new Date(curr.createdAt) - new Date(prev.createdAt));
};
