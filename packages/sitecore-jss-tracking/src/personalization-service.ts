import { isServer } from '@sitecore-jss/sitecore-jss';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss';

import { TrackingService } from './tracking-service'

export class PersonalizationService {
    private trackingService: TrackingService;

    constructor(trackingService: TrackingService) {
        this.trackingService = trackingService;
    }

    public personalize(layoutData: LayoutServiceData, track: boolean) {
        if (isServer()) {
            return;
        }

        // TBD: Personalize if necessary (set track variable to false in this case)

        if (track) {
            if (!layoutData.sitecore.route?.itemId) {
                console.warn('Cannot track the page');
                return;
            }

            this.trackingService.trackCurrentPage(layoutData.sitecore.route.itemId);
        }
    }
}