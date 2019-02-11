FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/no_image.jpg")
    created_at { Faker::Time.between(5.days.ago, 3.days.ago, :all) }
    updated_at { Faker::Time.between(2.days.ago, Date.today, :all) }
    user
    group
  end
end
