<?php

/**
 * Plugin Name: MemberMouse Gutenberg Blocks
 * Plugin URI: https://membermouse.com/
 * Description: MemberMouse Gutenberg Blocks
 * Author: membermouse
 * Author URI: https://membermouse.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'src/init.php';

/**
 * Local Logging for Plugin. Only runs if turned on in defines.
 * @param string|array $data Data sent to logs. Can be string or Array or Object.
 * @param string $pretext Text that can be added ABOVE $data. Useful if $data is an array and you want to include a string above it.
 * @param bool $first_log True if you want to add a PHP_EOL before text is printed to give visual space and adds Date and time
 * @return void
 */

function write_log($data, $pretext = null, $first_log = false) {

	$loc = plugin_dir_path(__FILE__) . 'debug.log';

	// First Log Handler
	if ($first_log) {
		error_log(PHP_EOL . '*** ' . date('m/d/Y H:i:s') . ' ***' . PHP_EOL, 3, $loc);
	}

	// Pretext Handler
	if ($pretext && is_string($pretext)) {
		error_log($pretext . PHP_EOL, 3, $loc);
	}
	if (is_array($data) || is_object($data)) {
		error_log(print_r($data, true) . PHP_EOL, 3, $loc);
	} else {
		error_log($data . PHP_EOL, 3, $loc);
	}
}
