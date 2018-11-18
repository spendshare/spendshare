FactoryBot.define do
  factory :user do
    name { 'Some User' }
    sequence :email do |n|
      "#{name.split(' ').first}.#{name.split(' ').last}.#{n}@gmail.com".downcase
    end
  end
end
