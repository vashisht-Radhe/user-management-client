export const fakeActivities = [
  {
    id: 1,
    actor: "admin@site.com",
    action: "UPDATE_ROLE",
    target: "john@site.com",
    status: "SUCCESS",
    createdAt: "2026-02-12T09:20:00Z",
  },
  {
    id: 2,
    actor: "admin@site.com",
    action: "DEACTIVATE_USER",
    target: "jane@site.com",
    status: "SUCCESS",
    createdAt: "2026-02-12T08:45:00Z",
  },
  {
    id: 3,
    actor: "System",
    action: "USER_REGISTER",
    target: "newuser@mail.com",
    status: "SUCCESS",
    createdAt: "2026-02-11T22:10:00Z",
  },
  {
    id: 4,
    actor: "admin@site.com",
    action: "DELETE_USER",
    target: "spam@mail.com",
    status: "FAILED",
    createdAt: "2026-02-11T21:40:00Z",
  },
];
