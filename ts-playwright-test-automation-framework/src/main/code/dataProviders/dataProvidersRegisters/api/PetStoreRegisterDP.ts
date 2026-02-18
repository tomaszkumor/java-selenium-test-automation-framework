import { DataProviderRegistry } from '../../../utils/dataProviderRegistry/DataProviderRegistry';
import { PetStoreDP } from '../../dataProviders/api/PetStoreDP';

DataProviderRegistry.register(
  'sendPostRequestPetAndCheckStatusCode',
  PetStoreDP.sendPostRequestPetAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendGetRequestPetFindByStatusAndCheckStatusCode',
  PetStoreDP.sendGetRequestPetFindByStatusAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendGetRequestPetFindByIdAndCheckResponse',
  PetStoreDP.sendGetRequestPetFindByIdAndCheckResponse
);

DataProviderRegistry.register(
  'sendPutRequestPetAndCheckStatusCode',
  PetStoreDP.sendPutRequestPetAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendDeleteRequestPetAndCheckStatusCode',
  PetStoreDP.sendDeleteRequestPetAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendPostRequestStoreOrderAndCheckStatusCode',
  PetStoreDP.sendPostRequestStoreOrderAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendGetRequestStoreOrderAndCheckResponse',
  PetStoreDP.sendGetRequestStoreOrderAndCheckResponse
);

DataProviderRegistry.register(
  'sendDeleteRequestStoreOrderAndCheckStatusCode',
  PetStoreDP.sendDeleteRequestStoreOrderAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendGetRequestUserLoginAndCheckStatusCode',
  PetStoreDP.sendGetRequestUserLoginAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendPostRequestUserAndCheckResponse',
  PetStoreDP.sendPostRequestUserAndCheckResponse
);

DataProviderRegistry.register(
  'sendGetRequestUserAndCheckResponse',
  PetStoreDP.sendGetRequestUserAndCheckResponse
);

DataProviderRegistry.register(
  'sendPutRequestUserAndCheckStatusCode',
  PetStoreDP.sendPutRequestUserAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendDeleteRequestUserAndCheckStatusCode',
  PetStoreDP.sendDeleteRequestUserAndCheckStatusCode
);