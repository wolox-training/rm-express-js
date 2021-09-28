exports.mockUser = {
  firstName: 'john',
  lastName: 'doe',
  email: 'john.doe@wolox.co',
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
