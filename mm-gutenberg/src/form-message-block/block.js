/**
* BLOCK: Form Message Block
*
*/
const { __ } = wp.i18n;
const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { Panel, PanelRow, SelectControl, TextControl, ExternalLink } = wp.components;

/**
* Register Block Type
*
* @link https://wordpress.org/gutenberg/handbook/block-api/
* @param  {string}   name     Block name.
* @param  {Object}   settings Block settings.
* @return {?WPBlock}          The block, if it has been successfully
*                             registered; otherwise `undefined`.
*/
//MM_FORM type="myaccount"

registerBlockType( 'mm/form-message-block', {
	title: __( 'MM - Form Message SmartTag' ),
	description: 'Insert Form Message',
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
		const className = getBlockDefaultClassName( 'mm/form-message-block' );
		const blockProps = useBlockProps();

		let smartTagOutput;
		if ( props.attributes.type === 'applyCoupon' ) {
			smartTagOutput = '<a href="[MM_Form_Message type=' + props.attributes.type + ']">Apply Coupon</a>';
		} else {
			smartTagOutput = '[MM_Form_Message type="' + props.attributes.type + '"]';
		}

		return ( [
			/*eslint-disable*/
			<InspectorControls>
				<Panel>
					<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
						<ExternalLink className={ 'viewDocsLink' } href="https://support.membermouse.com/support/solutions/articles/9000020490-form-message-smarttag-mm-form-message-">View Documentation</ExternalLink>
						<SelectControl
							label={ 'Form Message' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Coupon Error', value: 'couponerror' },
								{ label: 'Coupon Success', value: 'couponSuccess' },
								{ label: 'Error', value: 'error' },
								{ label: 'Success', value: 'success' },
							] }
							onChange={ value => props.setAttributes( { type: value } ) }
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
