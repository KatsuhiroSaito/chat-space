FactoryGirl.define do
  factory :user do
    password = Faker::Internet.password(8)
    sequence(:name) { Faker::Name.name[0..13] }
    sequence(:email) {Faker::Internet.free_email}
    password  password
    password_confirmation password
  end
end
