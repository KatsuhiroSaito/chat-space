if @undisplayed_new_messages.present?
  json.array! @undisplayed_new_messages do |new_message|
    json.id new_message.id
    json.body  new_message.body
    json.image  new_message.image
    json.created_at  new_message.created_at.strftime("%Y/%m/%d %H:%M")
    json.user_name  new_message.user.name
  end
end
