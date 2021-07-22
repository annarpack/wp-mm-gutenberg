/**
* BLOCK: Form Field Block
*
*/
const { __ } = wp.i18n;
const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { Panel, PanelBody, PanelRow, SelectControl, TextControl, ExternalLink, ToggleControl } = wp.components;

/**
* Register Block Type
*
* @link https://wordpress.org/gutenberg/handbook/block-api/
* @param  {string}   name     Block name.
* @param  {Object}   settings Block settings.
* @return {?WPBlock}          The block, if it has been successfully
*                             registered; otherwise `undefined`.
*/

registerBlockType( 'mm/form-field-block', {
	title: __( 'MM - Form Field SmartTag' ),
	description: 'Insert Form Field SmartTag',
	icon: {
		src: <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="196.000000pt" height="196.000000pt" viewBox="0 0 196.000000 196.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,196.000000) scale(0.100000,-0.100000)" fill="#1f8ded" stroke="none"><path d="M375 1655 c-73 -13 -200 -46 -247 -64 l-28 -11 0 -594 0 -594 23 -6
    c39 -11 270 -18 332 -9 l60 8 7 449 c6 344 11 452 20 458 22 15 141 3 172 -17
    59 -39 60 -43 67 -479 5 -269 11 -402 18 -409 13 -13 316 -16 374 -4 l37 8 -1
    377 c0 207 -3 409 -7 449 l-8 71 29 6 c93 19 183 -10 213 -66 15 -27 19 -71
    25 -258 4 -124 8 -305 8 -402 l1 -177 38 -8 c45 -10 327 -10 362 -1 l26 7 -4
    408 c-2 224 -7 438 -12 475 -18 141 -117 280 -243 339 -151 70 -369 78 -553
    19 l-101 -33 -65 26 c-112 45 -385 61 -543 32z" /></g></svg>,
	},
	category: 'common',
	keywords: [
		__( 'forms' ),
		__( 'membermouse' ),
	],
	supports: {
		html: false,
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		const className = getBlockDefaultClassName( 'mm/form-field-block' );
		const blockProps = useBlockProps();

		let smartTagOutput = '[MM_Form_Field  type="' + props.attributes.type + '"';
		if ( props.attributes.type === 'input' ) {
			smartTagOutput = smartTagOutput + ' name="' + props.attributes.name + '"';
		} else if ( props.attributes.type === 'hidden' ) {
			smartTagOutput = smartTagOutput + ' name="' + props.attributes.name + '" value="' + props.attributes.value + '"';
		} else if ( props.attributes.type === 'custom' ) {
			smartTagOutput = smartTagOutput + ' id="' + props.attributes.id + '"';
		} else if ( props.attributes.type === 'custom-hidden' ) {
			smartTagOutput = smartTagOutput + ' id="' + props.attributes.id + '"';
		}
		if ( props.attributes.class !== '' ) {
			smartTagOutput = smartTagOutput + ' class="' + props.attributes.class + '"';
		}
		if ( props.attributes.customAttributes !== '' ) {
			smartTagOutput = smartTagOutput + ' customAttributes="' + props.attributes.customAttributes + '"';
		}
		if ( props.attributes.isRequired === true || props.attributes.isRequired === false ) {
			smartTagOutput = smartTagOutput + ' isRequired="' + props.attributes.isRequired + '"';
		}
		if ( props.attributes.name === 'rememberMe' ) {
			smartTagOutput = smartTagOutput + ' label="' + props.attributes.label + '" ';
		} else if ( props.attributes.name === 'shippingMethod' ) {
			smartTagOutput = smartTagOutput + ' default="' + props.attributes.default + '"';
		} else if ( props.attributes.name === 'captcha' ) {
			smartTagOutput = smartTagOutput + ' style="' + props.attributes.style + '"';
		}
		smartTagOutput = smartTagOutput + ']';

		return ( [
			/*eslint-disable*/
			<InspectorControls>
				<Panel>
					<PanelBody initialOpen={ true }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
							<ExternalLink className={ 'viewDocsLink' } href="https://support.membermouse.com/support/solutions/articles/9000020490-form-field-smarttag-mm-form-field-">View Documentation</ExternalLink>
							<SelectControl
								label={ 'Form Field Type' }
								value={ props.attributes.type }
								options={ [
									{ label: 'Custom', value: 'custom' },
									{ label: 'Custom Hidden', value: 'custom-hidden' },
									{ label: 'Input', value: 'input' },
									{ label: 'Hidden', value: 'hidden' },
								] }
								onChange={ value => props.setAttributes( { type: value } ) }
							/>
							<SelectControl
								label={ 'Form Field Name' }
								value={ props.attributes.name }
								options={ [
									{ label: 'Billing Address', value: 'billingAddress' },
									{ label: 'Billing City', value: 'billingCity' },
									{ label: 'Billing Country', value: 'billingCountry' },
									{ label: 'Billing State', value: 'billingState' },
									{ label: 'Billing Zip Code', value: 'billingZipCode' },
									{ label: 'Captcha', value: 'captcha' },
									{ label: 'Coupon Code', value: 'couponCode' },
									{ label: 'Credit Card ExpirationDate', value: 'ccExpirationDate' },
									{ label: 'Credit Card Number', value: 'ccNumber' },
									{ label: 'Credit Card SecurityCode', value: 'ccSecurityCode' },
									{ label: 'Email', value: 'email' },
									{ label: 'Email Confirmation', value: 'email-confirm' },
									{ label: 'First Name', value: 'firstName' },
									{ label: 'Gift', value: 'gift' },
									{ label: 'Last Name', value: 'lastName' },
									{ label: 'Password', value: 'password' },
									{ label: 'Password Confirm', value: 'password-confirm' },
									{ label: 'Phone', value: 'phone' },
									{ label: 'Remember Me', value: 'rememberMe' },
									{ label: 'Shipping Address', value: 'shippingAddress' },
									{ label: 'Shipping City', value: 'shippingCity' },
									{ label: 'Shipping Country', value: 'shippingCountry' },
									{ label: 'Shipping Method', value: 'shippingMethod' },
									{ label: 'Shipping Same As Billing', value: 'shippingSameAsBilling' },
									{ label: 'Shipping State', value: 'shippingState' },
									{ label: 'Shipping Zip Code', value: 'shippingZipCode' },
									{ label: 'Username', value: 'username' },
								] }
								onChange={ value => props.setAttributes( { name: value } ) }
							/>
							<TextControl
								label={ 'SmartTag Preview' }
								value={ smartTagOutput }
								className={ 'smarttag-preview-input' }
								onChange={ () => {} }
							/>
							<TextControl
								label={ 'Text Before' }
								value={ props.attributes.preText }
								onChange={ value => props.setAttributes( { preText: value } ) }
							/>
							<TextControl
								label={ 'Text After' }
								value={ props.attributes.postText }
								onChange={ value => props.setAttributes( { postText: value } ) }
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ props.attributes.type === 'input' ? true : false }>
						<TextControl
							label={ 'Class' }
							value={ props.attributes.class }
							onChange={ value => props.setAttributes( { class: value } ) }
						/>
						<TextControl
							label={ 'Custom Attributes' }
							value={ props.attributes.customAttributes }
							onChange={ value => props.setAttributes( { customAttributes: value } ) }
						/>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.type === 'input' && (
						props.attributes.name === 'firstName' || props.attributes.name === 'lastName' || props.attributes.name === 'phone' || props.attributes.name === 'password' || props.attributes.name === 'billingAddress' || props.attributes.name === 'billingCity' || props.attributes.name === 'billingState' || props.attributes.name === 'billingZipCode' || props.attributes.name === 'billingCountry' || props.attributes.name === 'shippingAddress' || props.attributes.name === 'shippingCity' || props.attributes.name === 'shippingState' || props.attributes.name === 'shippingZipCode' || props.attributes.name === 'shippingCountry'
					) ) ? true : false }>
						<ToggleControl
							label={ 'Is Required?' }
							checked={ props.attributes.isRequired }
							onChange={ ( checked ) => props.setAttributes( { isRequired: checked } ) }
						></ToggleControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ props.attributes.type === 'hidden' ? true : false }>
						<TextControl
							label={ 'Value' }
							value={ props.attributes.value }
							onChange={ value => props.setAttributes( { value: value } ) }
						/>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ props.attributes.name === 'captcha' ? true : false }>
						<SelectControl
							label={ 'Captcha Style' }
							value={ props.attributes.style }
							options={ [
								{ label: 'Backglass', value: 'backglass' },
								{ label: 'Clean', value: 'clean' },
								{ label: 'Red', value: 'red' },
								{ label: 'White', value: 'white' },
							] }
							onChange={ value => props.setAttributes( { style: value } ) }
						/>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ props.attributes.name === 'shippingMethod' ? true : false }>
						<TextControl
							label={ 'Default' }
							value={ props.attributes.default }
							onChange={ value => props.setAttributes( { default: value } ) }
						/>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.type === 'custom' || props.attributes.type === 'custom-hidden' ) ? true : false }>
						<TextControl
							label={ 'ID' }
							value={ props.attributes.id }
							onChange={ value => props.setAttributes( { id: value } ) }
						/>
						<ToggleControl
							label={ 'Is Required?' }
							checked={ props.attributes.isRequired }
							onChange={ ( checked ) => props.setAttributes( { isRequired: checked } ) }
						>
						</ToggleControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ props.attributes.name === 'rememberMe' ? true : false }>
						<TextControl
							label={ 'Label' }
							value={ props.attributes.label }
							onChange={ value => props.setAttributes( { label: value } ) }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>,
			<div { ...blockProps } className={ `${ className }` }>
				{ props.attributes.preText }{ smartTagOutput }{ props.attributes.postText }
			</div >
			/*eslint-enable*/
		] );
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * Return Null for server side rendering
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param { Object } props Props.
	 * @returns { Mixed } JSX Frontend HTML.
	 */
	save: () => {
		return null;
	},

} );
