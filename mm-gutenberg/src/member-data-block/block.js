/**
 * BLOCK: Member Data Block
 *
 */

import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, getBlockDefaultClassName } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.blockEditor;
const { Panel, PanelRow, SelectControl, ToggleControl, TextControl, ExternalLink, __experimentalText, __experimentalNumberControl } = wp.components;

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
registerBlockType( 'mm/member-data-block', {
	title: __( 'MM - Member Data SmartTag' ),
	description: 'This tag outputs data associated with the currently logged in member.',
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
		__( 'MemberMouse - Member Data SmartTag' ),
		__( 'membermouse' ),
		__( 'member' ),
		__( 'memberdata' ),
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
		const className = getBlockDefaultClassName( 'mm/member-data-block' );

		/**
		 * Generate Smart TagLabel w/ Icon.
		 * @param {string} label Label
		 * @returns {array} Combined array of items
		 */
		function createHelpHtml() {
			return <__experimentalText className="mm-gb-subtitle" variant="body">By default, dates will be output in the format: <code>Oct 14, 2013 12:14 pm</code>. If you want to use a custom date format, use this attribute to specify what format you want the date to be in. Use <a href="https://www.php.net/manual/en/datetime.format.php" target="_blank" rel="noreferrer">standard PHP date format</a> rules when defining a custom format.</__experimentalText>;
		}

		let smartTagOutput;
		if ( props.attributes.type === 'daysWithBundle_' || props.attributes.type === 'customField_' ) {
			smartTagOutput = '[MM_Member_Data name="' + props.attributes.type + props.attributes.smartTagExtraId + '"]';
		} else if ( ( props.attributes.type === 'registrationDate' || props.attributes.type === 'statusChangedDate' || props.attributes.type === 'expirationDate' || props.attributes.type === 'cancellationDate' ) && props.attributes.dateFormat ) {
			smartTagOutput = '[MM_Member_Data name="' + props.attributes.type + '" dateFormat="' + props.attributes.dateFormat + '"]';
		} else {
			smartTagOutput = '[MM_Member_Data name="' + props.attributes.type + '"]';
		}

		return ( [
			/*eslint-disable*/
			<InspectorControls>
				<Panel>
					<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
						<ExternalLink className={ 'viewDocsLink' } href="https://support.membermouse.com/support/solutions/articles/9000020526-mm-member-data-smarttag">View Documentation</ExternalLink>
						<SelectControl
							label={ 'Member Data Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Billing Address', value: 'billingAddress' },
								{ label: 'Billing City', value: 'billingCity' },
								{ label: 'Billing Country', value: 'billingCountry' },
								{ label: 'Billing State', value: 'billingState' },
								{ label: 'Billing Zip Code', value: 'billingZipCode' },
								{ label: 'Cancellation Date', value: 'cancellationDate' },
								{ label: 'Custom Field', value: 'customField_' },
								{ label: 'Days as Member', value: 'daysAsMember' },
								{ label: 'Days With Bundle', value: 'daysWithBundle_' },
								{ label: 'Email', value: 'email' },
								{ label: 'Expiration Date', value: 'expirationDate' },
								{ label: 'First Name', value: 'firstName' },
								{ label: 'ID', value: 'id' },
								{ label: 'Last Name', value: 'lastName' },
								{ label: 'Membership ID', value: 'membershipId' },
								{ label: 'Membership Name', value: 'membershipName' },
								{ label: 'Phone', value: 'phone' },
								{ label: 'Registration Date', value: 'registrationDate' },
								{ label: 'Shipping Address', value: 'shippingAddress' },
								{ label: 'Shipping City', value: 'shippingCity' },
								{ label: 'Shipping Country', value: 'shippingCountry' },
								{ label: 'Shipping State', value: 'shippingState' },
								{ label: 'Shipping Zip Code', value: 'shippingZipCode' },
								{ label: 'Status Changed Date', value: 'statusChangedDate' },
								{ label: 'Status ID', value: 'statusId' },
								{ label: 'Status Name', value: 'statusName' },
								{ label: 'Username', value: 'username' },
							] }
							onChange={ value => props.setAttributes( { type: value } ) }
						/>
						<TextControl
							label={ 'Date Format' }
							help={ createHelpHtml() }
							onChange={ value => props.setAttributes( { dateFormat: value } ) }
							value={ props.attributes.dateFormat }
							className={ props.attributes.type === "registrationDate" || props.attributes.type === "statusChangedDate" || props.attributes.type === "expirationDate" || props.attributes.type === "cancellationDate" ? 'enabled' : 'disabled' }
						/>
						<__experimentalNumberControl
							label={ 'Number Associated with SmartTag' }
							help={ props.attributes.type === 'daysWithBundle_#' ? 'Enter the Bundle ID' : 'Enter the Custom Field ID' }
							onChange={ value => props.setAttributes( { smartTagExtraId: value } ) }
							value={ props.attributes.smartTagExtraId }
							className={ props.attributes.type === "daysWithBundle_" || props.attributes.type === "customField_" ? 'enabled' : 'disabled' }
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
						<ToggleControl
							label={ 'Add New Line After' }
							help={ "If turned on, this will result in elements following this to appear on a new line. NOTE: This won't be reflected in the page editor." }
							checked={ props.attributes.renderInline }
							onChange={ bool => props.setAttributes( { renderInline: bool } ) }
						/>
					</PanelRow>
				</Panel>
			</InspectorControls>, <div className={ `${ className }` }>
				{ props.attributes.preText }{ smartTagOutput }{ props.attributes.postText }
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
		return null;
	},
} );
