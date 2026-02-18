import { TestStackProperties } from '../../../config/TestStackProperties';
import { OrderModel } from '../../dataProvidersModels/api/OrderModel';
import { PetModel } from '../../dataProvidersModels/api/PetModel';
import { PetStoreModel } from '../../dataProvidersModels/api/PetStoreModel';
import { UserModel } from '../../dataProvidersModels/api/UserModel';

export class PetStoreDP {

  static sendPostRequestPetAndCheckStatusCode(): PetStoreModel {
    return PetStoreModel
      .builder()
      .setApiRequestBodyPath("src/main/resources/api/env1/request/PostRequestPet_requestBody.json")
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
    let petId: number = this.getPetId();
    
    return PetStoreModel
      .builder()
      .setApiResponseBodyPath("src/main/resources/api/env1/response/GetRequestPetFindById_responseBody.json")
      .setPet(PetModel
        .builder()
        .setId(petId)
        .build())
      .build();
  }

  static sendPutRequestPetAndCheckStatusCode(): PetStoreModel {
    return PetStoreModel
      .builder()
      .setApiRequestBodyPath("src/main/resources/api/env1/request/PutRequestPet_requestBody.json")
      .build();
  }

  static sendDeleteRequestPetAndCheckStatusCode(): PetStoreModel {
    let petId: number = this.getPetId();

    return PetStoreModel
      .builder()
      .setPet(PetModel
        .builder()
        .setId(petId)
        .build())
      .build();
  }

  static sendPostRequestStoreOrderAndCheckStatusCode(): PetStoreModel {
    return PetStoreModel
      .builder()
      .setApiRequestBodyPath("src/main/resources/api/env1/request/PostRequestStoreOrder_requestBody.json")
      .build();
  }

  static sendGetRequestStoreOrderAndCheckResponse(): PetStoreModel {
    let orderId: number = this.getOrderId();
    
    return PetStoreModel
      .builder()
      .setApiResponseBodyPath("src/main/resources/api/env1/response/GetRequestStoreOrder_responseBody.json")
      .setOrder(OrderModel
        .builder()
        .setId(orderId)
        .build())
      .build();
  }

  static sendDeleteRequestStoreOrderAndCheckStatusCode(): PetStoreModel {
    let orderId: number = this.getOrderId();
    
    return PetStoreModel
      .builder()
      .setOrder(OrderModel
        .builder()
        .setId(orderId)
        .build())
      .build();
  }

  static sendGetRequestUserLoginAndCheckStatusCode(): PetStoreModel {
    let userName: string = this.getUserNameBeforeChange();
    let password: string = this.getPassword();
    
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
    return PetStoreModel
      .builder()
      .setApiResponseBodyPath("src/main/resources/api/env1/response/PostRequestUser_responseBody.json")
      .setApiRequestBodyPath("src/main/resources/api/env1/request/PostRequestUser_requestBody.json")
      .build();
  }

  static sendGetRequestUserAndCheckResponse(): PetStoreModel {
    let userName: string = this.getUserNameBeforeChange();
    
    return PetStoreModel
      .builder()
      .setApiResponseBodyPath("src/main/resources/api/env1/response/GetRequestUser_responseBody.json")
      .setUser(UserModel
        .builder()
        .setUserName(userName)
        .build())
      .build();
  }

  static sendPutRequestUserAndCheckStatusCode(): PetStoreModel {
    let userName: string = this.getUserNameBeforeChange();
    
    return PetStoreModel
      .builder()
      .setApiRequestBodyPath("src/main/resources/api/env1/request/PutRequestUser_requestBody.json")
      .setUser(UserModel
        .builder()
        .setUserName(userName)
        .build())
      .build();
  }

  static sendDeleteRequestUserAndCheckStatusCode(): PetStoreModel {
    let userName: string = this.getUserNameAfterChange();
    
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

  // private String getApiRequestBodyPathAccordingToTestName(Method method) {
  //       String partialYamlPath = "apiFilesPaths.requestBody";

  //       return switch (method.getName()) {
  //           case "sendPostRequestUserAndCheckResponse" ->
  //                   CONFIG.getProperty(partialYamlPath.concat(".postRequestUser"));
  //           case "sendPutRequestUserAndCheckStatusCode" ->
  //                   CONFIG.getProperty(partialYamlPath.concat(".putRequestUser"));
  //           case "sendPostRequestPetAndCheckStatusCode" ->
  //                   CONFIG.getProperty(partialYamlPath.concat(".postRequestPet"));
  //           case "sendPutRequestPetAndCheckStatusCode" -> CONFIG.getProperty(partialYamlPath.concat(".putRequestPet"));
  //           case "sendPostRequestStoreOrderAndCheckStatusCode" -> CONFIG.getProperty(partialYamlPath.concat(".postRequestStoreOrder"));
  //           default -> "";
  //       };
  //   }

  //   private String getApiResponseBodyPathAccordingToTestName(Method method) {
  //       String partialYamlPath = "apiFilesPaths.responseBody";

  //       return switch (method.getName()) {
  //           case "sendPostRequestUserAndCheckResponse" ->
  //                   CONFIG.getProperty(partialYamlPath.concat(".postRequestUser"));
  //           case "sendGetRequestUserAndCheckResponse" -> CONFIG.getProperty(partialYamlPath.concat(".getRequestUser"));
  //           case "sendGetRequestPetFindByIdAndCheckResponse" ->
  //                   CONFIG.getProperty(partialYamlPath.concat(".getRequestPetFindById"));
  //           case "sendGetRequestStoreOrderAndCheckResponse" ->
  //                   CONFIG.getProperty(partialYamlPath.concat(".getRequestStoreOrder"));
  //           default -> "";
  //       };
  //   }