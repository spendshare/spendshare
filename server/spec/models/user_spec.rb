require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = build(:user)
  end

  context 'must have' do
    it 'unique email' do
      email = 'email@gmail.com'
      user1 = create(:user, email: email)
      user2 = create(:user, email: email)

      expect(user1.email).to eq email
      expect(user2.email).to eq email
    end
  end

  it 'has no id after creating' do
    expect(@user.id).to eq nil
  end

  it 'has no global id after creating' do
    expect(@user.global_id).to eq nil
  end

  context do
    before do
      @user.save!
    end

    it 'has an id after creating' do
      expect(@user.id).to eq 5
    end

    it 'has a global id after creating' do
      expect(@user.global_id).to eq Base64.strict_encode64("User:6")
    end
  end
end
