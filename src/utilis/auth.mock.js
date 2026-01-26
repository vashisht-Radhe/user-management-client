export const mockLogin = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email !== "radhe@gmail.com" || data.password !== "pass@123") {
        reject(new Error("Invalid email or password"));
      } else {
        resolve({
          id: 1,
          name: "Demo User",
          email: data.email,
          role: "user",
        });
      }
    }, 1000);
  });
};
