import {
  responseFromStore,
  responseFromReviews,
  responseFromMissions,
} from "../dtos/store.dto.js";
import {
  addMission,
  getMission,
  getAllStoreReviews,
  getAllStoreMissions,
  findStoreById,
} from "../repositories/store.repository.js";
import { StoreNotFoundError } from "../errors.js";

export const storeMission = async (data) => {
  // 리뷰 작성 시 필요한 데이터
  const joinMissionId = await addMission({
    store_id: data.store_id,
    description: data.description,
    reward: data.reward,
  });

  if (joinMissionId === null) {
    throw new StoreNotFoundError("존재하지 않는 가게입니다.");
  }

  // 리뷰가 성공적으로 추가된 경우, 해당 리뷰 조회
  const mission = await getMission(joinMissionId);

  // 리뷰가 조회되지 않는 경우 처리
  if (!mission) {
    throw new Error("생성된 리뷰를 찾을 수 없습니다.");
  }

  return responseFromStore({ mission });
};

export const listStoreReviews = async (storeId, cursor) => {
  // 가게 존재 여부 확인
  const store = await findStoreById(storeId);
  if (!store) {
    throw new StoreNotFoundError("해당 가게가 존재하지 않습니다.", { storeId });
  }

  // 가게가 존재할 경우 리뷰 목록 가져오기
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (storeId, cursor) => {
  const store = await findStoreById(storeId);
  if (!store) {
    throw new StoreNotFoundError("해당 가게가 존재하지 않습니다.", { storeId });
  }

  const missions = await getAllStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};
