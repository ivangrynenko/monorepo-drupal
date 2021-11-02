<?php

/**
 * @file
 * Secondary navigation block theme alterations.
 */

/**
 * Implements template_preprocess_block__HOOK().
 */
function civic_preprocess_block__menu_block__civic_secondary_navigation(&$variables) {
  $variables['theme'] = theme_get_setting('civic_header_theme') ?? 'light';
  $variables['items'] = $variables['content']['#items'];
  $variables['title'] = $variables['configuration']['label_display'] ? $variables['configuration']['label'] : '';
  $variables['modifier_class'] = 'civic-justify-content-end';

}