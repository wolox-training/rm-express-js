exports.mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'John.Doe@wolox.co',
  password: 'A123456a'
};

exports.mockUserAlt = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'Jane.Doe@wolox.co',
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

exports.mockUserNotMatchPass = {
  ...this.mockUser,
  password: 'A123456b'
};

exports.mockUserChangeEmail = {
  ...this.mockUser,
  email: 'email@wolox.co'
};

exports.mockUserInvalidEmail = {
  ...this.mockUser,
  email: 'email@domain.co'
};

exports.mockUserVerified = {
  id: 1,
  email: 'email@wolox.co',
  isAdmin: true
};

exports.mockUserDeveloper = {
  ...this.mockUserAlt,
  points: 4,
  position: 'Developer'
};
