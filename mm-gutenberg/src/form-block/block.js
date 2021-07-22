/**
* BLOCK: Form Block
*
*/

import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Panel, PanelBody, PanelRow, SelectControl, TextControl, ExternalLink, __experimentalNumberControl } = wp.components;

/**
* Register Block Type
*
* @link https://wordpress.org/gutenberg/handbook/block-api/
* @param  {string}   name     Block name.
* @param  {Object}   settings Block settings.
* @return {?WPBlock}          The block, if it has been successfully
*                             registered; otherwise `undefined`.
*/

registerBlockType( 'mm/form-block', {
	title: __( 'MM - Form Block SmartTag' ),
	description: 'Form Block SmartTag',
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
		const className = getBlockDefaultClassName( 'mm/form-block' );
		const blockProps = useBlockProps();

		/*eslint-disable*/
		// TODO: Add other decision blocks into the array to remove it. need to convert filter to an array check https://stackoverflow.com/questions/58678070/how-to-exclude-parent-block-from-innerblocks
		const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map( block => block.name ).filter( blockName => blockName !== 'mm/form-block' );
		/*eslint-enable*/

		let smartTagOutput;
		if ( props.attributes.type === 'checkout' ) {
			smartTagOutput = '[MM_Form type="' + props.attributes.type + '" membershipLevelId="' + props.attributes.membershipLevelId + '"  productId="' + props.attributes.productId + '" ]';
		} else if ( props.attributes.type === 'custom' ) {
			smartTagOutput = '[MM_Form type="' + props.attributes.type + '" onSuccess="' + props.attributes.onSuccess + '" ]';
		} else if ( props.attributes.type === 'myaccount' || props.attributes.type === 'login' || props.attributes.type === 'forgotpassword' ) {
			smartTagOutput = '[MM_Form type="' + props.attributes.type + '"]';
		} else {
			smartTagOutput = '[MM_Form ]';
		}

		return ( [
			/*eslint-disable*/
			<InspectorControls>
				<Panel>
					<PanelBody title={ 'Form Settings' } initialOpen={ true }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
							<ExternalLink className={ 'viewDocsLink' } href="https://support.membermouse.com/support/solutions/articles/9000020446-form-smarttag-mm-form-">View Documentation</ExternalLink>
							<SelectControl
								label={ 'Form Type' }
								value={ props.attributes.type }
								options={ [
									{ label: 'Checkout', value: 'checkout' },
									{ label: 'Custom', value: 'custom' },
									{ label: 'Login', value: 'login' },
									{ label: 'Forgot Password', value: 'forgotpassword' },
									{ label: 'My Account', value: 'myaccount' },
									{ label: '1 Click Purchase', value: '1clickPurchase' },
								] }
								onChange={ ( value ) => props.setAttributes( { type: value } ) }
							/>
							<TextControl
								label={ 'SmartTag Preview' }
								value={ smartTagOutput }
								className={ 'smarttag-preview-input' }
								onChange={ () => {} }
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody initialOpen={ false } className={ 'mm-gb-panel-body mm-gb-flex-col .mm-gb-checkout-panel' }
						opened={ props.attributes.type === 'checkout' ? true : false }
					>
						<__experimentalNumberControl
							label={ 'Membership Level ID' }
							help={ 'Takes a number that is associated with the member account to retrieve data for. If no ID is passed, the default member account will be used.' }
							value={ props.attributes.membershipLevelId }
							hideHTMLArrows={ true }
							isDragEnabled={ false }
							isShiftStepEnabled={ false }
							onChange={ value => props.setAttributes( { membershipLevelId: value } ) }
							type={ "number" }
						/>
						<__experimentalNumberControl
							label={ 'Product ID' }
							value={ props.attributes.productId }
							hideHTMLArrows={ true }
							isDragEnabled={ false }
							isShiftStepEnabled={ false }
							onChange={ value => props.setAttributes( { productId: value } ) }
							type={ "number" }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>,
			<div { ...blockProps } className={ `${ className }` }>
				<span className={ 'smartTag-badge form' }><svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="196.000000pt" height="196.000000pt" viewBox="0 0 196.000000 196.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,196.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"><path d="M375 1655 c-73 -13 -200 -46 -247 -64 l-28 -11 0 -594 0 -594 23 -6
		c39 -11 270 -18 332 -9 l60 8 7 449 c6 344 11 452 20 458 22 15 141 3 172 -17
		59 -39 60 -43 67 -479 5 -269 11 -402 18 -409 13 -13 316 -16 374 -4 l37 8 -1
		377 c0 207 -3 409 -7 449 l-8 71 29 6 c93 19 183 -10 213 -66 15 -27 19 -71
		25 -258 4 -124 8 -305 8 -402 l1 -177 38 -8 c45 -10 327 -10 362 -1 l26 7 -4
		408 c-2 224 -7 438 -12 475 -18 141 -117 280 -243 339 -151 70 -369 78 -553
		19 l-101 -33 -65 26 c-112 45 -385 61 -543 32z" /></g></svg> Form </span>

				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
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
		return <InnerBlocks.Content />;
	},

} );

