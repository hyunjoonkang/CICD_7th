import { prisma } from "../db.config.js";
import { InProgressMissionError } from "../errors.js";

export const findUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
};

export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) return null;

  const createdUser = await prisma.user.create({ data: data });
  return createdUser.id;
};

export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

export const addReview = async (data) => {
  // 가게 존재 여부 확인
  const storeExists = await prisma.store.findUnique({
    where: { id: data.store_id }, // storeId 대신 id 사용
  });

  if (!storeExists) return null;

  // 리뷰 생성
  const createdReview = await prisma.review.create({
    data: {
      storeId: data.store_id,
      userId: data.user_id,
      content: data.content,
      rating: data.rating,
    },
  });

  return createdReview.id;
};

export const getReview = async (reviewId) => {
  const review = await prisma.review.findFirstOrThrow({
    where: { id: reviewId },
  });
  return review;
};

export const addMissionChallenge = async (data) => {
  const existingChallenge = await prisma.missionChallenge.findFirst({
    where: {
      missionId: data.mission_id,
      userId: data.user_id,
      status: "in_progress",
    },
  });

  if (existingChallenge) {
    throw new InProgressMissionError("이미 도전 중인 미션입니다.", data);
  }

  const createdChallenge = await prisma.missionChallenge.create({
    data: {
      missionId: data.mission_id,
      userId: data.user_id,
      status: data.status,
    },
  });

  return createdChallenge.id;
};

export const getMissionChallenge = async (missionChallengeId) => {
  const missionChallenge = await prisma.missionChallenge.findFirstOrThrow({
    where: { id: missionChallengeId },
  });
  return missionChallenge;
};

export const completeMissionChallenge = async (userId, missionId) => {
  const missionChallenge = await prisma.missionChallenge.findFirst({
    where: {
      userId: parseInt(userId),
      missionId: parseInt(missionId),
      status: "in_progress",
    },
  });

  if (!missionChallenge) return null;

  const updatedMissionChallege = await prisma.missionChallenge.update({
    where: { id: missionChallenge.id },
    data: {
      status: "completed",
      completedAt: new Date(),
    },
  });

  return updatedMissionChallege;
};

export const getAllUserReviews = async (userId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      rating: true,
      storeId: true,
      userId: true,
      store: false,
      user: false,
    },
    where: { userId: userId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const updateUserInfo = async (userId, updatedData) => {
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: updatedData,
  });

  return updatedUser;
};

// export const addReview = async (data) => {
//   const conn = await pool.getConnection();

//   try {
//     const [confirm] = await pool.query(
//       `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
//       [data.store_id]
//     );

//     if (!confirm[0].isExistStore) return null;

//     const [result] = await pool.query(
//       `INSERT INTO review (store_id, user_id, content, rating) VALUES (?, ?, ?, ?);`,
//       [data.store_id, data.user_id, data.content, data.rating]
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

// export const getReview = async (reviewId) => {
//   const conn = await pool.getConnection();

//   try {
//     const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, [
//       reviewId,
//     ]);

//     if (review.length == 0) return null;

//     return review[0];
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };

// User 데이터 삽입

// export const addUser = async (data) => {
//   const conn = await pool.getConnection();

//   try {
//     const [confirm] = await pool.query(
//       `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
//       data.email
//     );

//     if (confirm[0].isExistEmail) {
//       return null;
//     }

//     const [result] = await pool.query(
//       `INSERT INTO user (email, name, gender, birth, address, detail_address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?);`,
//       [
//         data.email,
//         data.name,
//         data.gender,
//         data.birth,
//         data.address,
//         data.detailAddress,
//         data.phoneNumber,
//       ]
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

// 사용자 정보 얻기
// export const getUser = async (userId) => {
//   const conn = await pool.getConnection();

//   try {
//     const [user] = await pool.query(`SELECT * FROM user WHERE id = ?;`, userId);

//     console.log(user);

//     if (user.length == 0) {
//       return null;
//     }

//     return user[0];
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };

// 음식 선호 카테고리 매핑
// export const setPreference = async (userId, foodCategoryId) => {
//   const conn = await pool.getConnection();

//   try {
//     await pool.query(
//       `INSERT INTO user_favor_category (food_category_id, user_id) VALUES (?, ?);`,
//       [foodCategoryId, userId]
//     );

//     return;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };

// 사용자 선호 카테고리 반환
// export const getUserPreferencesByUserId = async (userId) => {
//   const conn = await pool.getConnection();

//   try {
//     const [preferences] = await pool.query(
//       "SELECT ufc.id, ufc.food_category_id, ufc.user_id, fcl.name " +
//         "FROM user_favor_category ufc JOIN food_category fcl on ufc.food_category_id = fcl.id " +
//         "WHERE ufc.user_id = ? ORDER BY ufc.food_category_id ASC;",
//       userId
//     );

//     return preferences;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };

// export const addMissionChallenge = async (data) => {
//   const conn = await pool.getConnection();

//   try {
//     // 사용자가 이미 도전 중인 미션인지 확인
//     const [confirm] = await conn.query(
//       `SELECT EXISTS(
//             SELECT 1 FROM mission_challenge
//             WHERE mission_id = ? AND user_id = ? AND status = 'in_progress'
//           ) AS isAlreadyInProgress;`,
//       [data.mission_id, data.user_id]
//     );

//     if (confirm[0].isAlreadyInProgress) {
//       throw new Error("이미 도전 중인 미션입니다.");
//     }

//     // 도전 중인 미션이 아니라면 새로운 도전 기록 추가
//     const [result] = await conn.query(
//       `INSERT INTO mission_challenge (mission_id, user_id, status) VALUES (?, ?, ?);`,
//       [data.mission_id, data.user_id, data.status]
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

// export const getMissionChallenge = async (missionChallengeId) => {
//   const conn = await pool.getConnection();

//   try {
//     const [missionChallenge] = await pool.query(
//       `SELECT * FROM mission_challenge WHERE id = ?;`,
//       [missionChallengeId]
//     );

//     if (missionChallenge.length == 0) return null;

//     return missionChallenge[0];
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };
