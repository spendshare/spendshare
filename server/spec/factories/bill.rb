FactoryBot.define do
  factory :bill do
    title { Faker::Name.name }
    association :added_by, factory: :user
  end
end
