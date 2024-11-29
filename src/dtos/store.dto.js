export const bodyToStore = (data) => {
  return {
    store_id: data.store_id,
    description: data.description,
    reward: data.reward,
  };
};

export const responseFromStore = ({ mission }) => {
  return {
    store_id: mission.store_id,
    description: mission.description,
    reward: mission.reward,
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

export const responseFromMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
