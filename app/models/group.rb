class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :members
  has_many :members
  validates :name, presence: true

  def show_latest_message(user_group)
    if user_group.messages.present?
      if user_group.messages.last.image.present?
        "画像が投稿されました"
      else
        user_group.messages.last.body
      end
    else
      "まだメッセージはありません。"
    end
  end
end
