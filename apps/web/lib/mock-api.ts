import mockDb from "@/apps/web/data/mock-db.json";

export async function loginUser(email: string, password: string) {
  // Add delay to simulate network request
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockDb.users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Remove password from user object before returning
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  // Add delay to simulate network request
  await new Promise((resolve) => setTimeout(resolve, 500));

  const existingUser = mockDb.users.find(
    (u) => u.email.toLowerCase() === data.email.toLowerCase()
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  // In a real app, we would save this to the database
  return {
    id: String(mockDb.users.length + 1),
    email: data.email,
    name: data.name,
    role: "GUEST" as const,
  };
}
