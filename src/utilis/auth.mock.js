const users = [
  {
    id: 1,
    name: "Radhe",
    email: "radhe@gmail.com",
    password: "pass@123",
    role: "admin",
    status: "Active",
  },
  {
    id: 2,
    name: "max",
    email: "max@gmail.com",
    password: "user@123",
    role: "user",
    status: "Active",
  },
];

export const mockLogin = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.email === data.email && u.password === data.password,
      );

      if (!user) {
        reject(new Error("Invalid email or password"));
      } else {
        const { password, ...safeUser } = user;
        resolve(safeUser);
      }
    }, 1000);
  });
};
