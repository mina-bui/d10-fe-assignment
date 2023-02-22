<?php

/**
 * @file
 * Post update functions for Mytheme.
 */

/**
 * Sets the default `base_primary_color` value of Mytheme's theme settings.
 */
function mytheme_post_update_add_mytheme_primary_color() {
  \Drupal::configFactory()->getEditable('mytheme.settings')
    ->set('base_primary_color', '#1b9ae4')
    ->save();
}
