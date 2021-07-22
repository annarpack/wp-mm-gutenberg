/**
 * BLOCK: Employee Data Block
 *
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, getBlockDefaultClassName } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.blockEditor;
const { Panel, PanelRow, SelectControl, TextControl, ExternalLink, __experimentalNumberControl } = wp.components;

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
registerBlockType( 'mm/employee-data-block', {
	title: __( 'MM - Employee Data SmartTag' ),
	description: 'This tag outputs data associated with the employee account associated with the ID passed.',
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
		__( 'MemberMouse - Employee Data SmartTag' ),
		__( 'membermouse' ),
		__( 'employee' ),
		__( 'employeedata' ),
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
		const className = getBlockDefaultClassName( 'mm/employee-data-block' );
		return ( [
			/*eslint-disable*/
			<InspectorControls>
				<Panel>
					<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
						<ExternalLink className={ 'viewDocsLink' } href="https://support.membermouse.com/support/solutions/articles/9000020409-mm-employee-data-smarttag">View Documentation</ExternalLink>
						<__experimentalNumberControl
							label={ 'User ID' }
							help={ 'Takes a number that is associated with the employee account to retrieve data for. If no ID is passed, the default employee account will be used.' }
							onChange={ value => props.setAttributes( { id: value } ) }
							value={ props.attributes.id }
						/>
						<SelectControl
							label={ 'Employee Data Type' }
							value={ props.attributes.type }
							options={ [
								{ label: 'Display Name', value: 'displayName' },
								{ label: 'Email', value: 'email' },
								{ label: 'First Name', value: 'firstName' },
								{ label: 'Last Name', value: 'lastName' },
								{ label: 'Phone', value: 'phone' },
							] }
							onChange={ value => props.setAttributes( { type: value } ) }
						/>
						<TextControl
							label={ 'SmartTag Preview' }
							value={ props.attributes.id ? '[MM_Employee_Data id="' + props.attributes.id + '" name="' + props.attributes.type + '"]' : '[MM_Employee_Data name="' + props.attributes.type + '"]' }
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
			</InspectorControls>, <div className={ `${ className }` }>
				{ props.attributes.preText }{ props.attributes.id ? '[MM_Employee_Data id="' + props.attributes.id + '" name="' + props.attributes.type + '"]' : '[MM_Employee_Data name="' + props.attributes.type + '"]' }{ props.attributes.postText }
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
