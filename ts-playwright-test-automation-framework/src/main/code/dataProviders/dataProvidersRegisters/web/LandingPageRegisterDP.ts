import { DataProviderRegistry } from '../../../utils/dataProviderRegistry/DataProviderRegistry';
import { LandingPageDP } from '../../dataProviders/web/LandingPageDP';

DataProviderRegistry.register(
  'searchForFlights',
  LandingPageDP.searchForFlights
);

DataProviderRegistry.register(
  'searchForVisa',
  LandingPageDP.searchForVisa
);