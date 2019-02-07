class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :members
  has_many :members
  validates :name, presence: true, length: {maximum: 50 }

  def show_latest_message(user_group)
    if (latest_message = user_group.messages.first).present?
      latest_message.body? ? latest_message.body.truncate(50, separator: ' ') : "画像が投稿されました"
    else
      "まだメッセージはありません。"
    end
  end
end
