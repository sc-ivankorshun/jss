import { TrackingService, PersonalizationService } from '@sitecore-jss/sitecore-jss-tracking'

import { dataFetcher } from 'lib/data-fetcher';

import config from 'temp/config';

export const trackingService = new TrackingService({
  fetcher: dataFetcher,
  host: config.sitecoreApiHost,
  querystringParams: {
    sc_apikey: config.sitecoreApiKey
  }
});

export const personalizationService = new PersonalizationService(trackingService);