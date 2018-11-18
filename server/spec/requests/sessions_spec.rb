require 'base64'
require 'rails_helper'

describe 'session request', type: :request do
  before do
    @user = User.new(email: 'some.user@gmail.com', name: 'Some User')
    @id_token = id_token(@user)
    @token = '3025801d42273ab9dadf8833d26adfbb696cb87196a5f0c208996ea99216e99e'

    allow(Token).to receive(:generate_token) { @token }
  end

  context 'POST /api/v1/sign_in' do
    before do
      get '/api/v1/sign_in', @id_token
    end

    it 'contains response' do
      expect(JSON.parse(response.body)).to eq(
        'token' => token.token,
        'email' => @user.email,
        'name' => @user.name
      )
    end

    it 'has status 200' do
      expect(response.status).to eq 200
    end
  end
end

def id_token(user)
  header = {
    'alg' => 'RS256',
    'kid' => 'd1e869e7bf40ddc3d3de08042598ba8350970f0a',
    'typ' => 'JWT'
  }
  payload = {
    'iss' => 'accounts.google.com',
    'aud' => '1001246833892-83a1a2g20n9jnm1ugdd3tf1o7msmsrd2.apps.googleusercontent.com',
    'sub' => '104303120398631203914',
    'email' => user.email,
    'name' => user.name,
    'iat' => 1542500356,
    'exp' => 1542503956,
    'jti' => '774f63a69a89b42fdb8de5385644b1f59d123432'
  }
  signature = 'E47KQiKvJdNC2sfczrWPm9WdWVDXiKE54kt91bTph_pXElEVZYAbuPMEIehFc63U8xrpIhWdv9dNCukt4WrLrxaMW4qeFVH_u_4dF1PYUe7zoJaVp0cTy-MhIWcE0w-F9GLdGLV9oaPGZFU0NIscduaj21QOPRzMh1dGIrBPFFGsDevF7XGLeH6pz63xdrAYgEzqsmp37Z11MUq6kJjOCtXDz2vtAdIyj3-R2P7amt-ulbdZ-hhguRi2z6S0zymEv3gpOXUZ6PnO1-DLsKYWCFKhHj-tggEJxUs3fkK0pL5iAN5AZpFVM_YF9VqKS1imp1vy8VqggX8Pv-VGkKXcvw'
  "#{Base64.encode64(header)}.#{Base64.encode64(payload)}.#{Base64.encode64(signature)}"
end
