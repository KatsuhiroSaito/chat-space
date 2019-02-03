class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :members
  accepts_nested_attributes_for :member
end
