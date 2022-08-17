#!/usr/bin/env bash
##
# Provision content.
#
# shellcheck disable=SC2086

set -e
[ -n "${DREVOPS_DEBUG}" ] && set -x

# Path to the application.
APP="${APP:-/app}"

# ------------------------------------------------------------------------------

# Use local or global Drush, giving priority to a local drush.
drush="$(if [ -f "${APP}/vendor/bin/drush" ]; then echo "${APP}/vendor/bin/drush"; else command -v drush; fi)"

if [ "${DREVOPS_DRUPAL_PROFILE}" = "govcms" ]; then
  echo "  > Uninstall obsolete themes."
  $drush -y thun claro || true
  $drush -y thun govcms_bartik || true
  $drush -y thun bartik || true

  echo "  > Remove GovCMS configs."
  $drush -y pm-enable civictheme_govcms
  $drush civictheme_govcms:remove-config
fi

echo "  > Provision content."
$drush ev -v "require_once '/app/docroot/themes/contrib/civictheme/civictheme.provision.inc'; civictheme_provision_cli();"

echo "  > Provision default content."
$drush -y pm-enable civictheme_content

echo "  > Enable helper module."
$drush -y pm-enable cs_core

echo "  > Generate test content."
GENERATED_CONTENT_CREATE=1 $drush -y pm-enable cs_generated_content

echo "  > Generate sitemap."
$drush simple-sitemap:generate
