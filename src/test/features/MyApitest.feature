Feature: Test get api service

  @smoke @regression @api
  Scenario: get users test api
    Given I request list of users
    Then Response status code should be 200