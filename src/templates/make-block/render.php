<?php
/**
 * __BLOCK_NAME__ block render
 *
 * @package __PLUGIN_SLUG__
 * @since 1.0.0
 */

/**
 * Get block attributes
 */
//phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
$title = $attributes['title'] ?? '';
?>
<h3><?php echo esc_html( $title ); ?></h3>