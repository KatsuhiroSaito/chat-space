FactoryGirl.define do
  factory :group do
    name Faker::Team.name
    created_at { Faker::Time.between(2.weeks.ago, 3.days.ago, :all) }
    updated_at { Faker::Time.between(2.days.ago, Date.today, :all) }
  end
end
