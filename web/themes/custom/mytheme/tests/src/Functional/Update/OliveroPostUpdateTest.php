<?php

namespace Drupal\Tests\mytheme\Functional\Update;

use Drupal\FunctionalTests\Update\UpdatePathTestBase;

/**
 * Tests the update path for Mytheme.
 *
 * @group Update
 */
class MythemePostUpdateTest extends UpdatePathTestBase {

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected function setDatabaseDumpFiles() {
    $this->databaseDumpFiles = [
      __DIR__ . '/../../../../../../modules/system/tests/fixtures/update/drupal-9.4.0.filled.standard.php.gz',
    ];
  }

  /**
   * Tests update hook setting base primary color.
   */
  public function testMythemePrimaryColorUpdate() {
    $config = $this->config('mytheme.settings');
    $this->assertEmpty($config->get('base_primary_color'));

    // Run updates.
    $this->runUpdates();

    $config = $this->config('mytheme.settings');
    $this->assertSame('#1b9ae4', $config->get('base_primary_color'));
  }

}
