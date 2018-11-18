require 'rails_helper'

RSpec.describe Token, type: :model do
  before do
    @user = User.new(email: 'example@email.com')
    @user.save!
    @example_token = '3025801d42273ab9dadf8833d26adfbb696cb87196a5f0c208996ea99216e99e'
    allow(Token).to receive(:generate_token).and_return(@example_token)
    @token = Token.new(user: @user)
  end

  it 'has no token upon creating new model' do
    expect(@token.token).to eq nil
  end

  it 'has no valid until date upon creating new model' do
    expect(@token.valid_until).to eq nil
  end

  it 'has token after saving' do
    @token.save!
    expect(@token.token).to eq @example_token
  end

  it 'has date \'valid until\'' do
    @token.save!
    expect(@token.valid_until).to be > Time.now
  end
end
