import { DataProviderRegistry } from '../../../utils/dataProviderRegistry/DataProviderRegistry';
import { PetStoreDP } from '../../dataProviders/api/PetStoreDP';

DataProviderRegistry.register(
  'sendPostRequestPetAndCheckStatusCode',
  () => PetStoreDP.sendPostRequestPetAndCheckStatusCode('sendPostRequestPetAndCheckStatusCode')
);

DataProviderRegistry.register(
  'sendGetRequestPetFindByStatusAndCheckStatusCode',
  PetStoreDP.sendGetRequestPetFindByStatusAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendGetRequestPetFindByIdAndCheckResponse',
  () => PetStoreDP.sendGetRequestPetFindByIdAndCheckResponse('sendGetRequestPetFindByIdAndCheckResponse')
);

DataProviderRegistry.register(
  'sendPutRequestPetAndCheckStatusCode',
  () => PetStoreDP.sendPutRequestPetAndCheckStatusCode('sendPutRequestPetAndCheckStatusCode')
);

DataProviderRegistry.register(
  'sendDeleteRequestPetAndCheckStatusCode',
  PetStoreDP.sendDeleteRequestPetAndCheckStatusCode
);

DataProviderRegistry.register(
  'sendPostRequestStoreOrderAndCheckStatusCode',
  () => PetStoreDP.sendPostRequestStoreOrderAndCheckStatusCode('sendPostRequestStoreOrderAndCheckStatusCode')
);

DataProviderRegistry.register(
  'sendGetRequestStoreOrderAndCheckResponse',
  () => PetStoreDP.sendGetRequestStoreOrderAndCheckResponse('sendGetRequestStoreOrderAndCheckResponse')
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
  () => PetStoreDP.sendPostRequestUserAndCheckResponse('sendPostRequestUserAndCheckResponse')
);

DataProviderRegistry.register(
  'sendGetRequestUserAndCheckResponse',
  () => PetStoreDP.sendGetRequestUserAndCheckResponse('sendGetRequestUserAndCheckResponse')
);

DataProviderRegistry.register(
  'sendPutRequestUserAndCheckStatusCode',
  () => PetStoreDP.sendPutRequestUserAndCheckStatusCode('sendPutRequestUserAndCheckStatusCode')
);

DataProviderRegistry.register(
  'sendDeleteRequestUserAndCheckStatusCode',
  PetStoreDP.sendDeleteRequestUserAndCheckStatusCode
);