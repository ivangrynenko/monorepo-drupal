@civic @civic_theme_settings
Feature: Check for custom fields on Civic theme page

  Ensure that the relevant fields are present.

  @api
  Scenario: The theme settings has all relevant custom fields
    Given I am logged in as a user with the "Civic Site Administrator" role
    When I visit "/admin/appearance/settings/civic"
    Then the response status code should be 200

    And I see field "Header desktop logo path"
    And I see field "Header mobile logo path"
    And I see field "Footer desktop logo path"
    And I see field "Footer mobile logo path"
    And I see field "Logo alt attribute text"

    And I see field "civic_header_theme"
    And I see field "civic_footer_theme"

    And I see field "Footer background image path"