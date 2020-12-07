import i18next from 'i18next';

export const FORM_FIELDS = {
  email: 'email',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation',
  firstName: 'firstName',
  lastName: 'lastName'
};

export const ERROR_MESSAGES = {
  requireMessage: i18next.t('SignUp:requiredField'),
  passwordDontMatch: i18next.t('SignUp:passwordsDontMatch')
};
