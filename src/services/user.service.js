import {
  userResponseFromUser,
  reviewResponseFromUser,
  missionChallengeResponseFromUser,
  responseFromReviews,
  responseFromCompletedMission,
  responseFromUpdatedUser,
} from "../dtos/user.dto.js";
import {
  DuplicateUserEmailError,
  StoreNotFoundError,
  ReviewNotFoundError,
  MissionNotFoundError,
  InProgressMissionError,
  UserNotFoundError,
} from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updateUserInfo,
} from "../repositories/user.repository.js";
import {
  addReview,
  getReview,
  getAllUserReviews,
} from "../repositories/user.repository.js";
import {
  addMissionChallenge,
  getMissionChallenge,
  completeMissionChallenge,
  findUserById,
} from "../repositories/user.repository.js";

import {
  findMissionById,
  findMissionChallengeById,
} from "../repositories/mission.repository.js"; // 추가된 import

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return userResponseFromUser({ user, preferences });
};

export const userReview = async (data) => {
  // 리뷰 작성 시 필요한 데이터
  const joinReviewId = await addReview({
    store_id: data.store_id,
    user_id: data.user_id,
    content: data.content,
    rating: data.rating,
  });

  if (joinReviewId === null) {
    throw new StoreNotFoundError("존재하지 않는 가게입니다.", data);
  }

  // 리뷰가 성공적으로 추가된 경우, 해당 리뷰 조회
  const review = await getReview(joinReviewId);

  // 리뷰가 조회되지 않는 경우 처리
  if (!review) {
    throw new ReviewNotFoundError("작성한 리뷰를 찾을 수 없습니다.", {
      reviewId: joinReviewId,
    });
  }

  return reviewResponseFromUser({ review });
};

export const userMissionChallenge = async (data) => {
  // 미션 존재 여부 확인
  const mission = await findMissionById(data.mission_id);
  if (!mission) {
    throw new MissionNotFoundError("해당 미션이 존재하지 않습니다.", {
      mission_id: data.mission_id,
    });
  }

  // 추가된 미션 도전 조회
  try {
    // 미션 도전 데이터 추가
    const joinMissionChallengeId = await addMissionChallenge({
      mission_id: data.mission_id,
      user_id: data.user_id,
      status: data.status,
    });

    // 추가된 미션 도전 조회
    const missionChallenge = await getMissionChallenge(joinMissionChallengeId);

    if (!missionChallenge) {
      throw new Error("등록한 미션 도전을 찾을 수 없습니다.");
    }

    return missionChallengeResponseFromUser({ missionChallenge });
  } catch (error) {
    if (error instanceof InProgressMissionError) {
      throw error; // 이미 도전 중인 미션일 경우 InProgressMissionError를 그대로 던짐
    } else {
      throw new Error("미션 도전 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export const listUserReviews = async (userId, cursor) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UserNotFoundError("해당 유저가 존재하지 않습니다.", { userId });
  }
  const reviews = await getAllUserReviews(userId, cursor);
  return responseFromReviews(reviews);
};

export const userMissionComplete = async (userId, missionId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UserNotFoundError("해당 유저가 존재하지 않습니다.", { userId });
  }

  const missionChallenge = await findMissionChallengeById(userId, missionId);
  if (!missionChallenge) {
    throw new MissionNotFoundError("도전 중인 미션이 아닙니다.", {
      userId,
      missionId,
    });
  }

  const completedMission = await completeMissionChallenge(userId, missionId);

  if (!completedMission) {
    throw new Error("해당 유저의 진행 중인 미션을 찾을 수 없습니다.");
  }

  return responseFromCompletedMission(completedMission);
};

export const updateUser = async (userId, updatedData) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UserNotFoundError("해당 유저가 존재하지 않습니다.", { userId });
  }

  const updatedUser = await updateUserInfo(userId, updatedData);

  return responseFromUpdatedUser(updatedUser);
};
