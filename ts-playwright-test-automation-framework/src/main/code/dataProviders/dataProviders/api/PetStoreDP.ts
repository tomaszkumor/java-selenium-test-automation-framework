import { TestStackProperties } from '../../../config/TestStackProperties';
import { OrderModel } from '../../dataProvidersModels/api/OrderModel';
import { PetModel } from '../../dataProvidersModels/api/PetModel';
import { PetStoreModel } from '../../dataProvidersModels/api/PetStoreModel';
import { UserModel } from '../../dataProvidersModels/api/UserModel';
import { TestConfig } from '../../../config/TestConfig';

export class PetStoreDP {
  static sendPostRequestPetAndCheckStatusCode(): PetStoreModel {
    let apiRequestBodyPath: string = TestConfig.CONFIG.getProperty("apiFilesPaths.requestBody.postRequestPet")!;

    return PetStoreModel
      .builder()
      .setApiRequestBodyPath(apiRequestBodyPath)
      .build();
  }

  static sendGetRequestPetFindByStatusAndCheckStatusCode(): PetStoreModel {
    return PetStoreModel
      .builder()
      .setPet(PetModel
        .builder()
        .setStatus("available")
        .build())
      .build();
  }

  static sendGetRequestPetFindByIdAndCheckResponse(): PetStoreModel {
    let apiResponseBodyPath: string = TestConfig.CONFIG.getProperty("apiFilesPaths.responseBody.getRequestPetFindById")!;
    let petId: number = PetStoreDP.getPetId();

    return PetStoreModel
      .builder()
      .setApiResponseBodyPath(apiResponseBodyPath)
      .setPet(PetModel
        .builder()
        .setId(petId)
        .build())
      .build();
  }

  static sendPutRequestPetAndCheckStatusCode(): PetStoreModel {
    let apiRequestBodyPath: string = TestConfig.CONFIG.getProperty("apiFilesPaths.requestBody.putRequestPet")!;

    return PetStoreModel
      .builder()
      .setApiRequestBodyPath(apiRequestBodyPath)
      .build();
  }

  static sendDeleteRequestPetAndCheckStatusCode(): PetStoreModel {
    let petId: number = PetStoreDP.getPetId();

    return PetStoreModel
      .builder()
      .setPet(PetModel
        .builder()
        .setId(petId)
        .build())
      .build();
  }

  static sendPostRequestStoreOrderAndCheckStatusCode(): PetStoreModel {
    let apiRequestBodyPath: string = TestConfig.CONFIG.getProperty("apiFilesPaths.requestBody.postRequestStoreOrder")!;

    return PetStoreModel
      .builder()
      .setApiRequestBodyPath(apiRequestBodyPath)
      .build();
  }

  static sendGetRequestStoreOrderAndCheckResponse(): PetStoreModel {
    let apiResponseBodyPath: string = TestConfig.CONFIG.getProperty("apiFilesPaths.responseBody.getRequestStoreOrder")!;
    let orderId: number = PetStoreDP.getOrderId();

    return PetStoreModel
      .builder()
      .setApiResponseBodyPath(apiResponseBodyPath)
      .setOrder(OrderModel
        .builder()
        .setId(orderId)
        .build())
      .build();
  }

  static sendDeleteRequestStoreOrderAndCheckStatusCode(): PetStoreModel {
    let orderId: number = PetStoreDP.getOrderId();

    return PetStoreModel
      .builder()
      .setOrder(OrderModel
        .builder()
        .setId(orderId)
        .build())
      .build();
  }

  static sendGetRequestUserLoginAndCheckStatusCode(): PetStoreModel {
    let userName: string = PetStoreDP.getUserNameBeforeChange();
    let password: string = PetStoreDP.getPassword();

    return PetStoreModel
      .builder()
      .setUser(UserModel
        .builder()
        .setUserName(userName)
        .setPassword(password)
        .build())
      .build();
  }

  static sendPostRequestUserAndCheckResponse(): PetStoreModel {
    let apiRequestBodyPath: string = TestConfig.CONFIG.getProperty("apiFilesPaths.requestBody.postRequestUser")!
    let apiResponseBodyPath: string = TestConfig.CONFIG.getProperty("apiFilesPaths.responseBody.postRequestUser")!;

    return PetStoreModel
      .builder()
      .setApiResponseBodyPath(apiResponseBodyPath)
      .setApiRequestBodyPath(apiRequestBodyPath)
      .build();
  }

  static sendGetRequestUserAndCheckResponse(): PetStoreModel {
    let apiResponseBodyPath: string = TestConfig.CONFIG.getProperty("apiFilesPaths.responseBody.getRequestUser")!;
    let userName: string = PetStoreDP.getUserNameBeforeChange();

    return PetStoreModel
      .builder()
      .setApiResponseBodyPath(apiResponseBodyPath)
      .setUser(UserModel
        .builder()
        .setUserName(userName)
        .build())
      .build();
  }

  static sendPutRequestUserAndCheckStatusCode(): PetStoreModel {
    let apiRequestBodyPath: string = TestConfig.CONFIG.getProperty("apiFilesPaths.requestBody.putRequestUser")!;
    let userName: string = PetStoreDP.getUserNameBeforeChange();

    return PetStoreModel
      .builder()
      .setApiRequestBodyPath(apiRequestBodyPath)
      .setUser(UserModel
        .builder()
        .setUserName(userName)
        .build())
      .build();
  }

  static sendDeleteRequestUserAndCheckStatusCode(): PetStoreModel {
    let userName: string = PetStoreDP.getUserNameAfterChange();

    return PetStoreModel
      .builder()
      .setUser(UserModel
        .builder()
        .setUserName(userName)
        .build())
      .build();
  }

  private static getUserNameBeforeChange(): string {
    let env: string = TestStackProperties.getEnvironment().toLowerCase();

    switch (env) {
      case "env1":
        return "JanNowak";
      case "env2":
        return "StefanKonieczny";
      default:
        throw new Error(`Unknown environment: ${env}`);
    };
  }

  private static getUserNameAfterChange(): string {
    let env: string = TestStackProperties.getEnvironment().toLowerCase();

    switch (env) {
      case "env1":
        return "AndrzejModny";
      case "env2":
        return "IgnacyBonczek";
      default:
        throw new Error(`Unknown environment: ${env}`);
    };
  }

  private static getPassword(): string {
    let env: string = TestStackProperties.getEnvironment().toLowerCase();

    switch (env) {
      case "env1":
        return "Haslo123.";
      case "env2":
        return "Haslo1234.";
      default:
        throw new Error(`Unknown environment: ${env}`);
    };
  }

  private static getPetId(): number {
    let env: string = TestStackProperties.getEnvironment().toLowerCase();

    switch (env) {
      case "env1":
        return 909091666;
      case "env2":
        return 909091555;
      default:
        throw new Error(`Unknown environment: ${env}`);
    };
  }

  private static getOrderId(): number {
    let env: string = TestStackProperties.getEnvironment().toLowerCase();

    switch (env) {
      case "env1":
        return 10;
      case "env2":
        return 9;
      default:
        throw new Error(`Unknown environment: ${env}`);
    };
  }
}