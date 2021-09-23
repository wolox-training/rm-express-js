exports.mockUser = {
  firstName: 'ricardo',
  lastName: 'moreno',
  email: 'ricardo.a.moreno@wolox.co',
  password: 'A123456a'
};

exports.mockUserInvalidPass = {
  ...this.mockUser,
  password: '123456'
};

exports.mockUserMissingFirstName = {
  ...this.mockUser,
  firstName: undefined
};

exports.mockUserMissingLastName = {
  ...this.mockUser,
  lastName: undefined
};

exports.mockUserMissingEmail = {
  ...this.mockUser,
  email: undefined
};

exports.mockUserMissingPassword = {
  ...this.mockUser,
  password: undefined
};
