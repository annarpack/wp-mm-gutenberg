/**
 * BLOCK: MemberMouse Reset Password
 *
 */

//  Import CSS.
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, getBlockDefaultClassName } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { TextControl, Panel, PanelBody, PanelRow, TextareaControl, RadioControl } = wp.components;

/**
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'mm/reset-password-block', {
	title: __( 'MM - Reset Password Block' ),
	description: __( 'Insert MemberMouse Reset Password Form' ),
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
		__( 'MM - Reset Password Block' ),
		__( 'membermouse' ),
		__( 'reset password' ),
		__( 'password' ),
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
		const className = getBlockDefaultClassName( 'mm/reset-password-block' );
		return ( [
			/*eslint-disable*/
			<InspectorControls>
				<Panel>
					<PanelBody title={ 'Styling Settings' } initialOpen={ true }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
							<RadioControl
								label="Style Templates"
								help="Select a design setting to apply to block"
								selected={ props.attributes.designTemplate }
								options={ [
									{ label: 'Use Theme Styles', value: 'default' },
									{ label: 'Clean', value: 'template1' },
									{ label: 'Modern', value: 'template2' },
									{ label: 'Minimal', value: 'template3' },
								] }
								onChange={ option => props.setAttributes( { designTemplate: option } ) }
							/>
							<TextareaControl
								label={ 'Custom CSS' }
								help={ 'Custom CSS can be written here. Styles will not be reflected in preview.' }
								value={ props.attributes.customCss }
								onChange={ text => props.setAttributes( { customCss: text } ) }
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody title={ 'Password Field Settings' } initialOpen={ false }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
							<TextControl
								label={ 'Label Text' }
								value={ props.attributes.passwordLabelText }
								onChange={ text => props.setAttributes( { passwordLabelText: text } ) }
							/>
							<TextControl
								label={ 'Placeholder Text' }
								value={ props.attributes.passwordPlaceholderText }
								onChange={ text => props.setAttributes( { passwordPlaceholderText: text } ) }
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody title={ 'Password Confirm Field Settings' } initialOpen={ false }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
							<TextControl
								label={ 'Label Text' }
								value={ props.attributes.passwordConfirmLabelText }
								onChange={ text => props.setAttributes( { passwordConfirmLabelText: text } ) }
							/>
							<TextControl
								label={ 'Placeholder Text' }
								value={ props.attributes.passwordConfirmPlaceholderText }
								onChange={ text => props.setAttributes( { passwordConfirmPlaceholderText: text } ) }
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody title={ 'Button Settings' } initialOpen={ false }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
							<TextControl
								label={ 'Button Text' }
								value={ props.attributes.buttonText }
								onChange={ text => props.setAttributes( { buttonText: text } ) }
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
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>, <div className={ `${ className } ${ props.attributes.designTemplate }` }>
				{ props.attributes.customCss ? <style>{ props.attributes.customCss }</style> : null }
				<form method="post">
					<div className="mm-resetpassword">
						<div className="form-group password-group">
							<label htmlFor="password">{ props.attributes.passwordLabelText }</label>
							<input type="password" id="password" name="password" className="mm-field password-field disabled" placeholder={ props.attributes.passwordPlaceholderText } disabled />
						</div>
						<div className="form-group password-confirm-group">
							<label htmlFor="password_confirm">{ props.attributes.passwordConfirmLabelText }</label>
							<input type="password" id="password_confirm" name="password_confirm" className="mm-field password-confirm-field disabled" placeholder={ props.attributes.passwordConfirmPlaceholderText } disabled />
						</div>
						<div className="form-group submit-group">
							<input type="submit" name="submit" value={ props.attributes.buttonText } id="mm-submit-button" className="mm-button disabled" style={ { background: props.attributes.buttonBgColor, color: props.attributes.buttonTextColor } } disabled />
						</div>
					</div>
				</form>
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
