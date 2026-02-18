import { TestStackProperties } from '../../../config/TestStackProperties';
import { OrderModel } from '../../dataProvidersModels/api/OrderModel';
import { PetModel } from '../../dataProvidersModels/api/PetModel';
import { PetStoreModel } from '../../dataProvidersModels/api/PetStoreModel';
import { UserModel } from '../../dataProvidersModels/api/UserModel';
import { TestConfig } from '../../../config/TestConfig';
import { TestInfo } from 'playwright/test';

export class PetStoreDP {
  static sendPostRequestPetAndCheckStatusCode(testInfo: TestInfo): PetStoreModel {
    let apiRequestBodyPath: string = PetStoreDP.getApiRequestBodyPathAccordingToTestName(testInfo.title);

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

  static sendGetRequestPetFindByIdAndCheckResponse(testInfo: TestInfo): PetStoreModel {
    let apiResponseBodyPath: string = PetStoreDP.getApiResponseBodyPathAccordingToTestName(testInfo.title);
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

  static sendPutRequestPetAndCheckStatusCode(testInfo: TestInfo): PetStoreModel {
    let apiRequestBodyPath: string = PetStoreDP.getApiRequestBodyPathAccordingToTestName(testInfo.title);

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

  static sendPostRequestStoreOrderAndCheckStatusCode(testInfo: TestInfo): PetStoreModel {
    let apiRequestBodyPath: string = PetStoreDP.getApiRequestBodyPathAccordingToTestName(testInfo.title);

    return PetStoreModel
      .builder()
      .setApiRequestBodyPath(apiRequestBodyPath)
      .build();
  }

  static sendGetRequestStoreOrderAndCheckResponse(testInfo: TestInfo): PetStoreModel {
    let apiResponseBodyPath: string = PetStoreDP.getApiResponseBodyPathAccordingToTestName(testInfo.title);
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

  static sendPostRequestUserAndCheckResponse(testInfo: TestInfo): PetStoreModel {
    let apiRequestBodyPath: string = PetStoreDP.getApiRequestBodyPathAccordingToTestName(testInfo.title);
    let apiResponseBodyPath: string = PetStoreDP.getApiResponseBodyPathAccordingToTestName(testInfo.title);

    return PetStoreModel
      .builder()
      .setApiResponseBodyPath(apiResponseBodyPath)
      .setApiRequestBodyPath(apiRequestBodyPath)
      .build();
  }

  static sendGetRequestUserAndCheckResponse(testInfo: TestInfo): PetStoreModel {
    let apiResponseBodyPath: string = PetStoreDP.getApiResponseBodyPathAccordingToTestName(testInfo.title);
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

  static sendPutRequestUserAndCheckStatusCode(testInfo: TestInfo): PetStoreModel {
    let apiRequestBodyPath: string = PetStoreDP.getApiRequestBodyPathAccordingToTestName(testInfo.title);
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

  private static getApiRequestBodyPathAccordingToTestName(methodName: string): string {
    let partialYamlPath: string = "apiFilesPaths.requestBody";

    switch (methodName) {
      case "sendPostRequestUserAndCheckResponse":
        return TestConfig.CONFIG.getProperty(partialYamlPath.concat(".postRequestUser"))!;
      case "sendPutRequestUserAndCheckStatusCode":
        return TestConfig.CONFIG.getProperty(partialYamlPath.concat(".putRequestUser"))!;
      case "sendPostRequestPetAndCheckStatusCode":
        return TestConfig.CONFIG.getProperty(partialYamlPath.concat(".postRequestPet"))!;
      case "sendPutRequestPetAndCheckStatusCode":
        return TestConfig.CONFIG.getProperty(partialYamlPath.concat(".putRequestPet"))!;
      case "sendPostRequestStoreOrderAndCheckStatusCode":
        return TestConfig.CONFIG.getProperty(partialYamlPath.concat(".postRequestStoreOrder"))!;
      default: throw new Error(`'${methodName}' method does not exist.`);
    };
  }

  private static getApiResponseBodyPathAccordingToTestName(methodName: string): string {
    let partialYamlPath: string = "apiFilesPaths.responseBody";

    switch (methodName) {
      case "sendPostRequestUserAndCheckResponse":
        return TestConfig.CONFIG.getProperty(partialYamlPath.concat(".postRequestUser"))!;
      case "sendGetRequestUserAndCheckResponse":
        return TestConfig.CONFIG.getProperty(partialYamlPath.concat(".getRequestUser"))!;
      case "sendGetRequestPetFindByIdAndCheckResponse":
        return TestConfig.CONFIG.getProperty(partialYamlPath.concat(".getRequestPetFindById"))!;
      case "sendGetRequestStoreOrderAndCheckResponse":
        return TestConfig.CONFIG.getProperty(partialYamlPath.concat(".getRequestStoreOrder"))!;
      default: throw new Error(`'${methodName}' method does not exist.`);
    };
  }

  private static getCallerMethodName(): string | undefined {
    const err = new Error();
    const stack = err.stack?.split("\n");
    const callerLine = stack?.[6];
    const match = callerLine?.match(/\.([A-Za-z0-9_]+)/);

    return match?.[1];
  }
}