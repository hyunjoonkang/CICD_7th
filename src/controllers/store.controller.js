import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import {
  storeMission,
  listStoreReviews,
  listStoreMissions,
} from "../services/store.service.js";

export const handleStoreMission = async (req, res, next) => {
  /*
  #swagger.summary = '가게 미션 등록 API';
  #swagger.description = '특정 가게에 미션을 추가하는 API입니다.';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            store_id: { type: "number", description: "미션을 추가할 가게의 ID" },
            description: { type: "string", description: "미션 설명" },
            reward: { type: "string", description: "미션 완료 시 보상" }
          },
          required: ["store_id", "description", "reward"]
        },
        example: {
          store_id: 1,
          description: "10번 방문 시 무료 음료 제공",
          reward: "무료 음료"
        }
      }
    }
  };

  #swagger.responses[200] = {
    description: "미션 등록 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                mission_id: { type: "number", description: "생성된 미션의 ID" },
                store_id: { type: "number", description: "미션이 등록된 가게의 ID" },
                description: { type: "string", description: "미션 설명" },
                reward: { type: "string", description: "미션 보상" },
                createdAt: { type: "string", format: "date-time", description: "미션 생성 날짜" }
              }
            }
          }
        },
        example: {
          resultType: "SUCCESS",
          error: null,
          success: {
            mission_id: 1,
            store_id: 1,
            description: "10번 방문 시 무료 음료 제공",
            reward: "무료 음료",
            createdAt: "2023-11-09T12:34:56Z"
          }
        }
      }
    }
  };

  #swagger.responses[404] = {
    description: "미션 등록 실패 응답 - 가게가 존재하지 않는 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "S001" },
                reason: { type: "string", description: "오류 발생 이유" },
                data: { type: "object", nullable: true, description: "오류 관련 추가 데이터" }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        },
        example: {
          resultType: "FAIL",
          error: {
            errorCode: "S001",
            reason: "존재하지 않는 가게입니다.",
            data: { store_id: 999 }
          },
          success: null
        }
      }
    }
  };

  #swagger.responses[400] = {
    description: "미션 등록 실패 응답 - 잘못된 요청 데이터",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "R002" },
                reason: { type: "string", description: "잘못된 요청 데이터" },
                data: { type: "object", nullable: true }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        },
        example: {
          resultType: "FAIL",
          error: {
            errorCode: "R002",
            reason: "요청 데이터가 유효하지 않습니다.",
            data: { description: "필수 데이터 누락" }
          },
          success: null
        }
      }
    }
  };
*/
  console.log("가게 미션 등록을 요청했습니다!");
  console.log("body:", req.body);

  const mission = await storeMission(bodyToStore(req.body));
  res.status(StatusCodes.OK).success({ result: mission });
};

export const handleListStoreReviews = async (req, res, next) => {
  /*
  #swagger.summary = '상점 리뷰 목록 조회 API';
  #swagger.description = '특정 상점의 리뷰 목록을 조회하는 API입니다.';
  
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '리뷰를 조회할 상점의 ID'
  }

  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'integer',
    description: '페이징을 위한 커서 값 (리뷰 ID)'
  }

  #swagger.responses[200] = {
    description: "상점 리뷰 목록 조회 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number", description: "리뷰 ID" },
                      store: {
                        type: "object",
                        properties: {
                          id: { type: "number", description: "상점 ID" },
                          name: { type: "string", description: "상점 이름" }
                        }
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "number", description: "유저 ID" },
                          email: { type: "string", description: "유저 이메일" },
                          name: { type: "string", description: "유저 이름" }
                        }
                      },
                      content: { type: "string", description: "리뷰 내용" }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", nullable: true, description: "다음 페이지의 커서 값" }
                  }
                }
              }
            }
          }
        },
        example: {
          resultType: "SUCCESS",
          error: null,
          success: {
            data: [
              {
                id: 1,
                store: { id: 1, name: "상점 A" },
                user: { id: 10, email: "user1@example.com", name: "유저1" },
                content: "좋은 품질의 제품!"
              },
              {
                id: 2,
                store: { id: 1, name: "상점 A" },
                user: { id: 11, email: "user2@example.com", name: "유저2" },
                content: "서비스가 훌륭합니다!"
              }
            ],
            pagination: {
              cursor: 2
            }
          }
        }
      }
    }
  };

  #swagger.responses[404] = {
    description: "상점 조회 실패 응답 - 가게가 존재하지 않는 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "S001" },
                reason: { type: "string", description: "오류 발생 이유" },
                data: { type: "object", nullable: true, description: "오류 관련 추가 데이터" }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        },
        example: {
          resultType: "FAIL",
          error: {
            errorCode: "S001",
            reason: "해당 가게가 존재하지 않습니다.",
            data: { storeId: 999 }
          },
          success: null
        }
      }
    }
  };
*/
  console.log("가게 리뷰 리스트를 요청했습니다!");
  console.log("body:", req.body);

  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleListStoreMissions = async (req, res, next) => {
  /*
  #swagger.summary = '가게 미션 목록 조회 API';
  #swagger.description = '특정 가게에 등록된 미션 목록을 조회하는 API입니다.';
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '미션을 조회할 가게의 ID'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'integer',
    description: '페이징을 위한 커서 값 (미션 ID)'
  }
  #swagger.responses[200] = {
    description: "가게 미션 목록 조회 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number", description: "미션 ID" },
                      storeId: { type: "number", description: "가게 ID" },
                      description: { type: "string", description: "미션 설명" },
                      reward: { type: "string", description: "미션 보상" }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", nullable: true, description: "다음 페이지의 커서 값" }
                  }
                }
              }
            }
          }
        },
        example: {
          resultType: "SUCCESS",
          error: null,
          success: {
            data: [
              {
                id: 1,
                storeId: 1,
                description: "10번 방문 시 무료 음료 제공",
                reward: "무료 음료"
              },
              {
                id: 2,
                storeId: 1,
                description: "15번 방문 시 50% 할인 쿠폰",
                reward: "50% 할인 쿠폰"
              }
            ],
            pagination: {
              cursor: 2
            }
          }
        }
      }
    }
  };

  #swagger.responses[404] = {
    description: "미션 조회 실패 응답 - 가게가 존재하지 않는 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "S001" },
                reason: { type: "string", description: "오류 발생 이유" },
                data: { type: "object", nullable: true, description: "오류 관련 추가 데이터" }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        },
        example: {
          resultType: "FAIL",
          error: {
            errorCode: "S001",
            reason: "해당 가게가 존재하지 않습니다.",
            data: { storeId: 999 }
          },
          success: null
        }
      }
    }
  };
*/
  console.log("가게 미션 리스트를 요청했습니다!");
  console.log("body:", req.body);

  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};
