class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :members
  has_many :members
  validates :name, presence: true

  def show_latest_message(user_group)
    if (last_message = user_group.messages.last).present?
      last_message.body? ? last_message.body : "画像が投稿されました"
    else
      "まだメッセージはありません。"
    end
  end
end
