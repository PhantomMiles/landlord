// Mock function for demo purposes if no user is found
// This file is safe to import in client components as it has no Prisma dependency.

export function getMockUser(role: "LANDLORD" | "TENANT") {
  if (role === "LANDLORD") {
    return {
      id: "l-1",
      name: "Tim Anderson",
      email: "tim.a@anderson.com",
      role: "LANDLORD",
      avatar: "https://i.pravatar.cc/150?img=11",
      company: "Anderson Properties"
    };
  }
  return {
    id: "t-1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "TENANT",
    avatar: "https://i.pravatar.cc/150?img=32",
    score: 840
  };
}
