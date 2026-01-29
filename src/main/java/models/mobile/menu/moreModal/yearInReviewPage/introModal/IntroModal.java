package models.mobile.menu.moreModal.yearInReviewPage.introModal;

import models.mobile.menu.moreModal.yearInReviewPage.yearInReviewStepOnePage.YearInReviewStepOnePage;

import static utils.logger.Log4J.log;

public class IntroModal extends IntroModalLocators {
    public IntroModal() {
        check.isElementDisplayed(continueWithoutLoggingInButton, 15);
        log.info("Intro modal is displayed");
    }

    public YearInReviewStepOnePage tapOnContinueWithoutLoggingInButton() {
        mobile.tapOnElement(continueWithoutLoggingInButton, 15);
        log.info("Get started button has been tapped.");

        return new YearInReviewStepOnePage();
    }
}
