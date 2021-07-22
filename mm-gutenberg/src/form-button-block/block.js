/**
* BLOCK: Form Button Block
*
*/

//  Import CSS.
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { InspectorControls, useBlockProps, PanelColorSettings } = wp.blockEditor;
const { Panel, PanelBody, PanelRow, SelectControl, CustomSelectControl, Text, TextControl, ToggleControl, ExternalLink } = wp.components;

/**
* Register Block Type
*
* @link https://wordpress.org/gutenberg/handbook/block-api/
* @param  {string}   name     Block name.
* @param  {Object}   settings Block settings.
* @return {?WPBlock}          The block, if it has been successfully
*                             registered; otherwise `undefined`.
*/

registerBlockType( 'mm/form-button-block', {
	title: __( 'MM - Form Button SmartTag' ),
	description: 'Insert Form Button SmartTag',
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
		const className = getBlockDefaultClassName( 'mm/form-button-block' );
		const blockProps = useBlockProps();

		const updateParentType = ( props ) => {
			const parentBlock = wp.data.select( 'core/block-editor' ).getBlockParents( props.clientId )[ 0 ];
			const parentForm = wp.data.select( 'core/block-editor' ).getBlock( parentBlock );
			props.setAttributes( { parentType: parentForm.attributes.type } );
			return parentForm.attributes.type
		}

		const updateSmartTag = ( props ) => {
			let value = props.attributes.type;
			props.setAttributes( { type: value } );
			let smartTagOutput = '[MM_Form_Button type=\'' + props.attributes.type + '\'';
			if ( props.attributes.parentType === 'checkout' ) {
				props.setAttributes( { type: 'submitCheckout' } );
				if ( props.attributes.paymentMethod !== '' ) {
					smartTagOutput = smartTagOutput + ' paymentMethod="' + props.attributes.paymentMethod + '"';
				}
				if ( props.attributes.isDefault === true || props.attributes.isDefault === false ) {
					smartTagOutput = smartTagOutput + ' isDefault="' + props.attributes.isDefault + '"';
				}
			} else if ( props.attributes.parentType === 'myaccount' ) {
				props.setAttributes( { type: 'updateAccount' } );
			} else if ( props.attributes.parentType === 'login' ) {
				props.setAttributes( { type: 'login' } );
			} else {
				props.setAttributes( { type: 'submit' } );
				if ( props.attributes.type === 'all' || props.attributes.type === 'login' ) {
					smartTagOutput = smartTagOutput + ' label="' + props.attributes.label + '" color="' + props.attributes.color + '"';
				} else if ( props.attributes.type === 'submit' && props.attributes.parentType === 'custom' ) {
					smartTagOutput = smartTagOutput + ' label="' + props.attributes.label + '" color="' + props.attributes.color + '"';
				}
			}
			smartTagOutput = smartTagOutput + ']';
			return smartTagOutput
		}

		updateParentType( props );
		let smartTagOutput = updateSmartTag( props );

		return ( [
			/*eslint-disable*/
			<InspectorControls>
				<Panel>
					<PanelBody className={ 'viewDocsLink' } initialOpen={ true }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col no-border' }>
							<ExternalLink className={ 'viewDocsLink' } href="https://support.membermouse.com/support/solutions/articles/9000020461-form-button-smarttag-mm-form-button-">View Documentation</ExternalLink>
						</PanelRow>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === 'checkout' ) } >
						<SelectControl label={ 'Form Button Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Submit ', value: 'submitCheckout' },
								{ label: 'Apply Coupon', value: 'applyCoupon' },
							] }
							onChange={ value => {
								props.setAttributes( { type: value } );
								smartTagOutput = updateSmartTag( props );
							} }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === 'myaccount' ) } >
						<SelectControl label={ 'Form Button Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Cancel Membership', value: 'cancelMembership' },
								{ label: 'Update Account Details', value: 'updateAccountDetails' },
								{ label: 'Update Billing Info', value: 'updateBillingInfo' },
								{ label: 'Update Shipping Info', value: 'updateShippingInfo' },
								{ label: 'View Order History', value: 'viewOrderHistory' },
								{ label: 'View Gift History', value: 'viewGiftHistory' },
								{ label: 'View Gifts', value: 'viewGifts' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ); smartTagOutput = updateSmartTag( props ); } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === 'login' ) } >
						<SelectControl label={ 'Form Button Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Login', value: 'login' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ); smartTagOutput = updateSmartTag( props ); } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === 'forgotpassword' ) } >
						<SelectControl label={ 'Form Button Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Submit ', value: 'submit' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ); smartTagOutput = updateSmartTag( props ); } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === 'resetpassword' ) } >
						<SelectControl label={ 'Form Button Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Submit ', value: 'submit' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ); smartTagOutput = updateSmartTag( props ); } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === '1clickpurchase' ) } >
						<SelectControl label={ 'Form Button Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Apply Coupon', value: 'applyCoupon' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ); smartTagOutput = updateSmartTag( props ); } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === 'custom' ) } >
						<SelectControl label={ 'Form Button Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Submit ', value: 'submit' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ); smartTagOutput = updateSmartTag( props ); } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === '' ) } >
						<SelectControl label={ 'Form Button Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Submit ', value: 'submit' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ) } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
							<TextControl
								label={ 'Parent Form' }
								value={ props.attributes.parentType }
								onChange={ value => {
									let parentType = updateParentType( props );
									props.setAttributes( { parentType: parentType } );
									smartTagOutput = updateSmartTag( props );
								} }
								className={ 'parent-type' }
							/>
							<TextControl
								label={ 'SmartTag Preview' }
								value={ smartTagOutput }
								className={ 'smarttag-preview-input' }
								onChange={ value => {
									let parentType = updateParentType( props );
									props.setAttributes( { parentType: parentType } );
									smartTagOutput = updateSmartTag( props );
								} }
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( ( props.attributes.type !== 'all' ) && ( props.attributes.type !== 'login' ) && ( props.attributes.type !== 'submit' ) ) ? true : false }>
						<TextControl
							label={ 'Button Text' }
							value={ props.attributes.buttonText }
							onChange={ ( value ) => { props.setAttributes( { buttonText: value } ); smartTagOutput = updateSmartTag( props ); } }
						/>
						<PanelColorSettings
							title={ __( 'Button Color Settings' ) }
							colorSettings={ [
								{
									value: props.attributes.buttonBgColor,
									onChange: color => props.setAttributes( { buttonBgColor: color } ),
									label: __( 'Background Color' ),
								},
								{
									value: props.attributes.buttonTextColor,
									onChange: color => props.setAttributes( { buttonTextColor: color } ),
									label: __( 'Text Color' ),
									colors: [
										{
											name: 'white',
											color: '#fff',
										},
										{
											name: 'black',
											color: '#222',
										},
									],
								},
							] }
						/>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( ( props.attributes.type === 'all' ) || ( props.attributes.type === 'login' ) || ( props.attributes.type === 'submit' ) ) ? true : false }>
						<TextControl
							label={ 'Button Text' }
							value={ props.attributes.label }
							onChange={ text => props.setAttributes( { label: text } ) }
						/>
						<SelectControl
							label={ 'Button Color' }
							value={ props.attributes.color }
							options={ [
								{ label: 'Black', value: 'black' },
								{ label: 'Blue', value: 'blue' },
								{ label: 'Green', value: 'green' },
								{ label: 'Grey', value: 'grey' },
								{ label: 'Light Blue', value: 'light_blue' },
								{ label: 'Orange', value: 'orange' },
								{ label: 'Pink', value: 'pink' },
								{ label: 'Purple', value: 'purple' },
								{ label: 'Red', value: 'red' },
								{ label: 'Yellow', value: 'yellow' },
							] }
							onChange={ value => props.setAttributes( { color: value } ) }
						/>
					</PanelBody>
					<PanelBody opened={ props.attributes.type === 'submitCheckout' ? true : false }>
						<ToggleControl
							label={ 'Is Default?' }
							checked={ props.attributes.isDefault }
							onChange={ ( checked ) => props.setAttributes( { isDefault: checked } ) }
						></ToggleControl>
						<TextControl
							label={ 'Payment Method' }
							value={ props.attributes.paymentMethod }
							onChange={ ( value ) => props.setAttributes( { paymentMethod: value } ) }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>,
			<div { ...blockProps } className={ `${ className }` }>
				{ props.attributes.preText }{ updateSmartTag( props ) }{ props.attributes.postText }
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
