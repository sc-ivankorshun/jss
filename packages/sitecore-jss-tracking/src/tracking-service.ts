import { isServer } from '@sitecore-jss/sitecore-jss';

import { TrackingRequestOptions } from './trackingRequestOptions';
import { PageViewInstance } from './dataModels';
import { trackEvent } from './trackingApi';

export class TrackingService {
  private trackingApiOptions: TrackingRequestOptions;

  constructor(options: TrackingRequestOptions) {
    this.trackingApiOptions = {
      currentPageParamsToTrack: ['sc_camp', 'sc_trk' ],
      ...options
    };
  }

  public trackCurrentPage(itemId: string) {
    if (isServer()) {
      // do nothing for SSR, only track events when a browser requests it
      return Promise.resolve();
    }

    const event = {
      pageId: itemId,
      url: location.pathname
    };

    return this.trackPage(event, this.getQueryStringParams());
  }

  public trackPage(event: PageViewInstance, querystringParams?: { [key: string]: unknown }): Promise<void> {
    if (isServer()) {
      // do nothing for SSR, only track events when a browser requests it
      return Promise.resolve();
    }

    const finalOptions = {
      ...this.trackingApiOptions,
      querystringParams: {
        ...this.trackingApiOptions.querystringParams,
        ...querystringParams
      }
    };

    return trackEvent([event], finalOptions);
  }

  private getQueryStringParams(): { [key: string]: unknown; } {
    let result: any = {};

    location.search.substring(1).split('&').forEach(param => {
      const lowerParam = param.toLowerCase();

      this.trackingApiOptions.currentPageParamsToTrack?.forEach(name => {
        if (lowerParam.startsWith(name.toLowerCase() + '=')) {
          result[name] = param.substring(name.length + 1);
          return;
        }
      });
    });

    return result;
  }
}