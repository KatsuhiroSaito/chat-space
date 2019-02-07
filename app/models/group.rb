class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :members
  has_many :members
  validates :name, presence: true

  def show_latest_message(user_group)
    if (latest_message = user_group.messages.first).present?
      latest_message.body? ? latest_message.body : "画像が投稿されました"
    else
      "まだメッセージはありません。"
    end
  end
end
