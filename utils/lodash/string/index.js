import _startCase from 'lodash/startCase';
import _toLower from 'lodash/toLower';

export const getCapitalizedString = (string) => _startCase(_toLower(string));
