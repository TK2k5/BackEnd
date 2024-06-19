import { handleHashPassword } from '../utils/hash-password.util.js';

export const changePasswordController = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.user;

  // hash password
  // promise
  // Tạo các promise cho mỗi hàm hash
  const oldPasswordPromise = handleHashPassword({ password: oldPassword });
  const newPasswordPromise = handleHashPassword({ password: newPassword });
  const confirmPasswordPromise = handleHashPassword({ password: confirmPassword });

  // Chạy tất cả các promise song song và đợi cho tất cả hoàn thành
  const [oldPasswordHashed, newPasswordHashed, confirmPasswordHashed] = await Promise.all([
    oldPasswordPromise,
    newPasswordPromise,
    confirmPasswordPromise,
  ]);

  console.log(oldPasswordHashed, newPasswordHashed, confirmPasswordHashed);
};
