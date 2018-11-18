require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = build(:user)
  end

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }

  context 'before saving' do
    it 'has no id after creating' do
      expect(@user.id).to eq nil
    end

    it 'has no global id after creating' do
      expect(@user.global_id).to eq nil
    end
  end

  context 'when saving' do
    before do
      @user.save!
    end

    it 'has an id after creating' do
      expect(@user.id).to eq 6
    end

    it 'has a global id after creating' do
      expect(@user.global_id).to eq Base64.strict_encode64("User:7")
    end
  end
end
