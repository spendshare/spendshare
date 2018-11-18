FactoryBot.define do
  factory :user do
    name { 'Some User' }
    email { "#{name.split(' ').first}.#{name.split(' ').last}@gmail.com".downcase }
  end
end
