require 'base64'
require 'spec_helper'

describe 'session request', type: :request do
  before do
    @user = User.new(email: 'some.user@gmail.com', name: 'Some User')
    @user.save!
    @token = '3025801d42273ab9dadf8833d26adfbb696cb87196a5f0c208996ea99216e99e'
    allow(Token).to receive(:generate_token).and_return(@token)
  end

  context 'POST /api/v1/sign_in' do
    context 'with correct ID token' do
      before do
        @id_token = id_token(@user)
        post '/api/v1/sign_in', params: @id_token
      end

      it 'contains response' do
        expect(JSON.parse(response.body)).to eq(
          'id' => @user.global_id,
          'token' => @token,
          'email' => @user.email,
          'name' => @user.name
        )
      end

      it 'has status 200' do
        expect(response.status).to eq 200
      end
    end

    context 'with incorrect ID token' do
      context 'and invalid token' do
        before do
          @id_token = id_token(@user, incorrect_token: true)
          post '/api/v1/sign_in', params: @id_token
        end

        it 'contains response' do
          expect(JSON.parse(response.body)).to eq(
            'error' => 'Could not parse provided Google ID token',
          )
        end

        it 'has status 400' do
          expect(response.status).to eq 400
        end
      end

      context 'and expired token' do
        before do
          @id_token = id_token(@user, expired: true)
          post '/api/v1/sign_in', params: @id_token
        end

        it 'contains response' do
          expect(JSON.parse(response.body)).to eq(
            'error' => 'Expired token',
          )
        end

        it 'has status 401' do
          expect(response.status).to eq 401
        end
      end

      context 'and incorrect domain of token issuer' do
        before do
          @id_token = id_token(@user, invalid_domain: true)
          post '/api/v1/sign_in', params: @id_token
        end

        it 'contains response' do
          expect(JSON.parse(response.body)).to eq(
            'error' => 'Unauthorized OAuth2 issuer',
          )
        end

        it 'has status 401' do
          expect(response.status).to eq 401
        end
      end

      context 'invalid client ID' do
        before do
          @id_token = id_token(@user, incorrect_aud: true)
          post '/api/v1/sign_in', params: @id_token
        end

        it 'contains response' do
          expect(JSON.parse(response.body)).to eq(
            'error' => 'Fraudulent client ID',
          )
        end

        it 'has status 401' do
          expect(response.status).to eq 401
        end
      end
    end

    context 'with missing ID token' do
      before do
        @id_token = id_token(@user, invalid_domain: true)
        post '/api/v1/sign_in'
      end

      it 'contains response' do
        expect(JSON.parse(response.body)).to eq(
          'error' => 'Could not parse provided Google ID token',
        )
      end

      it 'has status 400' do
        expect(response.status).to eq 400
      end
    end
  end

  context 'DELETE /api/v1/sign_out' do
    context 'with existing session' do
      before do
        token = Token.new(user: @user)
        token.save!

        delete '/api/v1/sign_out', headers: { 'Authorization' => "bearer #{token.token}" }
      end

      it 'contains no response' do
        expect(JSON.parse(response.body)).to eq({})
      end

      it 'has status 200' do
        expect(response.status).to eq 200
      end
    end

    context 'without any session' do
      before do
        delete '/api/v1/sign_out', headers: { 'Authorization' => "bearer #{@token}" }
      end

      it 'contains no response' do
        expect(JSON.parse(response.body)).to eq({})
      end

      it 'has status 200' do
        expect(response.status).to eq 200
      end
    end

    context 'with wrong Authorization header' do
      before do
        delete '/api/v1/sign_out', headers: { 'Authorization' => "#{@token}" }
      end

      it 'contains no response' do
        expect(JSON.parse(response.body)).to eq(
          'error' => 'Incorrect Authorization token. Did you prepend it with \'bearer \'?'
        )
      end

      it 'has status 400' do
        expect(response.status).to eq 400
      end
    end

    context 'with missing Authorization header' do
      before do
        delete '/api/v1/sign_out'
      end

      it 'contains no response' do
        expect(JSON.parse(response.body)).to eq(
          'error' => 'No Authorization header present'
        )
      end

      it 'has status 400' do
        expect(response.status).to eq 400
      end
    end
  end
end

def encode(hash)
  Base64.encode64(JSON.generate(hash))
end

def id_token(user, opts = {})
  header = {
    'alg' => 'RS256',
    'kid' => 'd1e869e7bf40ddc3d3de08042598ba8350970f0a',
    'typ' => 'JWT'
  }
  payload = {
    'iss' => opts[:invalid_domain] ? 'hackers.com' : 'accounts.google.com',
    'aud' => opts[:incorrect_aud] ? 'notthisone' : '1001246833892-83a1a2g20n9jnm1ugdd3tf1o7msmsrd2.apps.googleusercontent.com',
    'sub' => '104303120398631203914',
    'email' => user.email,
    'name' => user.name,
    'exp' => opts[:expired] ? 10.minutes.ago.to_i : 10.minutes.from_now.to_i,
    'jti' => '774f63a69a89b42fdb8de5385644b1f59d123432'
  }
  signature = 'E47KQiKvJdNC2sfczrWPm9WdWVDXiKE54kt91bTph_pXElEVZYAbuPMEIehFc63U8xrpIhWdv9dNCukt4WrLrxaMW4qeFVH_u_4dF1PYUe7zoJaVp0cTy-MhIWcE0w-F9GLdGLV9oaPGZFU0NIscduaj21QOPRzMh1dGIrBPFFGsDevF7XGLeH6pz63xdrAYgEzqsmp37Z11MUq6kJjOCtXDz2vtAdIyj3-R2P7amt-ulbdZ-hhguRi2z6S0zymEv3gpOXUZ6PnO1-DLsKYWCFKhHj-tggEJxUs3fkK0pL5iAN5AZpFVM_YF9VqKS1imp1vy8VqggX8Pv-VGkKXcvw'
  "#{opts[:incorrect_token] ? '111' : encode(header)}.#{encode(payload)}.#{encode(signature)}"
end
