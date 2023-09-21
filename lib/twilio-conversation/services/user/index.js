export const updateUserFriendlyName = async (user, username) =>
  await user?.updateFriendlyName(username);
