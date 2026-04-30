// Mock function for demo purposes if no user is found
// This file is safe to import in client components as it has no Prisma dependency.

export function getMockUser(role: "LANDLORD" | "TENANT") {
  if (role === "LANDLORD") {
    return {
      id: "l-1",
      name: "Tim Anderson",
      email: "[EMAIL_ADDRESS]",
      role: "LANDLORD",
      avatar: "https://i.pravatar.cc/150?img=11",
      company: "Anderson Properties"
    };
  }
  return {
    id: "t-1",
    name: "Francis Okonkwo",
    email: "[EMAIL_ADDRESS]",
    role: "TENANT",
    avatar: "https://i.pravatar.cc/150?img=32",
    score: 840
  };
}
