export const getTranslationValues = (val) => {
	return val.replace('translate(', '').replace(')', '').split(',');
}
