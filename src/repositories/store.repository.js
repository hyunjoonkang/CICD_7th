import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const findStoreById = async (storeId) => {
  return await prisma.store.findUnique({
    where: { id: storeId },
  });
};

export const addMission = async (data) => {
  const storeExists = await prisma.store.findUnique({
    where: { id: data.store_id },
  });

  if (!storeExists) return null;

  const createdMission = await prisma.mission.create({
    data: {
      storeId: data.store_id,
      description: data.description,
      reward: data.reward,
    },
  });

  return createdMission.id;
};

export const getMission = async (missionId) => {
  const mission = await prisma.mission.findFirstOrThrow({
    where: { id: missionId },
  });
  return mission;
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      rating: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const getAllStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      storeId: true,
      description: true,
      reward: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};

// export const addMission = async (data) => {
//   const conn = await pool.getConnection();

//   try {
//     const [confirm] = await pool.query(
//       `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
//       [data.store_id]
//     );

//     if (!confirm[0].isExistStore) return null;

//     const [result] = await pool.query(
//       `INSERT INTO mission (store_id, description, reward) VALUES (?, ?, ?);`,
//       [data.store_id, data.description, data.reward]
//     );

//     return result.insertId;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };

// export const getMission = async (missionId) => {
//   const conn = await pool.getConnection();

//   try {
//     const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, [
//       missionId,
//     ]);

//     if (mission.length == 0) return null;

//     return mission[0];
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };
