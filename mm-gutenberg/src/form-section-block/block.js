/**
* BLOCK: Form Section Block
*
*/
//  Import CSS.
import './editor.scss';
//import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Panel, PanelBody, PanelRow, SelectControl, TextControl, ExternalLink } = wp.components;

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

registerBlockType( 'mm/form-section-block', {
	title: __( 'MM - Form Section Block SmartTag' ),
	description: 'Insert Form Section SmartTag',
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
		const className = getBlockDefaultClassName( 'mm/form-section-block' );
		const blockProps = useBlockProps();

		/*eslint-disable*/
		// TODO: Add other decision blocks into the array to remove it. need to convert filter to an array check https://stackoverflow.com/questions/58678070/how-to-exclude-parent-block-from-innerblocks
		const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map( block => block.name ).filter( blockName => blockName !== 'mm/form-section-block' );
		/*eslint-enable*/

		const updateParentType = ( props ) => {
			if ( props.clientId !== null ) {
				let parentBlock = wp.data.select( 'core/block-editor' ).getBlockParents( props.clientId )[ 0 ];
				console.log( parentBlock );
				if ( parentBlock !== null ) {
					let parentForm = wp.data.select( 'core/block-editor' ).getBlock( parentBlock );
					console.log( parentForm );
					if ( parentForm.attributes !== null ) {
						props.setAttributes( { parentType: parentForm.attributes.type } );
						console.log( parentForm.attributes.type ); parentForm.attributes.type
						return parentForm.attributes.type
					}
				}
			}
		}

		const updateSmartTag = ( props ) => {
			updateParentType( props );
			if ( props.attributes.parentType === 'checkout' ) {
				props.setAttributes( { type: 'accountInfo' } );
			} else if ( props.attributes.parentType === 'myaccount' ) {
				props.setAttributes( { type: 'gifts' } );
			} else if ( props.attributes.parentType === '1clickpurchase' ) {
				props.setAttributes( { type: 'shippingInfo' } );
			}
			let smartTagOutput = '[MM_Form_Section type=\'' + props.attributes.type + '\'';
			smartTagOutput = smartTagOutput + ']';
			return smartTagOutput
		}

		let smartTagOutput = updateSmartTag( props );

		return ( [
			/*eslint-disable*/
			<InspectorControls>
				<Panel>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === 'checkout' ) } >
						<ExternalLink className={ 'viewDocsLink' } href="https://support.membermouse.com/support/solutions/articles/9000020510-form-section-smarttag-mm-form-section-">View Documentation</ExternalLink>
						<SelectControl label={ 'Form Section Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Account Info', value: 'accountInfo' },
								{ label: 'Billing Info', value: 'billingInfo' },
								{ label: 'Shipping Info', value: 'shippingInfo' },
								{ label: 'Shipping Address', value: 'shippingAddress' },
								{ label: 'Coupon', value: 'coupon' },
								{ label: 'Gift Info', value: 'giftInfo' },
							] }
							onChange={ value => {
								props.setAttributes( { type: value } );
								smartTagOutput = updateSmartTag( props );
							} }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === 'myaccount' ) } >
						<SelectControl label={ 'Form Section Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Gifts', value: 'gifts' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ); smartTagOutput = updateSmartTag( props ); } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === '1clickpurchase' ) } >
						<SelectControl label={ 'Form Section Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Shipping Info', value: 'shippingInfo' },
								{ label: 'Coupon', value: 'coupon' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ); smartTagOutput = updateSmartTag( props ); } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true } opened={ ( props.attributes.parentType === '' || props.attributes.parentType === 'custom' || props.attributes.parentType === 'login' || props.attributes.parentType === 'forgotpassword' || props.attributes.parentType === 'resetpassword' ) } >
						<SelectControl label={ 'Form Section Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'None', value: 'na' },
							] }
							onChange={ value => { props.setAttributes( { type: value } ) } }>
						</SelectControl>
					</PanelBody>
					<PanelBody initialOpen={ true }>
						<TextControl
							value={ updateParentType( props ) }
							onChange={ ( value ) => props.setAttributes( { parentType: value } ) }
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
		19 l-101 -33 -65 26 c-112 45 -385 61 -543 32z" /></g></svg> Form Section </span>

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

