class GoogleAuthenticator
  def initialize(token)
    @google_token = token
    @header, @payload, _ = @google_token.split('.')
    @header = parse(@header)
    @payload = parse(@payload)
  end

  def parse(value)
    return nil if value.nil?

    begin
      JSON.parse(Base64.decode64(value))
    rescue JSON::ParserError
      nil
    end
  end

  def parsing_error?
    @header.nil? || @payload.nil?
  end

  def valid_domain?
    @payload['iss'] == 'accounts.google.com' || @payload['iss'] == 'https://accounts.google.com'
  end

  def expired?
    DateTime.strptime(@payload['exp'].to_s,'%s') < Time.now
  end

  def correct_aud?
    @payload['aud'] == '1001246833892-83a1a2g20n9jnm1ugdd3tf1o7msmsrd2.apps.googleusercontent.com'
  end

  def data
    {
      name: @payload['name'],
      email: @payload['email'],
      picture: @payload['picture']
    }
  end
end
