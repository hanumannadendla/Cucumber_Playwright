Feature: Login test Scenarios

  Background:
    Given Launch salesforce

  @smoke @regression
  Scenario: Successfull login to salesforce
    And Enter Username "****"
    And Enter Password "****"
    When Click on login button
    Then It should navigate to home page

  @smoke @regression
  Scenario: validate invalid login credentials
    And Enter Username "****"
    And Enter Password "***"
    When Click on login button
    Then Error message should be displayed

  @smoke @regression @two
  Scenario Outline: Successfull login to salesforce
    And Enter Username "<user>"
    And Enter Password "<password>"
    When Click on login button
    Then It should navigate to home page

    Examples:
      | user                              | password         |
      | ****  | *** |
      | **** | **** |
