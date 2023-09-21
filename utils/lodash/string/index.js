import { startCase as _startCase, toLower as _toLower } from 'lodash';

export const getCapitalizedString = (string) => _startCase(_toLower(string));
