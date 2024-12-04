import prisma from "../prismaClient.js";

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
