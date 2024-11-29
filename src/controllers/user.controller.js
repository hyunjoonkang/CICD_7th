import { StatusCodes } from "http-status-codes";
import {
  userBodyToUser,
  reviewBodyToUser,
  missionChallengeBodyToUser,
} from "../dtos/user.dto.js";
import {
  userSignUp,
  userReview,
  userMissionChallenge,
  listUserReviews,
  userMissionComplete,
  updateUser,
} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(userBodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};

export const handleUserReview = async (req, res, next) => {
  /*
  #swagger.summary = '리뷰 작성 API';
  #swagger.description = '사용자가 특정 가게에 대해 리뷰를 작성하는 API입니다.';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            store_id: { type: "number", description: "리뷰를 작성할 가게의 ID" },
            user_id: { type: "number", description: "리뷰를 작성하는 사용자의 ID" },
            content: { type: "string", description: "리뷰 내용" },
            rating: { type: "number", description: "리뷰 평점", minimum: 1, maximum: 5 }
          },
          required: ["store_id", "user_id", "content", "rating"]
        },
        example: {
          store_id: 1,
          user_id: 1,
          content: "훌륭한 서비스와 맛있는 음식!",
          rating: 5
        }
      }
    }
  };

  #swagger.responses[200] = {
    description: "리뷰 작성 성공 응답",
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
                review_id: { type: "number", description: "작성된 리뷰의 ID" },
                store_id: { type: "number", description: "리뷰가 작성된 가게의 ID" },
                user_id: { type: "number", description: "리뷰를 작성한 사용자의 ID" },
                content: { type: "string", description: "리뷰 내용" },
                rating: { type: "number", description: "리뷰 평점", example: 5 },
                createdAt: { type: "string", format: "date-time", description: "리뷰 작성 날짜" }
              }
            }
          }
        },
        example: {
          resultType: "SUCCESS",
          error: null,
          success: {
            review_id: 1,
            store_id: 1,
            user_id: 1,
            content: "훌륭한 서비스와 맛있는 음식!",
            rating: 5,
            createdAt: "2023-11-09T12:34:56Z"
          }
        }
      }
    }
  };

  #swagger.responses[400] = {
    description: "리뷰 작성 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "R001" },
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
            errorCode: "R001",
            reason: "가게가 존재하지 않습니다.",
            data: { store_id: 999 }
          },
          success: null
        }
      }
    }
  };
*/
  console.log("리뷰 작성을 요청했습니다!");
  console.log("body:", req.body);

  const user = await userReview(reviewBodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};

export const handleUserMissionChallenge = async (req, res, next) => {
  /*
  #swagger.summary = '미션 도전 등록 API';
  #swagger.description = '사용자가 특정 미션에 도전하는 API입니다.';

  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            mission_id: { type: "number", description: "도전할 미션의 ID" },
            user_id: { type: "number", description: "미션에 도전하는 사용자의 ID" },
            status: { type: "string", description: "미션 도전 상태", example: "in_progress" }
          },
          required: ["mission_id", "user_id", "status"]
        },
        example: {
          mission_id: 1,
          user_id: 3,
          status: "in_progress"
        }
      }
    }
  }

  #swagger.responses[200] = {
    description: "미션 도전 등록 성공 응답",
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
                mission_id: { type: "number", description: "도전한 미션의 ID" },
                user_id: { type: "number", description: "미션에 도전한 사용자의 ID" },
                status: { type: "string", description: "미션 도전 상태", example: "in_progress" },
                createdAt: { type: "string", format: "date-time", description: "도전 등록 시간" }
              }
            }
          }
        },
        example: {
          resultType: "SUCCESS",
          error: null,
          success: {
            mission_id: 1,
            user_id: 3,
            status: "in_progress",
            createdAt: "2023-11-09T12:34:56Z"
          }
        }
      }
    }
  };

  #swagger.responses[404] = {
    description: "미션 도전 실패 응답 - 미션이 존재하지 않는 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M001" },
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
            errorCode: "M001",
            reason: "해당 미션이 존재하지 않습니다.",
            data: { mission_id: 999 }
          },
          success: null
        }
      }
    }
  };

  #swagger.responses[409] = {
    description: "미션 도전 실패 응답 - 이미 진행 중인 미션이 있는 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M002" },
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
            errorCode: "M002",
            reason: "이미 도전 중인 미션입니다.",
            data: { mission_id: 1, user_id: 3 }
          },
          success: null
        }
      }
    }
  };
*/
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body);

  const user = await userMissionChallenge(missionChallengeBodyToUser(req.body));
  // res.status(StatusCodes.OK).json({ result: user });
  res.status(StatusCodes.OK).success(user);
};

export const handleListUserReviews = async (req, res, next) => {
  /*
  #swagger.summary = '유저 리뷰 목록 조회 API';
  #swagger.description = '특정 유저가 작성한 리뷰 목록을 조회하는 API입니다.';
  #swagger.parameters['userId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '리뷰를 조회할 유저의 ID'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'integer',
    description: '페이징을 위한 커서 값 (리뷰 ID)'
  }
  #swagger.responses[200] = {
    description: "유저 리뷰 목록 조회 성공 응답",
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
                      content: { type: "string", description: "리뷰 내용" },
                      rating: { type: "number", description: "리뷰 평점" },
                      storeId: { type: "number", description: "리뷰가 작성된 가게의 ID" },
                      userId: { type: "number", description: "리뷰를 작성한 유저의 ID" }
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
                content: "훌륭한 서비스와 맛있는 음식!",
                rating: 5,
                storeId: 1,
                userId: 1
              },
              {
                id: 2,
                content: "깨끗하고 친절한 분위기!",
                rating: 4,
                storeId: 2,
                userId: 1
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
    description: "리뷰 조회 실패 응답 - 유저가 존재하지 않는 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
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
            errorCode: "U001",
            reason: "해당 유저가 존재하지 않습니다.",
            data: { userId: 999 }
          },
          success: null
        }
      }
    }
  };
*/
  console.log("유저 리뷰 리스트를 요청했습니다!");
  console.log("body:", req.body);

  const reviews = await listUserReviews(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleCompleteMissionChallenge = async (req, res, next) => {
  /*
  #swagger.summary = '유저 미션 완료 처리 API';
  #swagger.description = '특정 유저의 미션 도전을 완료 상태로 변경하는 API입니다.';
  
  #swagger.parameters['userId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '미션을 완료할 유저의 ID'
  }
  
  #swagger.parameters['missionId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '완료할 미션의 ID'
  }

  #swagger.responses[200] = {
    description: "미션 완료 성공 응답",
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
                mission_id: { type: "number", description: "완료된 미션의 ID" },
                user_id: { type: "number", description: "미션을 완료한 유저의 ID" },
                status: { type: "string", description: "미션 상태", example: "completed" },
              }
            }
          }
        },
        example: {
          resultType: "SUCCESS",
          error: null,
          success: {
            mission_id: 5,
            user_id: 1,
            status: "completed"
          }
        }
      }
    }
  };

  #swagger.responses[404] = {
    description: "미션 완료 실패 응답 - 유저 또는 미션이 존재하지 않는 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
                reason: { type: "string", description: "오류 발생 이유" },
                data: { type: "object", nullable: true, description: "오류 관련 추가 데이터" }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        },
        examples: {
          UserNotFound: {
            summary: "유저가 존재하지 않는 경우",
            value: {
              resultType: "FAIL",
              error: {
                errorCode: "U001",
                reason: "해당 유저가 존재하지 않습니다.",
                data: { userId: 999 }
              },
              success: null
            }
          },
          MissionNotFound: {
            summary: "미션이 존재하지 않는 경우",
            value: {
              resultType: "FAIL",
              error: {
                errorCode: "M001",
                reason: "도전 중인 미션이 아닙니다.",
                data: { missionId: 999, userId: 1 }
              },
              success: null
            }
          }
        }
      }
    }
  };
*/
  console.log("유저 미션 진행 완료를 요청했습니다!");
  console.log("body:", req.body);

  const { userId, missionId } = req.params;

  try {
    const updatedMissionChallenge = await userMissionComplete(
      userId,
      missionId
    );
    res.status(StatusCodes.OK).success(updatedMissionChallenge);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
};

export const handleUpdateUser = async (req, res, next) => {
  console.log("사용자 정보 수정을 요청했습니다!");
  console.log("body:", req.body);

  try {
    const { userId } = req.params;
    const updatedData = req.body;

    // 업데이트 수행
    const updatedUser = await updateUser(userId, updatedData);

    // 성공 응답
    res.status(200).json({
      resultType: "SUCCESS",
      success: updatedUser,
      error: null,
    });
  } catch (err) {
    next(err); // 전역 오류 처리기로 전달
  }
};
