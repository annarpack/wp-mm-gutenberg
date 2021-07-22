<?php

/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * Naming Structure: {namespace}-blocks-{blockName}
 * ie: mm-blocks-login
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function membermouse_gutenberg_block_assets() { // phpcs:ignore
	$version = MemberMouse::getPluginVersion();

	// Register block styles for both frontend + backend.
	wp_register_style('mm-blocks-style-css', plugins_url('dist/blocks.style.build.css', dirname(__FILE__)),  is_admin() ? array('wp-editor') : null, filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.style.build.css'));

	// Register block editor styles for backend.
	wp_register_style('mm-blocks-block-editor-css',  plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), array('wp-edit-blocks'), filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.editor.build.css'));

	// Register block editor script for backend. Built with Webpack.
	wp_register_script('mm-blocks-js', plugins_url('/dist/blocks.build.js', dirname(__FILE__)), array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.build.js'), true);


	/**
	 * Order Data Block
	 * Can set attributes and defaults here (versus in block.js). Useful if utilizing render_callback.
	 */
	register_block_type('mm/order-data-block', array(
		'style'           => 'mm-blocks-style-css',
		'render_callback' => 'mm_blocks_order_data_cb',
		'attributes' => [
			'type' => [
				'type' => 'string',
				'default' => 'productName'
			],
			'doFormat' => [
				'type' => 'boolean',
				'default' => false
			],
			'preText' => [
				'type' => 'string'
			],
			'postText' => [
				'type' => 'string'
			],
			'renderInline' => [
				'type' => 'boolean',
				'default' => false
			]
		]
	));

	/**
	 * Member Data Block
	 */
	register_block_type('mm/member-data-block', array(
		'style'           => 'mm-blocks-style-css',
		'render_callback' => 'mm_blocks_member_data_cb',
		'attributes' => [
			'type' => [
				'type' => 'string',
				'default' => 'firstName'
			],
			'dateFormat' => [
				'type' => 'string',
				'default' => 'M n, Y g:i a'
			],
			'smartTagExtraId' => [
				'type' => 'string',
				'default' => '1'
			],
			'preText' => [
				'type' => 'string'
			],
			'postText' => [
				'type' => 'string'
			],
			'renderInline' => [
				'type' => 'boolean',
				'default' => false
			]
		]
	));

	/**
	 * Member Data Block
	 */
	register_block_type('mm/employee-data-block', array(
		'style'           => 'mm-blocks-style-css',
		'render_callback' => 'mm_blocks_employee_data_cb',
		'attributes' => [
			'id' => [
				'type' => 'string',
			],
			'type' => [
				'type' => 'string',
				'default' => 'email'
			],
			'preText' => [
				'type' => 'string'
			],
			'postText' => [
				'type' => 'string'
			]
		]
	));

	/**
	 * Order Decision Block
	 */
	register_block_type('mm/order-decision-block', array(
		'style'           => 'mm-blocks-style-css',
		'render_callback' => 'mm_blocks_order_decision_cb',
		'attributes' => [
			'membershipId' => [
				'type' => 'string'
			],
			'productId' => [
				'type' => 'string'
			],
			'isFree' => [
				'type' => 'string',
				'default' => 'na'
			],
			'isShippable' => [
				'type' => 'string',
				'default' => 'na'
			],
			'isDiscounted' => [
				'type' => 'string',
				'default' => 'na'
			],
			'isGift' => [
				'type' => 'string',
				'default' => 'na'
			]
		]
	));

	/**
	 * Order Decision Block
	 */
	register_block_type('mm/order-subdecision-block', array(
		'style'           => 'mm-blocks-style-css',
		'render_callback' => 'mm_blocks_order_subdecision_cb',
		'attributes' => [
			'membershipId' => [
				'type' => 'string'
			],
			'productId' => [
				'type' => 'string'
			],
			'isFree' => [
				'type' => 'string',
				'default' => 'na'
			],
			'isShippable' => [
				'type' => 'string',
				'default' => 'na'
			],
			'isDiscounted' => [
				'type' => 'string',
				'default' => 'na'
			],
			'isGift' => [
				'type' => 'string',
				'default' => 'na'
			]
		]
	));

	/**
	 * Member Decision Block
	 */
	register_block_type('mm/member-decision-block', array(
		'style'           => 'mm-blocks-style-css',
		'render_callback' => 'mm_blocks_member_decision_cb',
		'attributes' => [
			'isMember' => [
				'type' => 'string',
				'default' => 'na'
			],
			'isFree' => [
				'type' => 'string',
				'default' => 'na'
			],
			'status' => [
				'type' => 'string',
			],
			'membershipId' => [
				'type' => 'string',
			],
			'daysAsMember' => [
				'type' => 'string',
			],
			'hasBundle' => [
				'type' => 'string',
			],
			'daysWithBundleNumber' => [
				'type' => 'string',
			],
			'daysWithBundleId' => [
				'type' => 'string',
			],
			'purchasedProduct' => [
				'type' => 'string',
			],
			'customFieldValue' => [
				'type' => 'string',
			],
			'customFieldId' => [
				'type' => 'string',
			],
		]
	));

	/**
	 * Register Gutenberg block - Form Block
	 */
	register_block_type('mm/form-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_form_cb',
		'attributes' => [
			'type' => [
				'type' => 'string',
				'default' => 'myaccount'
			],
			'preText' => [
				'type' => 'string'
			],
			'postText' => [
				'type' => 'string'
			],
			'1clickPurchase' => [
				'type' => 'string'
			],
			'productId' => [
				'type' => 'string'
			],
			'membershipLevelId' => [
				'type' => 'string'
			],
			'onSuccess' => [
				'type' => 'string'
			]
		]
	));

	/**
	 * Register Gutenberg block - Form Button Block
	 */
	register_block_type('mm/form-button-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_form_button_cb',
		'attributes' => [
			'type' => [
				'type' => 'string',
				'default' => 'submit'
			],
			'label' => [
				'type' => 'string',
			],
			'color' => [
				'type' => 'string',
				'default' => ''
			],
			'buttonBgColor' => [
				'type' => 'string',
				'default' => '#000',
			],
			'buttonTextColor' => [
				'type' => 'string',
				'default' => '#fff',
			],
			'buttonText' => [
				'type' => 'string',
			],
			'paymentMethod' => [
				'type' => 'string',
				'default' => 'default'
			],
			'isDefault' => [
				'type' => 'string',
				'default' => false
			],
			'customAttributes' => [
				'type' => 'string'
			],
			'parentType' => [
				'type' => 'string'
			]
		]
	));

	/**
	 * Register Gutenberg block - Form Section Block
	 */
	register_block_type('mm/form-data-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_form_data_cb',
		'attributes' => [
			'name' => [
				'type' => 'string',
				'default' => 'firstName'
			],
			'smartTagExtraId' => [
				'type' => 'string',
				'default' => '1'
			],
			'preText' => [
				'type' => 'string'
			],
			'postText' => [
				'type' => 'string'
			],
			'renderInline' => [
				'type' => 'boolean',
				'default' => false
			]
		]
	));

	/**
	 * Register Gutenberg block - Form Field Block
	 */
	register_block_type('mm/form-field-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_form_field_cb',
		'attributes' => [
			'type' => [
				'type' => 'string',
				'default' => 'input'
			],
			'name' => [
				'type' => 'string',
				'default' => 'firstName'
			],
			'label' => [
				'type' => 'string',
				'default' => 'Remember Me'
			],
			'class' => [
				'type' => 'string',
				'default' => ''
			],
			'value' => [
				'type' => 'string',
				'default' => ''
			],
			'style' => [
				'type' => 'string',
				'default' => 'clean'
			],
			'customAttributes' => [
				'type' => 'string',
				'default' => ''
			],
			'id' => [
				'type' => 'string',
				'default' => ''
			],
			'isReqired' => [
				'type' => 'boolean',
				'default' => false
			],
			'preText' => [
				'type' => 'string'
			],
			'postText' => [
				'type' => 'string'
			]
		]
	));

	/**
	 * Register Gutenberg block - Form Message Block
	 */
	register_block_type('mm/form-message-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_form_message_cb',
		'attributes' => [
			'type' => [
				'type' => 'string',
				'default' => 'error'
			],
			'preText' => [
				'type' => 'string'
			],
			'postText' => [
				'type' => 'string'
			]
		]
	));
	/**
	 * Register Gutenberg block - Form Section Block
	 */
	register_block_type('mm/form-section-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_form_section_cb',
		'attributes' => [
			'type' => [
				'type' => 'string',
				'default' => 'accountInfo'
			],
			'preText' => [
				'type' => 'string'
			],
			'postText' => [
				'type' => 'string'
			],
			'parentType' => [
				'type' => 'string'
			]
		]
	));
	/**
	 * Register Gutenberg block - Form SubSection Block
	 */
	register_block_type('mm/form-subsection-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_form_subsection_cb',
		'attributes' => [
			'type' => [
				'type' => 'string',
				'default' => 'accountInfo'
			],
			'preText' => [
				'type' => 'string'
			],
			'postText' => [
				'type' => 'string'
			],
			'parentType' => [
				'type' => 'string'
			]
		]
	));

	/**
	 * Login Block
	 */
	register_block_type('mm/login-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_login_cb',
		'attributes' => [
			'buttonText' => [
				'type' => 'string',
				'default' => 'Login',
			],
			'buttonBgColor' => [
				'type' => 'string',
				'default' => '#000',
			],
			'buttonTextColor' => [
				'type' => 'string',
				'default' => '#fff',
			],
			'usernameLabelText' => [
				'type' => 'string',
				'default' => 'Username',
			],
			'passwordLabelText' => [
				'type' => 'string',
				'default' => 'Password',
			],
			'usernamePlaceholderText' => [
				'type' => 'string',
			],
			'passwordPlaceholderText' => [
				'type' => 'string',
			],
			'rememberMeChecked' => [
				'type' => 'boolean',
			],
			'rememberMeLabel' => [
				'type' => 'string',
				'default' => 'Remember me',
			],
			'forgotPasswordChecked' => [
				'type' => 'boolean',
			],
			'forgotPasswordText' => [
				'type' => 'string',
				'default' => 'Forgot Password?',
			],
			'customCss' => [
				'type' => 'string'
			],
			'designTemplate' => [
				'type' => 'string',
				'default' => 'default'
			]
		]
	));

	/**
	 * Register Gutenberg block - Forgot Password Block
	 */
	register_block_type('mm/forgot-password-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_forgot_password_cb',
		'attributes' => [
			'buttonText' => [
				'type' => 'string',
				'default' => 'Reset Your Password',
			],
			'buttonBgColor' => [
				'type' => 'string',
				'default' => '#000',
			],
			'buttonTextColor' => [
				'type' => 'string',
				'default' => '#fff',
			],
			'usernameLabelText' => [
				'type' => 'string',
				'default' => 'Enter your email address',
			],
			'usernamePlaceholderText' => [
				'type' => 'string',
			],
			'customCss' => [
				'type' => 'string'
			],
			'designTemplate' => [
				'type' => 'string',
				'default' => 'default'
			]
		]
	));

	/**
	 * Register Gutenberg block - Reset Password Block
	 */
	register_block_type('mm/reset-password-block', array(
		'style'         => 'mm-blocks-style-css',
		'editor_script' => 'mm-blocks-js',
		'editor_style'  => 'mm-blocks-block-editor-css',
		'render_callback' => 'mm_blocks_reset_password_cb',
		'attributes' => [
			'buttonText' => [
				'type' => 'string',
				'default' => 'Save',
			],
			'buttonBgColor' => [
				'type' => 'string',
				'default' => '#000',
			],
			'buttonTextColor' => [
				'type' => 'string',
				'default' => '#fff',
			],
			'passwordLabelText' => [
				'type' => 'string',
				'default' => 'Password',
			],
			'passwordPlaceholderText' => [
				'type' => 'string',
			],
			'passwordConfirmLabelText' => [
				'type' => 'string',
				'default' => 'Confirm Password',
			],
			'passwordConfirmPlaceholderText' => [
				'type' => 'string',
			],
			'customCss' => [
				'type' => 'string'
			],
			'designTemplate' => [
				'type' => 'string',
				'default' => 'default'
			]
		]
	));
}
add_action('init', 'membermouse_gutenberg_block_assets');

/**
 * Render Callback - Order Data Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_order_data_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/order-data-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	$doFormat = $block_attributes['doFormat'] ? 'true' : 'false';
	if ($block_attributes['renderInline']) {
		$default_class_name_main .= ' render-inline';
	}

	$shortcode = do_shortcode('[MM_Order_Data name="' . $block_attributes['type'] . '" doFormat="' . $doFormat . '"]');
	if ($shortcode !== '') {
		return "<div class='$default_class_name_main'><span class=\"$default_class_name-pre-text\">{$block_attributes['preText']}</span>$shortcode<span class=\"$default_class_name-post-text\">{$block_attributes['postText']}</span></div>";
	} else {
		return "<div class='$default_class_name'>$shortcode</div>";
	}
}

/**
 * Render Callback - Member Data Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_member_data_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/member-data-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}
	$dateFormat = $block_attributes['dateFormat'] ? 'dateFormat="' . $block_attributes['dateFormat'] . '"' : '';

	if ($block_attributes['renderInline']) {
		$default_class_name_main .= ' render-inline';
	}

	// Handle CustomField and DaysWithBundle #'s
	if ($block_attributes['type'] === 'daysWithBundle_' || $block_attributes['type'] === 'customField_') {
		$block_attributes['type'] = $block_attributes['type'] . $block_attributes['smartTagExtraId'];
	}

	//write_log($block_attributes);

	$shortcode = do_shortcode('[MM_Member_Data name="' . $block_attributes['type'] . '" ' . $dateFormat . ']');
	if ($shortcode !== '') {
		return "<div class='$default_class_name_main'><span class=\"$default_class_name-pre-text\">{$block_attributes['preText']}</span>$shortcode<span class=\"$default_class_name-post-text\">{$block_attributes['postText']}</span></div>";
	} else {
		return "<div class='$default_class_name'>$shortcode</div>";
	}
}

/**
 * Render Callback - Employee Data Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_employee_data_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/employee-data-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}
	$id = $block_attributes['id'] ? 'id="' . $block_attributes['id'] . '"' : '';


	$shortcode = do_shortcode('[MM_Employee_Data ' . $id . ' name="' . $block_attributes['type'] . '"]');
	if ($shortcode !== '') {
		return "<div class='$default_class_name_main'><span class=\"$default_class_name-pre-text\">{$block_attributes['preText']}</span>$shortcode<span class=\"$default_class_name-post-text\">{$block_attributes['postText']}</span></div>";
	} else {
		return "<div class='$default_class_name'>$shortcode</div>";
	}
}

/**
 * Render Callback - Order Decision Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_order_decision_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/order-decision-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	// Get Shortcode attributes
	$shortcode_params = '';
	$membershipId = isset($block_attributes['membershipId']) && $block_attributes['membershipId'] !== '' ? $shortcode_params .= " membershipId='{$block_attributes['membershipId']}'" : false;
	$productId = isset($block_attributes['productId']) && $block_attributes['productId'] !== '' ? $shortcode_params .= " productId='{$block_attributes['productId']}'" : false;

	$isFree =	isset($block_attributes['isFree']) && $block_attributes['isFree'] !== 'na' ?  $shortcode_params .= " isFree='{$block_attributes['isFree']}'" : false;
	$isShippable = isset($block_attributes['isShippable']) && $block_attributes['isShippable'] !== 'na' ? $shortcode_params .= " isShippable='{$block_attributes['isShippable']}'" : false;
	$isDiscounted =	isset($block_attributes['isDiscounted']) && $block_attributes['isDiscounted'] !== 'na' ? $shortcode_params .= " isDiscounted='{$block_attributes['isDiscounted']}'" : false;
	$isGift =	isset($block_attributes['isGift']) && $block_attributes['isGift'] !== 'na' ? $shortcode_params .= " isGift='{$block_attributes['isGift']}'" : false;

	// Create Shortcode Output
	$shortcode = "[MM_Order_Decision{$shortcode_params}]";
	$shortcode .= '<div class="' . $default_class_name_main . '">' . $content . '</div>';
	$shortcode .= "[/MM_Order_Decision]";

	//write_log($shortcode, "Shortcode:");
	$output = do_shortcode($shortcode);

	return $output;
}


/**
 * Render Callback - Order SubDecision Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_order_subdecision_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/order-subdecision-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	// Get Shortcode attributes
	$shortcode_params = '';
	$membershipId = isset($block_attributes['membershipId']) && $block_attributes['membershipId'] !== '' ? $shortcode_params .= " membershipId='{$block_attributes['membershipId']}'" : false;
	$productId = isset($block_attributes['productId']) && $block_attributes['productId'] !== '' ? $shortcode_params .= " productId='{$block_attributes['productId']}'" : false;

	$isFree =	isset($block_attributes['isFree']) && $block_attributes['isFree'] !== 'na' ?  $shortcode_params .= " isFree='{$block_attributes['isFree']}'" : false;
	$isShippable = isset($block_attributes['isShippable']) && $block_attributes['isShippable'] !== 'na' ? $shortcode_params .= " isShippable='{$block_attributes['isShippable']}'" : false;
	$isDiscounted =	isset($block_attributes['isDiscounted']) && $block_attributes['isDiscounted'] !== 'na' ? $shortcode_params .= " isDiscounted='{$block_attributes['isDiscounted']}'" : false;
	$isGift =	isset($block_attributes['isGift']) && $block_attributes['isGift'] !== 'na' ? $shortcode_params .= " isGift='{$block_attributes['isGift']}'" : false;

	// Create Shortcode Output
	$shortcode = "[MM_Order_Subdecision{$shortcode_params}]";
	$shortcode .= '<div class="' . $default_class_name_main . '">' . $content . '</div>';
	$shortcode .= "[/MM_Order_Subdecision]";

	$output = do_shortcode($shortcode);

	return $output;
}

/**
 * Render Callback - Member Decision Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_member_decision_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/member-decision-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	// Get Shortcode attributes
	$shortcode_params = '';

	// True/Falses
	$isMember = isset($block_attributes['isMember']) && $block_attributes['isMember'] !== 'na' ? $shortcode_params .= " isMember='{$block_attributes['isMember']}'" : false;
	$isFree =	isset($block_attributes['isFree']) && $block_attributes['isFree'] !== 'na' ?  $shortcode_params .= " isFree='{$block_attributes['isFree']}'" : false;

	// Strings
	$membershipId = isset($block_attributes['membershipId']) && $block_attributes['membershipId'] !== '' ? $shortcode_params .= " membershipId='{$block_attributes['membershipId']}'" : false;
	$status = isset($block_attributes['status']) && $block_attributes['status'] !== '' ? $shortcode_params .= " status='{$block_attributes['status']}'" : false;
	$daysAsMember =	isset($block_attributes['daysAsMember']) && $block_attributes['daysAsMember'] !== '' ? $shortcode_params .= " daysAsMember='{$block_attributes['daysAsMember']}'" : false;
	$hasBundle =	isset($block_attributes['hasBundle']) && $block_attributes['hasBundle'] !== '' ? $shortcode_params .= " hasBundle='{$block_attributes['hasBundle']}'" : false;

	// Handle Days with Bundle ID
	if (!empty($block_attributes['daysWithBundleNumber']) && !empty($block_attributes['daysWithBundleId'])) {
		$shortcode_params .= " daysWithBundle_{$block_attributes['daysWithBundleId']}='{$block_attributes['daysWithBundleNumber']}'";
	}

	// Handle Custom Field ID
	if (!empty($block_attributes['customFieldValue']) && !empty($block_attributes['customFieldId'])) {
		$shortcode_params .= " customField_{$block_attributes['customFieldId']}='{$block_attributes['customFieldValue']}'";
	}

	// Create Shortcode Output
	$shortcode = "[MM_Member_Decision{$shortcode_params}]";
	$shortcode .= '<div class="' . $default_class_name_main . '">' . $content . '</div>';
	$shortcode .= "[/MM_Member_Decision]";

	$output = do_shortcode($shortcode);

	return $output;
}

/**
 * Render Callback - Forgot Password Block.
 * Handles front end output of Forgot Password Form based on data saved to attributes.
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_forgot_password_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/forgot-password-block');
	$button_style = "background: {$block_attributes['buttonBgColor']}; color: {$block_attributes['buttonTextColor']};";

	$mainClasses = $default_class_name . ' ' . $block_attributes['designTemplate'];
	if (isset($block_attributes['className'])) {
		$mainClasses .= ' ' . $block_attributes["className"];
	}

	// Create output
	$output = "<div class='$mainClasses'>";

	// Custom CSS
	if (isset($block_attributes['customCss'])) :
		$output .= "<style>{$block_attributes['customCss']}</style>";
	endif;

	// MM Shortcode
	$shortcode = "[MM_Form type='forgotPassword']
  <div class=\"mm-forgot-password\">
    [MM_Form_Message type='error']
    [MM_Form_Message type='success']
    <div class=\"form-group email-group\">
      <label for=\"email\">" . $block_attributes['usernameLabelText'] . "</label>
      [MM_Form_Field name='email' class='email-field mm-field' customAttributes=\"placeholder='" . $block_attributes['usernamePlaceholderText'] . "'\"]
    </div>
    <div class=\"form-group submit-group\">
    [MM_Form_Button type='submit' label='" . $block_attributes['buttonText'] . "' customAttributes=\"style='" . $button_style . "'\"]
    </div>
  </div>
  [/MM_Form]";

	$output .= do_shortcode($shortcode);

	$output .= '</div>';
	return $output;
}

/**
 * Render Callback - Reset Password Block.
 * Handles front end output of Reset Password Form based on data saved to attributes.
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_reset_password_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/reset-password-block');
	$button_style = "background: {$block_attributes['buttonBgColor']}; color: {$block_attributes['buttonTextColor']};";

	$mainClasses = $default_class_name . ' ' . $block_attributes['designTemplate'];
	if (isset($block_attributes['className'])) {
		$mainClasses .= ' ' . $block_attributes["className"];
	}

	// Create output
	$output = "<div class='$mainClasses'>";

	// Custom CSS
	if (isset($block_attributes['customCss'])) :
		$output .= "<style>{$block_attributes['customCss']}</style>";
	endif;

	// MM Shortcode
	$shortcode = "[MM_Member_Decision isMember='true']You are already logged in! Need to log out? You can do that <a href=\"[MM_CorePage_Link type='logout']\" title=\"Log out\">here</a>.[/MM_Member_Decision]

    [MM_Member_Decision isMember='false']
      [MM_Form type='resetPassword']
      <div class=\"mm-resetpassword\">
        [MM_Form_Message type='error']

        <div class=\"form-group password-group\">
          <label for=\"password\">" . $block_attributes['passwordLabelText'] . "</label>
          [MM_Form_Field name='password' class='password-field mm-field' customAttributes=\"placeholder='" . $block_attributes['passwordPlaceholderText'] . "'\"]
        </div>

        <div class=\"form-group password-confirm-group\">
          <label for=\"password-confirm\">" . $block_attributes['passwordConfirmLabelText'] . "</label>
          [MM_Form_Field name='password-confirm' class='password-confirm-field mm-field' customAttributes=\"placeholder='" . $block_attributes['passwordConfirmPlaceholderText'] . "'\"]
        </div>

        <div class=\"form-group submit-group\">
          [MM_Form_Button type='submit' label='" . $block_attributes['buttonText'] . "' customAttributes=\"style='" . $button_style . "'\"]
        </div>
      </div>
      [/MM_Form]
    [/MM_Member_Decision]";

	$output .= do_shortcode($shortcode);

	$output .= '</div>';
	return $output;
}

/**
 * Render Callback - Login Block.
 * Handles front end output of Login Form based on data saved to attributes.
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_login_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/login-block');
	$submit_class = $block_attributes['rememberMeChecked'] ? 'form-group submit-group' : 'form-group submit-group no-remember-me';
	$button_style = "background-color: {$block_attributes['buttonBgColor']}; color: {$block_attributes['buttonTextColor']};";
	$forgot_password_link = MM_CorePageEngine::getUrl(MM_CorePageType::$FORGOT_PASSWORD);

	$mainClasses = $default_class_name . ' ' . $block_attributes['designTemplate'];
	if (isset($block_attributes['className'])) {
		$mainClasses .= ' ' . $block_attributes["className"];
	}

	// Create output
	$output = "<div class='$mainClasses'>";

	// Custom CSS
	if (isset($block_attributes['customCss'])) :
		$output .= "<style>{$block_attributes['customCss']}</style>";
	endif;

	// MM Shortcode
	$shortcode = "[MM_Form type='login']
  [MM_Form_Message type='error'][MM_Form_Message type='success']
  <div class=\"form-group username-group\">
    <label for=\"log\">" . $block_attributes['usernameLabelText'] . "</label>
    [MM_Form_Field name='username' customAttributes=\"placeholder='" . $block_attributes['usernamePlaceholderText'] . "'\"]
  </div>
  <div class=\"form-group password-group\">
    <label for=\"pwd\">" . $block_attributes['passwordLabelText'] . "</label>
    [MM_Form_Field name='password' customAttributes=\"placeholder='" . $block_attributes['passwordPlaceholderText'] . "'\"]
  </div>";

	// Remember Me
	if ($block_attributes['rememberMeChecked']) :
		$shortcode .= "<div class=\"form-group remember-me-group\">[MM_Form_Field name='rememberMe' label='" . $block_attributes['rememberMeLabel'] . "' class='mm-remember-me-field']</div>";
	endif;

	$shortcode .= "<div class='" . $submit_class . "'>
    [MM_Form_Button type='login' label='" . $block_attributes['buttonText'] . "' customAttributes=\"style='" . $button_style . "'\"]
   </div>
  [/MM_Form]";

	$output .= do_shortcode($shortcode);

	// Forgot Password
	if ($block_attributes['forgotPasswordChecked']) :
		$output .= '<a href="' . $forgot_password_link . '" class="forgot-password-link">' . $block_attributes['forgotPasswordText'] . '</a>';
	endif;

	$output .= '</div>';
	return $output;
}


/**
 * Render Callback - Form Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_form_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/form-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	// Get Shortcode attributes
	$shortcode_params = '';
	$type = (isset($block_attributes['type']) && $block_attributes['type'] !== '') ? $shortcode_params .= " type='{$block_attributes['type']}'" : false;
	$membershipId = (isset($block_attributes['membershipId']) && $block_attributes['membershipId'] !== '' && $block_attributes['type'] === 'checkout') ? $shortcode_params .= " membershipId='{$block_attributes['membershipId']}'" : false;
	$productId = (isset($block_attributes['productId']) && $block_attributes['productId'] !== '' && $block_attributes['type'] === 'checkout') ? $shortcode_params .= " productId='{$block_attributes['productId']}'" : false;
	$oneclickPurchase = (isset($block_attributes['1clickPurchase']) && $block_attributes['1clickPurchase'] !== '') ? $shortcode_params .= " 1clickPurchase='{$block_attributes['1clickPurchase']}'" : false;
	$onSuccess = (isset($block_attributes['onSuccess']) && $block_attributes['onSuccess'] !== '') ? $shortcode_params .= " onSuccess='{$block_attributes['onSuccess']}'" : false;

	// Create Shortcode Output
	$shortcode = "[MM_Form{$shortcode_params}]";
	$shortcode .= '<div class="' . $default_class_name_main . '">' . $content . '</div>';
	$shortcode .= "[/MM_Form]";

	//write_log($shortcode, "Shortcode:");
	$output = do_shortcode($shortcode);

	return $output;
}

/**
 * Render Callback - Form Section Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_form_section_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/form-section-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	// Get Shortcode attributes
	$shortcode_params = '';
	$type = isset($block_attributes['type']) && $block_attributes['type'] !== '' ? $shortcode_params .= " type='{$block_attributes['type']}'" : false;

	// Form Parent Type
	$parentType = (isset($block_attributes['parentType']) && ($block_attributes['parentType'] !== '')) ? $shortcode_params .= " type='" . $block_attributes['parentType'] . "'" : false;

	// Create Shortcode Output
	$shortcode = "[MM_Form_Section{$shortcode_params}]";
	$shortcode .= '<div class="' . $default_class_name_main . '">' . $content . '</div>';
	$shortcode .= "[/MM_Form_Section]";

	//write_log($shortcode, "Shortcode:");
	$output = do_shortcode($shortcode);

	return $output;
	//return $shortcode;
}
/**
 * Render Callback - Form SubSection Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_form_subsection_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/form-subsection-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	// Get Shortcode attributes
	$shortcode_params = '';
	$type = isset($block_attributes['type']) && $block_attributes['type'] !== '' ? $shortcode_params .= " type='{$block_attributes['type']}'" : false;

	// Form Parent Type
	$parentType = (isset($block_attributes['parentType']) && ($block_attributes['parentType'] !== '')) ? $shortcode_params .= " type='" . $block_attributes['parentType'] . "'" : false;

	// Create Shortcode Output
	$shortcode = "[MM_Form_Subsection{$shortcode_params}]";
	$shortcode .= '<div class="' . $default_class_name_main . '">' . $content . '</div>';
	$shortcode .= "[/MM_Form_Subsection]";

	//write_log($shortcode, "Shortcode:");
	$output = do_shortcode($shortcode);

	return $output;
	//return $shortcode;
}

/**
 * Render Callback - Form Message Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_form_message_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/form-message-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	// Get Shortcode attributes
	$shortcode_params = '';
	$type = isset($block_attributes['type']) && $block_attributes['type'] !== '' ? $shortcode_params .= " type='{$block_attributes['type']}'" : false;

	// Create Shortcode Output
	$shortcode = do_shortcode("[MM_Form_Message{$shortcode_params}]");

	if ($shortcode !== '') {
		return "<div class='$default_class_name_main'><span class=\"$default_class_name-pre-text\">{$block_attributes['preText']}</span>$shortcode<span class=\"$default_class_name-post-text\">{$block_attributes['postText']}</span></div>";
	} else {
		return "<div class='$default_class_name'>$shortcode</div>";
	}
}

/**
 * Render Callback - Form Button Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_form_button_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/form-button-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	// Save Button Types that should output just the shortcode and not full button markup
	$button_type_names = ['all', 'login', 'submit'];
	$button_output = true;

	if (in_array($block_attributes['type'], $button_type_names)) {
		$button_output = false;
	}

	// Get Shortcode attributes
	$shortcode_params = '';

	// Form Parent Type
	$parentType = (isset($block_attributes['parentType']) && ($block_attributes['parentType'] !== '')) ? $shortcode_params .= " type='" . $block_attributes['parentType'] . "'" : false;

	// Rename submitCheckout to submit. Had to do this to differentiate between Checkout Submit and Other form submits.
	if ($parentType === 'checkout') {
		$paymentMethod = (isset($block_attributes['paymentMethod']) && ($block_attributes['paymentMethod'] !== '')) ? $shortcode_params .= " paymentMethod='" . $block_attributes['paymentMethod'] . "'" : false;
		$isDefault = (isset($block_attributes['isDefault']) && ($block_attributes['isDefault'] !== '')) ? $shortcode_params .= " isDefault='" . $block_attributes['isDefault'] . "'" : false;
		if ($block_attributes['type'] === 'submitCheckout') {
			$block_attributes['type'] = 'submit';
		}
	}
	$type = (isset($block_attributes['type']) && ($block_attributes['type'] !== '')) ? $shortcode_params .= " type='" . $block_attributes['type'] . "'" : false;

	$customAttributes = (isset($block_attributes['customAttributes']) && ($block_attributes['customAttributes'] !== '')) ? $shortcode_params .= " customAttributes='" . $block_attributes['customAttributes'] . "'" : false;

	if ($button_output) {
		// This will output <a href="[MM_Form_Button type='']">Text</a>
		$button_style = "background: {$block_attributes['buttonBgColor']}; color: {$block_attributes['buttonTextColor']};";

		// Create Shortcode Output
		$shortcode = do_shortcode('[MM_Form_Button' . $shortcode_params . ']');
		$output = '<a href="' . $shortcode . '" style="' . $button_style . '">' . $block_attributes['buttonText'] . '</a>';
	} else {
		// This will out put [MM_Form_Button type='']
		$label = (isset($block_attributes['label']) && ($block_attributes['label'] !== '')) ? $shortcode_params .= ' label="' . $block_attributes['label'] . '"' : false;
		$color = (isset($block_attributes['color']) && ($block_attributes['color'] !== '')) ? $shortcode_params .= ' color="' . $block_attributes['color'] . '"' : false;

		// Create Shortcode Output
		$output = do_shortcode('[MM_Form_Button' . $shortcode_params . ']');
	}

	return "<div class=" . $default_class_name_main . ">$output</div>";
}

/**
 * Render Callback - Form Data Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_form_data_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/form-data-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	if ($block_attributes['renderInline']) {
		$default_class_name_main .= ' render-inline';
	}

	// Get Shortcode attributes
	$shortcode_params = '';
	$name = isset($block_attributes['name']) && $block_attributes['name'] !== '' ? $shortcode_params .= " name='{$block_attributes['name']}'" : false;

	// Create Shortcode Output
	$shortcode = do_shortcode("[MM_Form_Data{$shortcode_params}]");

	if ($shortcode !== '') {
		return "<div class='$default_class_name_main'><span class=\"$default_class_name-pre-text\">{$block_attributes['preText']}</span>$shortcode<span class=\"$default_class_name-post-text\">{$block_attributes['postText']}</span></div>";
	} else {
		return "<div class='$default_class_name'>$shortcode</div>";
	}
}
/**
 * Render Callback - Form Field Block
 * Handles front end output
 *
 * @param array $block_attributes Data sent from Gutenberg
 * @param string $content Content included from Gutenberg
 *
 * @return string
 */
function mm_blocks_form_field_cb($block_attributes, $content) {
	$default_class_name = wp_get_block_default_classname('mm/form-field-block');
	$default_class_name_main = $default_class_name;
	if (isset($block_attributes['className'])) {
		$default_class_name_main = ' ' . $block_attributes["className"];
	}

	// Get Shortcode attributes
	$shortcode_params = '';
	$type = (isset($block_attributes['type']) && ($block_attributes['type'])) !== '' ? $shortcode_params .= " type='{$block_attributes['type']}'" : false;
	$name = (isset($block_attributes['name']) && ($block_attributes['name'])) !== '' ? $shortcode_params .= " name='{$block_attributes['name']}'" : false;
	$label = (isset($block_attributes['label']) && ($block_attributes['label'] !== '') && ($block_attributes['name'] === 'rememberMe')) ? $shortcode_params .= " label='{$block_attributes['label']}'" : false;
	$class = (isset($block_attributes['class']) && ($block_attributes['class'] !== '')) ? $shortcode_params .= " class='{$block_attributes['class']}'" : false;
	$value = (isset($block_attributes['value']) && ($block_attributes['value'] !== '') && ($block_attributes['type'] === 'hidden')) ? $shortcode_params .= " value='{$block_attributes['value']}'" : false;
	$style = (isset($block_attributes['style']) && ($block_attributes['style'] !== '') && ($block_attributes['name'] === 'captcha')) ? $shortcode_params .= " style='{$block_attributes['style']}'" : false;
	$customAttributes = (isset($block_attributes['customAttributes']) && ($block_attributes['customAttributes'] !== '')) ? $shortcode_params .= " customAttributes='{$block_attributes['customAttributes']}'" : false;
	$id = (isset($block_attributes['id']) && ($block_attributes['id'] !== '') && ($block_attributes['name'] === 'custom' || $block_attributes['name'] === 'custom-hidden')) ? $shortcode_params .= " id='{$block_attributes['id']}'" : false;
	$isRequired = (isset($block_attributes['isRequired']) && ($block_attributes['isRequired'] !== '')) ? $shortcode_params .= " isRequired='{$block_attributes['isRequired']}'" : false;
	$default = (isset($block_attributes['default']) && ($block_attributes['default'] !== '') && ($block_attributes['name'] === 'shippingMethod')) ? $shortcode_params .= " default='{$block_attributes['default']}'" : false;

	// Create Shortcode Output
	$shortcode = do_shortcode("[MM_Form_Field{$shortcode_params}]");

	if ($shortcode !== '') {
		return "<div class='$default_class_name_main'><span class=\"$default_class_name-pre-text\">{$block_attributes['preText']}</span>$shortcode<span class=\"$default_class_name-post-text\">{$block_attributes['postText']}</span></div>";
	} else {
		return "<div class='$default_class_name'>$shortcode</div>";
	}
}



/**
 * MemberMouse Block Patterns
 *
 * Make sure to escape the 'content' here: https://codebeautify.org/json-escape-unescape
 *
 * @return void
 */
function mm_block_patterns() {
	// Register Category Name
	register_block_pattern_category(
		'membermouse',
		array('label' => __('MemberMouse'))
	);

	// Order Confirmation
	register_block_pattern(
		'mm-patterns/order-confirmation',
		array(
			'title' => __('Order Confirmation Page'),
			'description' => __('Description text'),
			'content' => "<!-- wp:mm/member-data-block {\"preText\":\"Thank you for your order, \",\"postText\":\"!\"} /-->\n\n<!-- wp:paragraph -->\n<p><strong>Your login credentials are:</strong></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:mm/member-data-block {\"type\":\"username\",\"preText\":\"Username: \"} /-->\n\n<!-- wp:paragraph -->\n<p>Password: <em>Hidden for security purposes</em></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:mm/order-decision-block {\"isGift\":\"true\"} -->\n<!-- wp:spacer {\"height\":50} -->\n<div style=\"height:50px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer -->\n\n<!-- wp:paragraph -->\n<p>This item was purchased as a gift. The following link can be used to redeem the gift:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:mm/order-data-block {\"type\":\"giftLink\"} /-->\n<!-- /wp:mm/order-decision-block -->\n\n<!-- wp:spacer {\"height\":25} -->\n<div style=\"height:25px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer -->\n\n<!-- wp:paragraph -->\n<p><strong>Here are your order details:</strong></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:mm/member-data-block {\"preText\":\"First Name: \"} /-->\n\n<!-- wp:mm/member-data-block {\"type\":\"lastName\",\"preText\":\"Last Name: \"} /-->\n\n<!-- wp:mm/member-data-block {\"type\":\"email\",\"preText\":\"Email: \"} /-->\n\n<!-- wp:mm/order-decision-block {\"isFree\":\"false\"} -->\n<!-- wp:mm/order-data-block {\"type\":\"id\",\"preText\":\"Order ID: \"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"subtotal\",\"doFormat\":true,\"preText\":\"Subtotal: \"} /-->\n\n<!-- wp:mm/order-subdecision-block {\"isDiscounted\":\"true\"} -->\n<!-- wp:mm/order-data-block {\"type\":\"discount\",\"doFormat\":true,\"preText\":\"Discount: \"} /-->\n<!-- /wp:mm/order-subdecision-block -->\n\n<!-- wp:mm/order-subdecision-block {\"isShippable\":\"true\"} -->\n<!-- wp:mm/order-data-block {\"type\":\"shipping\",\"doFormat\":true,\"preText\":\"Shipping: \"} /-->\n<!-- /wp:mm/order-subdecision-block -->\n\n<!-- wp:mm/order-data-block {\"type\":\"total\",\"doFormat\":true,\"preText\":\"Order Total: \"} /-->\n\n<!-- wp:spacer {\"height\":33} -->\n<div style=\"height:33px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer -->\n\n<!-- wp:paragraph -->\n<p><strong>Billing Address:</strong></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:mm/order-data-block {\"type\":\"billingAddress\"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"billingCity\",\"postText\":\",\"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"billingState\"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"billingZipCode\"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"billingCountry\"} /-->\n<!-- /wp:mm/order-decision-block -->\n\n<!-- wp:mm/order-decision-block {\"isShippable\":\"true\"} -->\n<!-- wp:paragraph -->\n<p><strong>Shipping Address:</strong></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:mm/order-data-block {\"type\":\"shippingAddress\"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"shippingCity\"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"shippingState\"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"shippingZipCode\"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"shippingCountry\"} /-->\n\n<!-- wp:mm/order-data-block {\"type\":\"shippingMethod\",\"preText\":\"Shipping Method: \"} /-->\n<!-- /wp:mm/order-decision-block -->\n\n<!-- wp:mm/employee-data-block {\"preText\":\"If you have any questions concerning your order, feel free to contact us at \"} /-->",
			'categories' => array('membermouse')
		)
	);

	// My Account Page
	register_block_pattern(
		'mm-patterns/myaccount',
		array(
			'title' => __('My Account Page'),
			'description' => __('Description text'),
			'content' => "<!-- wp:mm/form-block -->\n<!-- wp:mm/form-message-block /-->\n\n<!-- wp:column {\"className\":\"mm-account-module mm-account-details-section\"} -->\n<div class=\"wp-block-column mm-account-module mm-account-details-section\"><!-- wp:heading -->\n<h2>Account Details</h2>\n<!-- /wp:heading -->\n\n<!-- wp:mm/form-button-block {\"type\":\"updateAccountDetails\",\"buttonBgColor\":\"#00d084\",\"buttonText\":\"Update\",\"className\":\"mm-gb-update-button\"} /-->\n\n<!-- wp:separator {\"color\":\"cyan-bluish-gray\",\"className\":\"is-style-wide\"} -->\n<hr class=\"wp-block-separator has-text-color has-background has-cyan-bluish-gray-background-color has-cyan-bluish-gray-color is-style-wide\"/>\n<!-- /wp:separator -->\n\n<!-- wp:mm/form-data-block {\"preText\":\"First Name: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"lastName\",\"preText\":\"Last Name: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"phone\",\"preText\":\"Phone: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"email\",\"preText\":\"Email: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"username\",\"preText\":\"Username: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"password\",\"preText\":\"Password: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"registrationDate\",\"preText\":\"Member Since: \"} /-->\n\n<!-- wp:mm/member-decision-block {\"status\":\"pending_cancel\"} -->\n<!-- wp:mm/member-data-block {\"type\":\"cancellationDate\",\"dateFormat\":\"M j, Y\",\"preText\":\"Account will cancel on \"} /-->\n<!-- /wp:mm/member-decision-block -->\n\n<!-- wp:mm/form-data-block {\"name\":\"membershipLevelName\",\"preText\":\"Membership Level: \"} /-->\n\n<!-- wp:mm/member-decision-block {\"status\":\"!pending_cancel\"} -->\n<!-- wp:mm/form-button-block {\"type\":\"cancelMembership\",\"buttonBgColor\":\"#ff6900\",\"buttonText\":\"Cancel\",\"className\":\"mm-gb-update-button\"} /-->\n\n<!-- wp:spacer {\"height\":14} -->\n<div style=\"height:14px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>\n<!-- /wp:spacer -->\n<!-- /wp:mm/member-decision-block -->\n\n<!-- wp:mm/form-data-block {\"name\":\"customFields\"} /-->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph --></div>\n<!-- /wp:column -->\n\n<!-- wp:column {\"className\":\"mm-account-module mm-billing-section\"} -->\n<div class=\"wp-block-column mm-account-module mm-billing-section\"><!-- wp:heading -->\n<h2>Billing Address</h2>\n<!-- /wp:heading -->\n\n<!-- wp:mm/form-button-block {\"type\":\"updateBillingInfo\",\"buttonBgColor\":\"#00d084\",\"buttonText\":\"Update\",\"className\":\"mm-gb-update-button\"} /-->\n\n<!-- wp:separator {\"color\":\"cyan-bluish-gray\",\"className\":\"is-style-wide\"} -->\n<hr class=\"wp-block-separator has-text-color has-background has-cyan-bluish-gray-background-color has-cyan-bluish-gray-color is-style-wide\"/>\n<!-- /wp:separator -->\n\n<!-- wp:mm/form-data-block {\"name\":\"billingAddress\",\"preText\":\"Billing Address: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"billingCity\",\"preText\":\"Billing City: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"billingState\",\"preText\":\"Billing State: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"billingZipCode\",\"preText\":\"Billing Zip Code: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"billingCountry\",\"preText\":\"Billing Country: \"} /--></div>\n<!-- /wp:column -->\n\n<!-- wp:column {\"className\":\"mm-account-module mm-shipping-section\"} -->\n<div class=\"wp-block-column mm-account-module mm-shipping-section\"><!-- wp:heading -->\n<h2>Shipping Address</h2>\n<!-- /wp:heading -->\n\n<!-- wp:mm/form-button-block {\"type\":\"updateShippingInfo\",\"buttonBgColor\":\"#00d084\",\"buttonText\":\"Update\",\"className\":\"mm-gb-update-button\"} /-->\n\n<!-- wp:separator {\"color\":\"cyan-bluish-gray\",\"className\":\"is-style-wide\"} -->\n<hr class=\"wp-block-separator has-text-color has-background has-cyan-bluish-gray-background-color has-cyan-bluish-gray-color is-style-wide\"/>\n<!-- /wp:separator -->\n\n<!-- wp:mm/form-data-block {\"name\":\"shippingAddress\",\"preText\":\"Shipping Address: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"shippingCity\",\"preText\":\"Shipping City: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"shippingState\",\"preText\":\"Shipping State: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"shippingZipCode\",\"preText\":\"Shipping Zip Code: \"} /-->\n\n<!-- wp:mm/form-data-block {\"name\":\"shippingCountry\",\"preText\":\"Shipping Country: \"} /--></div>\n<!-- /wp:column -->\n\n<!-- wp:column {\"className\":\"mm-account-module mm-subscription-info-history-section\"} -->\n<div class=\"wp-block-column mm-account-module mm-subscription-info-history-section\"><!-- wp:heading -->\n<h2>Subscriptions</h2>\n<!-- /wp:heading -->\n\n<!-- wp:separator {\"color\":\"cyan-bluish-gray\",\"className\":\"is-style-wide\"} -->\n<hr class=\"wp-block-separator has-text-color has-background has-cyan-bluish-gray-background-color has-cyan-bluish-gray-color is-style-wide\"/>\n<!-- /wp:separator -->\n\n<!-- wp:mm/form-data-block {\"name\":\"subscriptions\"} /-->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph --></div>\n<!-- /wp:column -->\n\n<!-- wp:column {\"className\":\"mm-account-module mm-order-history-section\"} -->\n<div class=\"wp-block-column mm-account-module mm-order-history-section\"><!-- wp:heading -->\n<h2>Order History</h2>\n<!-- /wp:heading -->\n\n<!-- wp:mm/form-button-block {\"type\":\"viewOrderHistory\",\"buttonBgColor\":\"#00d084\",\"buttonText\":\"View All\",\"className\":\"mm-gb-update-button\"} /-->\n\n<!-- wp:separator {\"color\":\"cyan-bluish-gray\",\"className\":\"is-style-wide\"} -->\n<hr class=\"wp-block-separator has-text-color has-background has-cyan-bluish-gray-background-color has-cyan-bluish-gray-color is-style-wide\"/>\n<!-- /wp:separator -->\n\n<!-- wp:mm/form-data-block {\"name\":\"orderHistory\"} /-->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph --></div>\n<!-- /wp:column -->\n\n<!-- wp:mm/form-section-block {\"type\":\"gifts\"} -->\n<!-- wp:heading -->\n<h2>Gifts Purchased (most recent gifts)</h2>\n<!-- /wp:heading -->\n\n<!-- wp:mm/form-button-block {\"type\":\"viewGiftHistory\",\"buttonBgColor\":\"#00d084\",\"buttonText\":\"View All\",\"className\":\"mm-gb-update-button\"} /-->\n\n<!-- wp:separator {\"color\":\"cyan-bluish-gray\",\"className\":\"is-style-wide\"} -->\n<hr class=\"wp-block-separator has-text-color has-background has-cyan-bluish-gray-background-color has-cyan-bluish-gray-color is-style-wide\"/>\n<!-- /wp:separator -->\n\n<!-- wp:mm/form-data-block {\"name\":\"gifts\"} /-->\n<!-- /wp:mm/form-section-block -->\n\n<!-- wp:mm/form-section-block {\"type\":\"socialLogin\"} -->\n<!-- wp:heading -->\n<h2>Social Networks</h2>\n<!-- /wp:heading -->\n\n<!-- wp:separator {\"color\":\"cyan-bluish-gray\",\"className\":\"is-style-wide\"} -->\n<hr class=\"wp-block-separator has-text-color has-background has-cyan-bluish-gray-background-color has-cyan-bluish-gray-color is-style-wide\"/>\n<!-- /wp:separator -->\n\n<!-- wp:mm/form-data-block {\"name\":\"socialLogin\"} /-->\n<!-- /wp:mm/form-section-block -->\n<!-- /wp:mm/form-block -->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph -->",
			'categories' => array('membermouse')
		)
	);
}
add_action('init', 'mm_block_patterns');

function my_plugin_block_categories($categories, $post) {
	if ($post->post_type !== 'post') {
		return $categories;
	}
	error_log($categories);
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'membermouse',
				'title' => __('Member Mouse', 'membermouse'),
			),
		)
	);
}
add_filter('block_categories', 'mm_plugin_block_categories', 10, 2);
