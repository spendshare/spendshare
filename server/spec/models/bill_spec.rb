require 'rails_helper'

RSpec.describe Bill, type: :model do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:amount) }
  it { should validate_presence_of(:added_by) }
  it { should validate_presence_of(:payer) }
end
