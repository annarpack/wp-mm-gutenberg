/**
 * BLOCK: MemberMouse Login
 *
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, getBlockDefaultClassName } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { TextControl, Panel, PanelBody, PanelRow, TextareaControl, ToggleControl, RadioControl } = wp.components;

/**
 * Register: MemberMouse Login Block
 *
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
registerBlockType( 'mm/login-block', {
	title: __( 'MM - Login Block' ),
	description: __( 'Insert MemberMouse Login Form' ),
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
		__( 'MemberMouse - Login Block' ),
		__( 'membermouse' ),
		__( 'login' ),
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
		const className = getBlockDefaultClassName( 'mm/login-block' );
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
					<PanelBody title={ 'Username Field Settings' } initialOpen={ false }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
							<TextControl
								label={ 'Label Text' }
								value={ props.attributes.usernameLabelText }
								onChange={ text => props.setAttributes( { usernameLabelText: text } ) }
							/>
							<TextControl
								label={ 'Placeholder Text' }
								value={ props.attributes.usernamePlaceholderText }
								onChange={ text => props.setAttributes( { usernamePlaceholderText: text } ) }
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

					<PanelBody title={ 'Misc Settings ' } initialOpen={ false }>
						<PanelRow className={ 'mm-gb-panel-row mm-gb-flex-col' }>
							<ToggleControl
								label={ 'Include Remember Me' }
								onChange={ bool => props.setAttributes( { rememberMeChecked: bool } ) }
								checked={ props.attributes.rememberMeChecked }
							/>
							<TextControl
								label={ 'Remember Me Label' }
								value={ props.attributes.rememberMeLabel }
								onChange={ text => props.setAttributes( { rememberMeLabel: text } ) }
							/>
							<ToggleControl
								label={ 'Include Forgot Password Link' }
								onChange={ bool => props.setAttributes( { forgotPasswordChecked: bool } ) }
								checked={ props.attributes.forgotPasswordChecked }
							/>
							<TextControl
								label={ 'Forgot Password Text' }
								value={ props.attributes.forgotPasswordText }
								onChange={ text => props.setAttributes( { forgotPasswordText: text } ) }
							/>
						</PanelRow>
					</PanelBody>
				</Panel>

			</InspectorControls>, <div className={ `${ className } ${ props.attributes.designTemplate }` }>
				{ props.attributes.customCss ? <style>{ props.attributes.customCss }</style> : null }
				<form id="mm-login-form" method="post" action="#">
					<div className="form-group username-group">
						<label htmlFor="log">{ props.attributes.usernameLabelText }</label>
						<input type="text" id="log" name="log" className="mm-field username-field disabled" placeholder={ props.attributes.usernamePlaceholderText } disabled />
					</div>

					<div className="form-group password-group">
						<label htmlFor="pwd">{ props.attributes.passwordLabelText }</label>
						<input type="password" id="pwd" name="pwd" className="mm-field password-field disabled" placeholder={ props.attributes.passwordPlaceholderText } disabled />
					</div>

					{ props.attributes.rememberMeChecked ? <div className="form-group remember-me-group"><label htmlFor="rememberme" className="mm-remember-me"><input name="rememberme" id="rememberme" type="checkbox" checked="checked" value="forever" className="mm-remember-me-field" disabled /> { props.attributes.rememberMeLabel }</label></div> : null }

					<div className={ props.attributes.rememberMeChecked ? "form-group submit-group" : "form-group submit-group no-remember-me" } >
						<input type="submit" name="submit" value={ props.attributes.buttonText } id="mm-login-button" className="mm-button disabled" style={ { backgroundColor: props.attributes.buttonBgColor, color: props.attributes.buttonTextColor } } disabled />
					</div>
				</form>

				{ props.attributes.forgotPasswordChecked ? <a className={ 'forgot-password-link' }>{ props.attributes.forgotPasswordText }</a> : null }
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
