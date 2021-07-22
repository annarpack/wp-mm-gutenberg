/**
 * BLOCK: Member Decision Block
 *
 */

import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, getBlockDefaultClassName } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Panel, PanelRow, TextControl, ExternalLink, __experimentalText, Button, ButtonGroup } = wp.components;

/**
 * Register
 *
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'mm/member-decision-block', {
	title: __( 'MM - Member Decision SmartTag' ),
	description: 'The MM_Member_Decision smarttag is used to show or hide content based on information associated with the currently logged in member. For example, you can use it to only show an advertisement to free members or to display messaging to members whose account is paused.',
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
		__( 'MemberMouse - Member Decision SmartTag' ),
		__( 'membermouse' ),
		__( 'member' ),
		__( 'member decision' ),
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
		const className = getBlockDefaultClassName( 'mm/member-decision-block' );
		const blockProps = useBlockProps();
		/*eslint-disable*/
		// TODO: Add other decision blocks into the array to remove it. need to convert filter to an array check https://stackoverflow.com/questions/58678070/how-to-exclude-parent-block-from-innerblocks
		const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map( block => block.name ).filter( blockName => blockName !== 'mm/member-decision-block' );
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
						<ExternalLink className={ 'viewDocsLink' } href="https://support.membermouse.com/support/solutions/articles/9000020532-member-decision-smarttag-mm-member-decision-">View Documentation</ExternalLink>
						<__experimentalText className="mm-gb-subtitle" variant="body">Configure the settings below to indicate when the content in the block should be displayed.</__experimentalText>
						<TextControl
							label={ createLabel( "Membership ID" ) }
							value={ props.attributes.membershipId }
							onChange={ value => props.setAttributes( { membershipId: value } ) }
						/>
						<TextControl
							label={ createLabel( "Status" ) }
							value={ props.attributes.status }
							onChange={ value => props.setAttributes( { status: value } ) }
						/>
						<TextControl
							label={ createLabel( "Days As Member" ) }
							value={ props.attributes.daysAsMember }
							onChange={ value => props.setAttributes( { daysAsMember: value } ) } mm-custom
						/>
						<TextControl
							label={ createLabel( "Has Bundle" ) }
							value={ props.attributes.hasBundle }
							onChange={ value => props.setAttributes( { hasBundle: value } ) }
						/>
						<TextControl
							label={ createLabel( "Purchased Product" ) }
							value={ props.attributes.purchasedProduct }
							onChange={ value => props.setAttributes( { purchasedProduct: value } ) }
						/>
					</PanelRow><PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col mm-custom' }>
						<TextControl
							label={ "Days with Bundle" }
							value={ props.attributes.daysWithBundleNumber }
							onChange={ value => props.setAttributes( { daysWithBundleNumber: value } ) }
							type={ 'number' }
						/>
						<TextControl
							label={ "Bundle ID" }
							value={ props.attributes.daysWithBundleId }
							onChange={ value => props.setAttributes( { daysWithBundleId: value } ) }
							type={ 'number' }
							className={ props.attributes.daysWithBundleNumber !== undefined && props.attributes.daysWithBundleNumber.length > 0 ? 'enabled' : 'disabled' }
						/>
					</PanelRow><PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col mm-custom' }>
						<TextControl
							label={ createLabel( "Custom Field Value" ) }
							value={ props.attributes.customFieldValue }
							onChange={ value => props.setAttributes( { customFieldValue: value } ) }
						/>
						<TextControl
							label={ "Custom Field ID" }
							value={ props.attributes.customFieldId }
							onChange={ value => props.setAttributes( { customFieldId: value } ) }
							type={ 'number' }
							className={ props.attributes.customFieldValue !== undefined && props.attributes.customFieldValue.length > 0 ? 'enabled' : 'disabled' }
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

						<__experimentalText className="mm-gb-label" variant="body">Is Member</__experimentalText>
						<ButtonGroup>
							<Button
								key={ 'na' }
								isPressed={ props.attributes.isMember === 'na' ? true : false }
								isPrimary={ props.attributes.isMember === 'na' ? true : false }
								isSecondary={ props.attributes.isMember === 'na' ? false : true }
								onClick={ () => props.setAttributes( { isMember: 'na' } ) }
							>
								n/a
							</Button>
							<Button
								key={ 'true' }
								isPressed={ props.attributes.isMember === 'true' ? true : false }
								isPrimary={ props.attributes.isMember === 'true' ? true : false }
								isSecondary={ props.attributes.isMember === 'true' ? false : true }
								onClick={ () => props.setAttributes( { isMember: 'true' } ) }
							>
								True
							</Button>
							<Button
								key={ 'false' }
								isPressed={ props.attributes.isMember === 'false' ? true : false }
								isPrimary={ props.attributes.isMember === 'false' ? true : false }
								isSecondary={ props.attributes.isMember === 'false' ? false : true }
								isSecondary={ true }
								onClick={ () => props.setAttributes( { isMember: 'false' } ) }
							>
								False
							</Button>
						</ButtonGroup>
					</PanelRow>
				</Panel>
			</InspectorControls>, <div { ...blockProps } className={ className } >
				<span className={ 'smartTag-badge decision' }><svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="196.000000pt" height="196.000000pt" viewBox="0 0 196.000000 196.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,196.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"><path d="M375 1655 c-73 -13 -200 -46 -247 -64 l-28 -11 0 -594 0 -594 23 -6
		c39 -11 270 -18 332 -9 l60 8 7 449 c6 344 11 452 20 458 22 15 141 3 172 -17
		59 -39 60 -43 67 -479 5 -269 11 -402 18 -409 13 -13 316 -16 374 -4 l37 8 -1
		377 c0 207 -3 409 -7 449 l-8 71 29 6 c93 19 183 -10 213 -66 15 -27 19 -71
		25 -258 4 -124 8 -305 8 -402 l1 -177 38 -8 c45 -10 327 -10 362 -1 l26 7 -4
		408 c-2 224 -7 438 -12 475 -18 141 -117 280 -243 339 -151 70 -369 78 -553
		19 l-101 -33 -65 26 c-112 45 -385 61 -543 32z" /></g></svg> Member Decision</span>
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
