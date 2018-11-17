class Api::V1::SessionsController < ApplicationController
  def get
    google = GoogleAuthenticator.new(request.body.read)

    return error(400, 'Parsing error') if google.parsing_error?
    return error(401, 'Unauthorized OAuth2 issuer') unless google.valid_domain?
    return error(401, 'Expired token') if google.expired?
    return error(401, 'Fraudulent client ID') unless google.correct_aud?

    user = Accounts.get(google.data)
    token = Token.new(user: user)
    token.save!
    ok(token: token.token, email: user.email, name: user.name)
  end
end
