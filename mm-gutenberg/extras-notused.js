/**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param { Object } props Props.
   * @returns { Mixed } JSX Frontend HTML.
   */

save: ( props ) => {
  const customCss = props.attributes.customCss;
  const buttonStyle = {
    backgroundColor: props.attributes.buttonBgColor,
    color: props.attributes.buttonTextColor,
  };
  const includeForgotPassword = props.attributes.forgotPasswordChecked;
  const includeRememberMe = props.attributes.rememberMeChecked;
  const submitClass = includeRememberMe ? 'form-group submit-group' : 'form-group submit-group no-remember-me';
  const className = getBlockDefaultClassName( 'mm/login-block' );
  return (
    <div className={ `${ className } ${ props.attributes.designTemplate }` }>
      { customCss ? <style> { customCss } </style> : null }
      <form id="mm-login-form" className="whatup" method="post" action={ membermouseGutenbergGlobal.loginActionUrl }>
        { /**
					 * Figure out how to handle form errors/success messages
					 */ }
        <div className="messages">
          <p className="mm-error"></p>
          <p className="mm-success"></p>
        </div>
        <div className="form-group username-group">
          <label htmlFor="log">{ props.attributes.usernameLabelText }</label>
          <input type="text" id="log" name="log" className="mm-field username-field" placeholder={ props.attributes.usernamePlaceholderText } />
        </div>

        <div className="form-group password-group">
          <label htmlFor="pwd">{ props.attributes.passwordLabelText }</label>
          <input type="password" id="pwd" name="pwd" className="mm-field password-field" placeholder={ props.attributes.passwordPlaceholderText } />
        </div>

        { /**
					 * Make Remember Me Label Editable
					*/ }

        { includeRememberMe ? <div className="form-group remember-me-group"><label htmlFor="rememberme" className="mm-remember-me-label"><input name="rememberme" id="rememberme" type="checkbox" checked="checked" value="forever" className="remember-me-field" /> Remember Me</label></div> : null }

        { /**
					 * Make Login Field Editable
					 */ }
        <div className={ submitClass }>
          <input type="submit" name="submit" value={ props.attributes.buttonText } id="mm-login-button" className="login-btn" style={ buttonStyle } />
        </div>

        <input type="hidden" id={ membermouseGutenbergGlobal.security } name={ membermouseGutenbergGlobal.security } value="" />
        <input type="hidden" name="_wp_http_referer" value="" />
      </form>

      { includeForgotPassword ? <a href="#" className={ 'forgot-password-link' }>{ props.attributes.forgotPasswordText }</a> : null }
    </div>
  );
},
