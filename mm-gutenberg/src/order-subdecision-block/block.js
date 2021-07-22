/**
 * BLOCK: Order SubDecision Block
 * NOTE: No editor.scss because subdecision will always be used within an order decision block. Inherits styles from order decision.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, getBlockDefaultClassName } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Panel, PanelRow, TextControl, ExternalLink, __experimentalText, Button, ButtonGroup } = wp.components;

/**
 * Register
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'mm/order-subdecision-block', {
	title: __( 'MM - Order Subdecision SmartTag' ),
	description: 'This tag behaves the same way as the [MM_Order_Decision] tag. It is used when you want to nest one decision within another.',
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
		__( 'MemberMouse - Order Subdecision SmartTag' ),
		__( 'membermouse' ),
		__( 'order' ),
		__( 'order subdecision' ),
		__( 'smarttag' ),
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
		const className = getBlockDefaultClassName( 'mm/order-subdecision-block' );
		const blockProps = useBlockProps();
		/*eslint-disable*/
		// TODO: Add other decision blocks into the array to remove it. need to convert filter to an array check https://stackoverflow.com/questions/58678070/how-to-exclude-parent-block-from-innerblocks
		const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map( block => block.name ).filter( blockName => blockName !== 'mm/order-subdecision-block' );
		/*eslint-enable*/

		/**
		 * Generate Smart TagLabel w/ Icon.
		 * @param {string} label Label
		 * @returns {array} Combined array of items
		 */
		function createLabel( label ) {
			const equationLink = <ExternalLink href="https://support.membermouse.com/support/solutions/articles/9000020219-smarttag-equations">Equations</ExternalLink>;
			const generatedlabel = [];
			generatedlabel.push( label + ' [' );
			generatedlabel.push( equationLink );
			generatedlabel.push( ']' );
			return ( generatedlabel );
		}

		return ( [
			/*eslint-disable*/
			<InspectorControls>
				<Panel>
					<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
						<ExternalLink className={ 'viewDocsLink' } href="https://support.membermouse.com/support/solutions/articles/9000020552-order-subdecision-smarttag-mm-order-subdecision-">View Documentation</ExternalLink>
						<__experimentalText className="mm-gb-subtitle" variant="body">Configure the settings below to indicate when the content in the block should be displayed.</__experimentalText>
						<TextControl
							label={ createLabel( "Membership ID" ) }
							value={ props.attributes.membershipId }
							onChange={ value => props.setAttributes( { membershipId: value } ) }
						/>
						<TextControl
							label={ createLabel( "Product ID" ) }
							value={ props.attributes.productId }
							onChange={ value => props.setAttributes( { productId: value } ) }
						/>

						<__experimentalText className="mm-gb-label" variant="body">Is Free</__experimentalText>
						<ButtonGroup>
							<Button
								key={ 'na' }
								isPressed={ props.attributes.isFree === 'na' ? true : false }
								isPrimary={ props.attributes.isFree === 'na' ? true : false }
								isSecondary={ props.attributes.isFree === 'na' ? false : true }
								onClick={ () => props.setAttributes( { isFree: 'na' } ) }
							>
								n/a
							</Button>
							<Button
								key={ 'true' }
								isPressed={ props.attributes.isFree === 'true' ? true : false }
								isPrimary={ props.attributes.isFree === 'true' ? true : false }
								isSecondary={ props.attributes.isFree === 'true' ? false : true }
								onClick={ () => props.setAttributes( { isFree: 'true' } ) }
							>
								True
							</Button>
							<Button
								key={ 'false' }
								isPressed={ props.attributes.isFree === 'false' ? true : false }
								isPrimary={ props.attributes.isFree === 'false' ? true : false }
								isSecondary={ props.attributes.isFree === 'false' ? false : true }
								isSecondary={ true }
								onClick={ () => props.setAttributes( { isFree: 'false' } ) }
							>
								False
							</Button>
						</ButtonGroup>

						<__experimentalText className="mm-gb-label" variant="body">Is Shippable</__experimentalText>
						<ButtonGroup>
							<Button
								key={ 'na' }
								isPressed={ props.attributes.isShippable === 'na' ? true : false }
								isPrimary={ props.attributes.isShippable === 'na' ? true : false }
								isSecondary={ props.attributes.isShippable === 'na' ? false : true }
								onClick={ () => props.setAttributes( { isShippable: 'na' } ) }
							>
								n/a
							</Button>
							<Button
								key={ 'true' }
								isPressed={ props.attributes.isShippable === 'true' ? true : false }
								isPrimary={ props.attributes.isShippable === 'true' ? true : false }
								isSecondary={ props.attributes.isShippable === 'true' ? false : true }
								onClick={ () => props.setAttributes( { isShippable: 'true' } ) }
							>
								True
							</Button>
							<Button
								key={ 'false' }
								isPressed={ props.attributes.isShippable === 'false' ? true : false }
								isPrimary={ props.attributes.isShippable === 'false' ? true : false }
								isSecondary={ props.attributes.isShippable === 'false' ? false : true }
								isSecondary={ true }
								onClick={ () => props.setAttributes( { isShippable: 'false' } ) }
							>
								False
							</Button>
						</ButtonGroup>

						<__experimentalText className="mm-gb-label" variant="body">Is Discounted</__experimentalText>
						<ButtonGroup>
							<Button
								key={ 'na' }
								isPressed={ props.attributes.isDiscounted === 'na' ? true : false }
								isPrimary={ props.attributes.isDiscounted === 'na' ? true : false }
								isSecondary={ props.attributes.isDiscounted === 'na' ? false : true }
								onClick={ () => props.setAttributes( { isDiscounted: 'na' } ) }
							>
								n/a
							</Button>
							<Button
								key={ 'true' }
								isPressed={ props.attributes.isDiscounted === 'true' ? true : false }
								isPrimary={ props.attributes.isDiscounted === 'true' ? true : false }
								isSecondary={ props.attributes.isDiscounted === 'true' ? false : true }
								onClick={ () => props.setAttributes( { isDiscounted: 'true' } ) }
							>
								True
							</Button>
							<Button
								key={ 'false' }
								isPressed={ props.attributes.isDiscounted === 'false' ? true : false }
								isPrimary={ props.attributes.isDiscounted === 'false' ? true : false }
								isSecondary={ props.attributes.isDiscounted === 'false' ? false : true }
								isSecondary={ true }
								onClick={ () => props.setAttributes( { isDiscounted: 'false' } ) }
							>
								False
							</Button>
						</ButtonGroup>

						<__experimentalText className="mm-gb-label" variant="body">Is Gift</__experimentalText>
						<ButtonGroup>
							<Button
								key={ 'na' }
								isPressed={ props.attributes.isGift === 'na' ? true : false }
								isPrimary={ props.attributes.isGift === 'na' ? true : false }
								isSecondary={ props.attributes.isGift === 'na' ? false : true }
								onClick={ () => props.setAttributes( { isGift: 'na' } ) }
							>
								n/a
							</Button>
							<Button
								key={ 'true' }
								isPressed={ props.attributes.isGift === 'true' ? true : false }
								isPrimary={ props.attributes.isGift === 'true' ? true : false }
								isSecondary={ props.attributes.isGift === 'true' ? false : true }
								onClick={ () => props.setAttributes( { isGift: 'true' } ) }
							>
								True
							</Button>
							<Button
								key={ 'false' }
								isPressed={ props.attributes.isGift === 'false' ? true : false }
								isPrimary={ props.attributes.isGift === 'false' ? true : false }
								isSecondary={ props.attributes.isGift === 'false' ? false : true }
								isSecondary={ true }
								onClick={ () => props.setAttributes( { isGift: 'false' } ) }
							>
								False
							</Button>
						</ButtonGroup>
					</PanelRow>
				</Panel>
			</InspectorControls>, <div { ...blockProps } className={ className } >
				<span className={ 'smartTag-badge subDecision' }><svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="196.000000pt" height="196.000000pt" viewBox="0 0 196.000000 196.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,196.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"><path d="M375 1655 c-73 -13 -200 -46 -247 -64 l-28 -11 0 -594 0 -594 23 -6
		c39 -11 270 -18 332 -9 l60 8 7 449 c6 344 11 452 20 458 22 15 141 3 172 -17
		59 -39 60 -43 67 -479 5 -269 11 -402 18 -409 13 -13 316 -16 374 -4 l37 8 -1
		377 c0 207 -3 409 -7 449 l-8 71 29 6 c93 19 183 -10 213 -66 15 -27 19 -71
		25 -258 4 -124 8 -305 8 -402 l1 -177 38 -8 c45 -10 327 -10 362 -1 l26 7 -4
		408 c-2 224 -7 438 -12 475 -18 141 -117 280 -243 339 -151 70 -369 78 -553
		19 l-101 -33 -65 26 c-112 45 -385 61 -543 32z" /></g></svg> Order Subdecision</span>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
			</div>
			/*eslint-enable*/
		]
		);
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
