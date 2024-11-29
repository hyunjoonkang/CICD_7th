export const userBodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

// export const userResponseFromUser = ({ user, preferences }) => {
//   return {
//     email: user.email,
//     name: user.name,
//     preferCategory: preferences.map((pref) => pref.name), // Use the category name directly from preferences
//   };
// };

export const userResponseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};

// review.dto.js
export const reviewBodyToUser = (data) => {
  return {
    store_id: data.store_id,
    user_id: data.user_id,
    content: data.content,
    rating: data.rating,
  };
};

// user.dto.js

export const reviewResponseFromUser = ({ review }) => {
  if (!review) {
    throw new Error("리뷰 데이터를 찾을 수 없습니다.");
  }

  return {
    store_id: review.store_id,
    user_id: review.user_id,
    content: review.content,
    rating: review.rating,
  };
};

export const missionChallengeBodyToUser = (body) => {
  console.log("missionChallengeBodyToUser input:", body);
  return {
    mission_id: body.mission_id,
    user_id: body.user_id,
    status: body.status,
  };
};

export const responseFromCompletedMission = (completedMission) => {
  return {
    mission_id: completedMission.missionId,
    user_id: completedMission.userId,
    status: completedMission.status,
  };
};

export const missionChallengeResponseFromUser = ({ missionChallenge }) => {
  if (!missionChallenge) {
    throw new Error("미션 도전 데이터를 찾을 수 없습니다.");
  }

  return {
    mission_id: missionChallenge.missionId,
    user_id: missionChallenge.userId,
    status: missionChallenge.status,
  };
};

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

export const responseFromUpdatedUser = (updatedUser) => {
  return {
    data: updatedUser,
  };
};
