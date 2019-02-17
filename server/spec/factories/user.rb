names = [
  'Jan Kowalski',
  'Stefan Nowak',
  'Borys Szyc',
  'Tomasz Karolak'
]

FactoryBot.define do
  factory :user do
    sequence :name do |n|
      names[n % names.size]
    end
    sequence :email do |n|
      "#{name.split(' ').first}.#{name.split(' ').last}.#{n}@gmail.com".downcase
    end
  end
end
