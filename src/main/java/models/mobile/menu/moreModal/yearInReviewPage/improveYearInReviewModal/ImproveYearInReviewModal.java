package models.mobile.menu.moreModal.yearInReviewPage.improveYearInReviewModal;

import models.mobile.navigation.Navigation;

import static utils.logger.Log4J.log;

public class ImproveYearInReviewModal extends ImproveYearInReviewModalLocators {
    public ImproveYearInReviewModal() {
        check.isElementDisplayed(improveModalContainer, 15);
        log.info("Help improve Year in review modal window is displayed.");
    }

    public Navigation tapOnCancelButton() {
        mobile.tapOnElement(cancelButton, 15);
        log.info("Cancel button has been tapped.");

        return new Navigation();
    }
}
