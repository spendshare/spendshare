FactoryBot.define do
  factory :bill do
    title { 'Za kebsa' }
    association :added_by, factory: :user
  end
end
