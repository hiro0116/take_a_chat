json.user_name @message.user.name
json.created_at @message.created_at.strftime("%H:%M")
json.text @message.text
json.image @message.image_url
json.id @message.id