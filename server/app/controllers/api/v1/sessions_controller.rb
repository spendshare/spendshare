class Api::V1::SessionsController < ApplicationController
  def get
    ga = GoogleAuthenticator.new(request.body.read)
    return error(400, 'Parsing error') if ga.parsing_error?
    return error(401, 'Unauthorized OAuth2 issuer') unless ga.valid_domain?
    return error(401, 'Expired token') if ga.expired?
    return error(401, 'Fraudulent client ID') unless ga.correct_aud?
    ok(ga.data)
  end
end
