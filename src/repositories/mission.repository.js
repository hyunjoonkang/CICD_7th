import { prisma } from "../db.config.js";

export const findMissionById = async (missionId) => {
  return await prisma.mission.findUnique({
    where: { id: missionId },
  });
};

export const findMissionChallengeById = async (userId, missionId) => {
  return await prisma.missionChallenge.findFirst({
    where: {
      userId: parseInt(userId),
      missionId: parseInt(missionId),
      status: "in_progress",
    },
  });
};
