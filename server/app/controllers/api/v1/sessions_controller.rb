class Api::V1::SessionsController < ApplicationController
  def get
    google = GoogleAuthenticator.new(request.body.read)

    return error(400, 'Could not parse provided Google ID token') if google.parsing_error?
    return error(401, 'Unauthorized OAuth2 issuer') unless google.valid_domain?
    return error(401, 'Expired token') if google.expired?
    return error(401, 'Fraudulent client ID') unless google.correct_aud?

    user = Accounts.get(google.data)
    token = Token.new(user: user)
    token.save!
    ok(
      email: user.email,
      id: user.global_id,
      name: user.name,
      token: token.token
    )
  end

  def delete
    token = recognize_token
    return if performed?
    Token.where(token: token).delete_all
    ok()
  end
end
